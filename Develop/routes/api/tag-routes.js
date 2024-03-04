const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include their associated products
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag, // Tags are associated with products through the ProductTag model
          as: 'products' // This alias will be used to refer to the associated products
        }
      ]
    });
    
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its id and include its associated products
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag, // Tags are associated with products through the ProductTag model
          as: 'products' // This alias will be used to refer to the associated products
        }
      ]
    });
    
    // If the tag is not found, return 404
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

