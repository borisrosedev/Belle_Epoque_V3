const express = require("express");
const rootController = require("../controllers/root.cjs");
const router = express.Router();

router.get("/", rootController.get);

module.exports = router;
