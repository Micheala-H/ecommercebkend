const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const categoryData = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(categoryData); 
    }
      catch (err){
        res.status(500).json(err);
      }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Caterory.findbyPk(req.params.id, {
      include: [{model: Product}],
    });

    if (!categoryData) {
      res.status(404).json ({message: "could not find category"})
      return;
    };
    res.status(200).json(categoryData);
    
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) =>{
      req.json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id : req.params.id,
      },
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id : req.params.id,
    },
  })
    .then((deleteCategory) => {
      res.json(deleteCategory)
    
    })
    .catch((err) => res.json(err))
});

module.exports = router;
