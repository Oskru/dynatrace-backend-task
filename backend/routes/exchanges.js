import express from 'express';

export const router = express.Router();

router.get('/', async (req, res) => {
  try {
    return res.status(200).send({ message: 'It works!' });
  } catch (error) {
    res
      .status(500)
      .send({ message: `Internal server error: ${error.message}` });
  }
});
