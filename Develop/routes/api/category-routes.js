const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({ include: Product });
  res.status(200).send(JSON.stringify(categories));
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByPk(id, { include: Product });
  res.status(200).send(JSON.stringify(category));
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryName = req.body.category_name;
  if (categoryName) {
    // if categoryName exists :
    const newCategory = await Category.create({
      "category_name": categoryName,
    });
    res.status(200).send(JSON.stringify(newCategory));
  } else {
    res.status(400).send({
      "error": "you need to enter in a category"
    });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  const category = await Category.findByPk(id);
  const categoryName = req.body.category_name;
  if (categoryName) {
    category.category_name = categoryName;
    await category.save();
    res.status(200).send(JSON.stringify(category));
  } else {
    res.status(400).send({
      "error": "you need to enter in a category"
    });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  const category = await Category.findByPk(id);
  await category.destroy();
  res.status(200).send({});
});

module.exports = router;
