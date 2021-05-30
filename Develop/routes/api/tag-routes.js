const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({ include: Product});
  res.status(200).send(JSON.stringify(tags));
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.id;
  const tags = await Tag.findByPk(id, { include: Product});
  res.status(200).send(JSON.stringify(tags));
});

router.post('/', async (req, res) => {
  // create a new category
  const tagName = req.body.tag_name;
  if (tagName) {
    // if categoryName exists :
    const newTag = await Tag.create({
      "tag_name": tagName,
    });
    res.status(200).send(JSON.stringify(newTag));
  } else {
    res.status(400).send({
      "error": "you need to enter in a tag"
    });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
    const id = req.params.id;
    const tags = await Tag.findByPk(id);
    const tagName = req.body.tag_name;
    if (tagName) {
      tags.tag_name = tagName;
      await tags.save();
      res.status(200).send(JSON.stringify(tags));
    } else {
      res.status(400).send({
        "error": "you need to enter in a tag"
      });
    }
  });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
    const id = req.params.id;
    const tags = await Tag.findByPk(id);
    await tags.destroy();
    res.status(200).send({});
});

module.exports = router;
