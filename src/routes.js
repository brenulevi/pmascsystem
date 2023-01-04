const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Router } = require('express');
const router = Router();

const Patrimony = require('./models/Patrimony');
const Product = require('./models/Warehouse');

// LOGIN
router.post('/login', async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) return res.json({ error: "Missing user or password" });

  const collection = mongoose.connection.useDb('patrimony').collection('auth');
  collection.find({ user, password }).toArray(async function (err, docs) {
    if (err) return res.json({ error: err });
    if (docs.length == 0)
      return res.json({ error: "No users found" });
    const token = jwt.sign({}, "123banana123", {
      expiresIn: 86400,
    })

    return res.json({ token });
  });
});

// CREATE PATRIMONY
router.post('/patrimony/create', async (req, res) => {
  const {
    name,
    code,
    object,
    model,
    process,
    brand,
    serie,
    property,
    cession,
    garantee,
    situation,
    localization,
    createdAt
  } = req.body;
  if (name === "" || code === "" || localization === "")
    return res.json({ error: "Missing name, code or localization" });

  if (await Patrimony.findOne({ code }))
    return res.json({ error: "Patrimony already exists" })

  let newPatrimony = await Patrimony.create({
    name,
    code,
    object,
    model,
    process,
    brand,
    serie,
    property,
    cession,
    garantee,
    situation,
    localization,
    createdAt
  });
  try {
    newPatrimony.save((err, patrimony) => {
      if (err) return res.json({ error: err });
      return res.json({ patrimony });
    });
  }
  catch (err) {
    return res.json({ error: err });
  }
});

// CREATE WAREHOUSE
router.post('/warehouse/create', async (req, res) => {
  const { name, code, group, brand, qtd, qtdType, situation, localization, createdAt, size } = req.body;

  if (name === "" || code === "" || localization === "")
    return res.json({ error: "Missing name, code or localization" });

  if (await Patrimony.findOne({ code }))
    return res.json({ error: "Product already exists" });

  let newProduct = await Product.create({
    name,
    code,
    group,
    brand,
    qtd,
    qtdType,
    localization,
    createdAt,
    size
  });
  try {
    newProduct.save((err, product) => {
      if (err) return res.json({ error: err });
      return res.json({ product });
    });
  }
  catch (err) {
    return res.json({ error: err });
  }
});

// READ ALL PATRIMONY
router.get('/patrimony/get', async (req, res) => {
  const patrimony = await Patrimony.find({});
  res.json({ patrimony });
});

// READ ALL WAREHOUSE
router.get('/warehouse/get', async (req, res) => {
  const product = await Product.find({});
  res.json({ product });
})

// READ PATRIMONY BY ID
router.get('/patrimony/get/:id', async (req, res) => {
  const patrimony = await Patrimony.findOne({ code: req.params.id });
  if (!patrimony) return res.json({ error: "Patrimony not found" });
  return res.json({ patrimony });
})

// READ WAREHOUSE BY ID
router.get('/warehouse/get/:id', async (req, res) => {
  const product = await Product.findOne({ code: req.params.id });
  if (!product) return res.json({ error: "Product not found" });
  return res.json({ product });
});

// UPDATE PATRIMONY
router.put('/patrimony/update/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    code,
    object,
    model,
    process,
    brand,
    serie,
    property,
    cession,
    garantee,
    situation,
    localization,
  } = req.body;
  let patrimony = await Patrimony.findOneAndUpdate({ code: id }, {
    name,
    code,
    object,
    model,
    process,
    brand,
    serie,
    property,
    cession,
    garantee,
    situation,
    localization,
  }, { new: true });
  if (patrimony) return res.json({ patrimony: patrimony });
  res.json({ error: "Patrimony not found" });
});

// UPDATE WAREHOUSE
router.put('/warehouse/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, code, group, brand, qtd, qtdType, situation, localization, size } = req.body;
  let product = await Product.findOneAndUpdate({ code: id }, {
    name,
    code,
    group,
    brand,
    qtd,
    qtdType,
    situation,
    localization,
    size
  }, { new: true });
  if (product) return res.json({ product });
  res.json({ error: "Product not found" });
});

// DELETE PATRIMONY
router.delete('/patrimony/delete/:id', async (req, res) => {
  const { id } = req.params;
  let patrimony = await Patrimony.findOneAndDelete({ code: id });

  if (!patrimony) return res.json({ error: "Patrimony not found" });
  return res.json({ patrimony });
});

// DELETE WAREHOUSE
router.delete('/warehouse/delete/:id', async (req, res) => {
  const { id } = req.params;
  let product = await Product.findOneAndDelete({ code: id });

  if (!product) return res.json({ error: "Product not found" });
  return res.json({ product });
});

module.exports = router;