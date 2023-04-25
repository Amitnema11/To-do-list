const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/", function (req, res) {
    const PATH = path.join(__dirname, "..", "public", "files");
    const folderfiles = fs.readdirSync(PATH);
    res.render("index", {
        title: "Homepage",
        files: folderfiles,
        data: "",
        file: "",
    });
});

router.post("/create", function (req, res) {
    const PATH = path.join(
        __dirname,
        "..",
        "public",
        "files",
        req.body.filename
    );
    fs.writeFileSync(PATH, `you have created ${req.body.filename}.`);
    res.redirect(`/${req.body.filename}`);
});

router.get("/:filename", function (req, res) {
    const PATH = path.join(__dirname, "..", "public", "files");
    const folderfiles = fs.readdirSync(PATH);
    const PATHDATA = path.join(
        __dirname,
        "..",
        "public",
        "files",
        req.params.filename
    );
    const filedata = fs.readFileSync(PATHDATA, "utf-8");
    res.render("index", {
        title: req.params.filename,
        files: folderfiles,
        data: filedata,
        file: req.params.filename,
    });
});

router.get("/delete/:filename", function (req, res) {
    const DELETEPATH = path.join(
        __dirname,
        "..",
        "public",
        "files",
        req.params.filename
    );
    fs.unlinkSync(DELETEPATH);
    res.redirect("/");
});

router.post("/update/:filename", function (req, res) {
    const PATH = path.join(
        __dirname,
        "..",
        "public",
        "files",
        req.params.filename
    );
    fs.writeFileSync(PATH, req.body.filedata);
    res.redirect(`/${req.params.filename}`);
});

module.exports = router;
