import express from 'express';
import path from 'path';
import {getAnimalsList, putAnimal} from '../config/database.js';

const router = express.Router();

router.get('/api/animals', async (req, res) => {
    try {
        const animals = await getAnimalsList();
        res.json(animals);
    } catch (error) {
        console.error('Erro ao obter a lista de animais:', error);
        res.status(500).json({ message: 'Erro ao obter a lista de animais' });
    }
});


router.put('/api/adoption/:id', async (req, res) => {
    const id = req.params.id;
    const updateData = req.body; // Supondo que os dados a serem atualizados vêm do corpo da requisição

    try {
        const updatedAnimal = await putAnimal(id, updateData);
        return res.json(updatedAnimal);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
