var express = require('express');
var router = express.Router();
const model = require('../models/index');

/* GET items */
router.get('/', async function (req, res, next) {
  try {
    const items = await model.items.findAll({});
    if (items.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': items
      })
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});

/* POST items */
router.post('/', async function (req, res, next) {
  try {
    const {
      namabarang,
      serialkey,
      stok,
      kategoribarang
    } = req.body;
    const items = await model.items.create({
      namabarang,
      serialkey,
      stok,
      kategoribarang
    });
  if (items) {
    res.status(201).json({
      'status': 'OK',
      'messages': 'Barang berhasil ditambahkan',
      'data': items,
    })
  }
 } catch (err) {
   res.status(400).json({
     'status': 'ERROR',
     'messages': err.message,
     'data': {},
   })
 }
});

/* PATCH items */
router.patch('/:id', async function (req, res, next) {
  try {
    const itemsId = req.params.id;
    const {
      namabarang,
      serialkey,
      stok,
      kategoribarang
    } = req.body;
    const items = await model.items.update({
      namabarang,
      serialkey,
      stok,
      kategoribarang
    }, {
      where: {
        id: itemsId
      }
    });
    if (items) {
      res.json({
        'status': 'OK',
        'messages': 'Barang berhasil diupdate',
        'row': items[0],
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'row': {},
    })
  }
});

/* DELETE items */
router.delete('/:id', async function (req, res, next) {
  try {
    const itemsId = req.params.id;
    const items = await model.items.destroy({ where: {
      id: itemsId
    }})
    if (items) {
      res.json({
        'status': 'OK',
        'messages': 'Barang berhasil dihapus',
        'row': items[0],
      })
    }
  } catch (err) {
    res.status(400).json({
      'status': 'ERROR',
      'messages': err.message,
      'row': {},
    })
  }
});

module.exports = router;
