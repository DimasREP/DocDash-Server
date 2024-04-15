"use strict";
const express = require("express");
const auth = require("./authRoutes");
const folders = require("./foldersRoutes");
const users = require("./userRoutes");
const router = express();

router.get(`/api/v1/`, (_req, res) => {
  res.json({
    message: "Welcome to restfullapi",
  });
});

router.use(auth);
router.use(folders);
router.use(users);
module.exports = router;
