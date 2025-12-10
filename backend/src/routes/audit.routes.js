import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Audit routes working' });
});

export default router;
