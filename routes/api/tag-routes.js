const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData); 
  }
    catch (err){
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findbyPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!tagData) {
      res.status(404).json ({message: "could not find tag"})
      return;
    };
    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    category_name: req.body.category_name,
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) =>{
      req.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.category_name,
    },
    {
      where: {
        id : req.params.id,
      },
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id : req.params.id,
    },
  })
    .then((deleteTag) => {
      res.json(deleteTag)
    
    })
    .catch((err) => res.json(err))
});

module.exports = router;
