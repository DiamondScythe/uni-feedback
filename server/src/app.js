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
  const date = currentDate.toLocaleDateString("en-GB"); // 'en-GB' gives date format as DD/MM/YYYY

  const uploadedFileName = req.file ? req.file.filename : null;

  const results = await db2.createIdea({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id,
    category_id: req.body.category_id,
    file_name: uploadedFileName,
    uploaded_date: date,
  });

  res.status(201).json({ id: results[0] });
});

app.get("/ideas", async (req, res) => {
  const results = await db2.getAllIdeas();
  res.status(200).json({ ideas: results });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/email", async (req, res) => {
  try {
    const { email } = req.body; // destructed email value from request
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const msg = {
      from: `"Khuong" <${process.env.MAIL_USER}>`,
      to: "khuongwhitelily@gmail.com",
      subject: "Hello",
      html: "<b>Hello world?</b>",
    };

    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);

    res.send("Email Sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

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
          // Nén file CSV thành file zip
          const zip = new JSZip();
          const dataFile = await fs.promises.readFile("data.csv");
          zip.file("data.csv", dataFile);
          const zipContent = await zip.generateAsync({ type: "nodebuffer" });

          // Trả về file zip để tải xuống
          res.set("Content-Disposition", "attachment; filename=data.zip");
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

//post comments
app.post("/comments", async (req, res) => {
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

//mongodb routes for user auth and staff info
app.use(authRoutes);
app.use(staffRoutes);

const date = new Date();
const isoString = date.toISOString();
console.log(isoString);

app.listen(8081, () => console.log("server is now running on port 8081"));
