console.log("Hello server");

const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const path = require("path");

const app = express();
const fs = require("fs");
const fastcsv = require("fast-csv");
const JSZip = require("jszip");
app.use(morgan("combined"));
app.use(bodyParser.json());

//for handling files
const multer = require("multer");

//mongodb stuff
const mongoose = require("mongoose");
const authRoutes = require("../routes/authRoutes");
const staffRoutes = require("../routes/staffRoutes");

//for cookies
const cookieParser = require("cookie-parser");

//for email stuff
const { sendEmail } = require("../utils/email");

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:8082",
    "http://localhost:8083",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

const corsMiddleware = cors(corsOptions);

app.use(corsMiddleware);
//database connection for user auth
const dbURI = "mongodb://localhost:27017/uni-feedback";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to mongodb db");
  })
  .catch((err) =>
    console.log(
      "connection to mongodb failed. Authorization will not work. Please install mongodb on your computer, and make sure mongod is running"
    )
  );

//checks for uploads folder and creates one if it doesn't exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    cb(
      null,
      originalName.slice(0, -extension.length) + "-" + uniqueSuffix + extension
    );
  },
});
const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//db connection for closure dates
const db1 = require("../db/closure.js");

//db connection for general data
const db2 = require("../db/ideas");

//route for downloading files in upload folder
app.get("/download/:file(*)", (req, res) => {
  var file = req.params.file;
  var fileLocation = path.join("./uploads", file);
  console.log(fileLocation);
  res.download(fileLocation, file);
});

app.post("/ideas", upload.single("file"), async (req, res) => {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  const uploadedFileName = req.file ? req.file.filename : null;

  const managerEmails = await db2.getManagerEmails();
  //This code uses the map method to transform the managerEmails
  //array into a new array of email addresses.
  const emailArray = managerEmails.map((manager) => manager.email);

  const results = await db2.createIdea({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    file_name: uploadedFileName,
    uploaded_date: isoDate,
  });

  const msg = {
    to: emailArray,
    from: `"Uni Feedback Systems" <${process.env.EMAIL_ADDRESS}>`,
    subject: "A new idea has been posted",
    text: "A new idea has been posted",
    html: `<strong>A new idea has been posted</strong>`,
  };
  sendEmail(msg);

  res.status(201).json({ id: results[0] });
});

app.get("/ideas", async (req, res) => {
  const results = await db2.getAllIdeas();
  res.status(200).json({ ideas: results });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//code for requesting data as CSV file
app.get("/downloadCSV", async (req, res) => {
  // Lấy dữ liệu từ database và chuyển đổi sang định dạng CSV
  await db2
    .getAllIdeas()
    .then(async (data) => {
      // Tạo file CSV từ dữ liệu lấy được
      const csvStream = fastcsv.format({ headers: true });
      csvStream
        .pipe(fs.createWriteStream("data.csv"))
        .on("finish", async () => {
          // Nén file CSV và folder uploads thành file zip
          const zip = new JSZip();
          const dataFile = await fs.promises.readFile("data.csv");
          zip.file("data.csv", dataFile);

          // Add the "uploads" directory to the zip file
          const uploadsDir = path.join(__dirname, "../uploads");
          const files = await fs.promises.readdir(uploadsDir);
          for (const file of files) {
            const filePath = path.join(uploadsDir, file);
            const fileContent = await fs.promises.readFile(filePath);
            zip.file(`uploads/${file}`, fileContent);
          }

          const zipContent = await zip.generateAsync({ type: "nodebuffer" });

          // Trả về file zip để tải xuống
          res.set(
            "Content-Disposition",
            "attachment; filename=data_and_uploads.zip"
          );
          res.set("Content-Type", "application/zip");
          res.status(200).send(zipContent);
        });
      data.forEach((row) => {
        csvStream.write(row);
      });
      csvStream.end();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

//get idea details
//ex: get req is http://localhost:8081/details?id=5
//this will get details of post at id = 5
//you can add multiple params like this:
//  /details?param1=value1&param2=value2
app.get("/details", async (req, res) => {
  const { id } = req.query;
  const results = await db2.getIdeaDetails(id);
  if (results.length > 0) {
    res.status(200).json(results[0]);
  } else {
    res.status(404).json({ message: "No idea found with that ID" });
  }
});

app.get("/getIdeaUser", async (req, res) => {
  const { id } = req.query;
  const results = await db2.getIdeaUser(id);
  if (results.length > 0) {
    res.status(200).json(results[0]);
  } else {
    res.status(404).json({ message: "No idea found with that ID" });
  }
});

//post comments
app.post("/comments", async (req, res) => {
  //get the og post user id
  const ogPostUserId = await db2.getIdeaUser(req.body.idea_id);
  console.log("og user id: " + ogPostUserId);

  const ogPostUserInfo = await db2.getUserInfo(ogPostUserId);
  const ogPostUserEmail = ogPostUserInfo[0].email;

  //send email to user to notify them of new comment
  const msg = {
    to: ogPostUserEmail,
    from: `"Uni Feedback Systems" <${process.env.EMAIL_ADDRESS}>`,
    subject: "New Comment on your idea",
    text: "New Comment on your idea",
    html: `<strong>New Comment on your idea</strong>`,
  };
  sendEmail(msg);

  const results = await db2.createComment(req.body);
  res.status(201).json();
});

//get comments from idea id
app.get("/comments", async (req, res) => {
  const { ideaId } = req.query;
  const results = await db2.getComments(ideaId);
  if (results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(404).json({ message: "No comments found with that idea ID" });
  }
});

//voting

app.post("/voteIdea", async (req, res) => {
  const results = await db2.voteIdea(req.body);
  res.status(201);
});

app.get("/ideavotes", async (req, res) => {
  const { id } = req.query;
  console.log(id);
  const results = await db2.getAllIdeaVotes(id);
  console.log(results);
  res.status(200).json(results[0]);
});

//delete idea
app.delete("/ideas", async (req, res) => {
  const { id } = req.query;
  const results = await db2.deleteIdea(id);
  res.status(200).json(results);
});

//categories
app.post("/categories", async (req, res) => {
  const results = await db2.createCategory(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/categories", async (req, res) => {
  const results = await db2.getAllCategories();
  res.status(200).json({ categories: results });
});

app.delete("/categories", async (req, res) => {
  const { id } = req.query;
  const results = await db2.deleteCategory(id);
  res.status(200).json(results);
});

//closure dates management
app.post("/closureDates", async (req, res) => {
  const results = await db1.createClosureDate(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/closureDates", async (req, res) => {
  const results = await db1.getAllClosureDates();
  res.status(200).json(results[0]);
});

// app.post("/voteIdea", async (req, res) => {
//   const results = await db2.voteIdea(req.body);
//   res.status(201);
// });

//routes for email sending
app.post("/email", async (req, res) => {
  const msg = {
    from: `"TestEmail" <${process.env.EMAIL_ADDRESS}>`,
    to: "nhutoan399@gmail.com",
    subject: "Hello",
    html: "<b>Hello world?</b>",
  };

  sendEmail(msg);
});

//add user info into sql db (not mongo)
app.post("/addUserInfo", async (req, res) => {
  const results = await db2.createUser({
    email: req.body.email,
    role: req.body.role,
  });
  res.status(201).json({ id: results[0] });
});

//get id from user email
app.get("/getUserInfo", async (req, res) => {
  const { email } = req.query;
  const results = await db2.getUserId(email);
  res.status(200).json(results[0]);
});

//getuserinfo from id
app.get("/user", async (req, res) => {
  const { id } = req.query;
  const results = await db2.getUserInfo(id);
  res.status(200).json(results[0]);
});

//test
app.get("/test", async (req, res) => {
  const managerEmails = await db2.getManagerEmails();
  //This code uses the map method to transform the managerEmails
  //array into a new array of email addresses.
  const emailArray = managerEmails.map((manager) => manager.email);
  console.log("manager emails: " + emailArray);
  res.status(200).json(emailArray);
});

//mongodb routes for user auth and staff info
app.use(authRoutes);
app.use(staffRoutes);

app.listen(8081, () => console.log("server is now running on port 8081"));
