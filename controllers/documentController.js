const db = require("../database/models");
const multer = require("multer");
const Documents = db.Documents;
const Joi = require('joi');
const path = require("path");

// Set storage engine untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/document');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Middleware multer untuk upload file
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('file');

// Function untuk mengecek tipe file yang diupload
function checkFileType(file, cb) {
  // Ekstensi file yang diizinkan
  const filetypes = /jpeg|jpg|png|gif/;
  // Mengecek ekstensi file
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Mengecek tipe mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images are allowed (jpeg, jpg, png, gif)!');
  }
}

// Schema validasi Joi untuk data document
const documentSchema = Joi.object({
  folder_id: Joi.number().required(),
  namefile: Joi.string().required(),
});

// Method untuk menyimpan data document ke database
const store = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(422).json({ status: 422, message: err });
      }

      // Validasi data document menggunakan Joi
      const { error } = documentSchema.validate(req.body);
      if (error) {
        return res.status(422).json({ status: 422, message: error.details[0].message });
      }

      // Memeriksa apakah file diunggah
      if (!req.file) {
        return res.status(422).json({ status: 422, message: 'No file uploaded' });
      }

      // Menyimpan path file yang akan disimpan di database
      const { folder_id, namefile } = req.body;
      const file = '/uploads/document/' + req.file.filename;

      // Menyimpan data document ke database
      const save = await Documents.create({ folder_id, namefile, file });
      res.json({ status: 200, message: 'success', data: save });
    });
  } catch (error) {
    res.json({ status: 422, message: error.message });
  }
};

const index = async (req, res) => {
  try {
    const result = await Documents.findAndCountAll();
    res.json(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "Failed to fetch documents" });
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Documents.findByPk(id);
    const result = data ? data : `${id} not found in database`;
    res.json(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "Failed to fetch document" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const document = await Documents.findByPk(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    await document.update(req.body);
    res.status(200).json({ message: "Document updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "Failed to update document" });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const document = await Documents.findByPk(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    await document.destroy();
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(422).json({ error: "Failed to delete document" });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
