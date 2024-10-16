import express from 'express';
import path from 'path';
import { getAnimalsList } from '../config/database.js';

const router = express.Router();

router.get('/api/animals', async (req, res) => {
    try {
        const animals = await getAnimalsList(); // Use await aqui
        res.json(animals);
    } catch (error) {
        console.error('Erro ao obter a lista de animais:', error);
        res.status(500).json({ message: 'Erro ao obter a lista de animais' });
    }
});

router.put('/api/adoption/:id', async (req, res) => {
    let id = req.params.id;
    // Verificar
    try {
        await putAnimal();
    } finally {
        return res.json();
    }
})


export default router;
