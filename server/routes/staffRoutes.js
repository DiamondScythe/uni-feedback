const { Router } = require("express");
const authController = require("../controllers/authController.js");

const router = Router();

router.get("/getAllStaff", authController.getAllStaff);
router.delete("/deleteStaff", authController.deleteStaff);

module.exports = router;
