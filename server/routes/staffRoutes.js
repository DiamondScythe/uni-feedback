const { Router } = require("express");
const authController = require("../controllers/authController.js");

const router = Router();

router.get("/getAllStaff", authController.getAllStaff);
router.delete("/deleteStaff", authController.deleteStaff);
router.post("/addStaff", authController.addStaff);

module.exports = router;
