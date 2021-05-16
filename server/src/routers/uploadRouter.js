const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const router = express.Router();

const uploadsDirectoryPath = path.join(__dirname, '../../uploads');

const fileUploadMiddleware = fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.post('/', fileUploadMiddleware, async (req, res) => {
  const file = req.files.file;

  const extension = path.extname(file.name);
  const md5Checksum = file.md5;
  const filename = md5Checksum + extension;

  const destination = path.join(uploadsDirectoryPath, filename);
  try {
    await req.files.file.mv(destination);
    res.json({ path: `/uploads/${filename}` });
  } catch (error) {
    res.status(400);
    res.json({ error: error.message });
  }
});

module.exports = router;
