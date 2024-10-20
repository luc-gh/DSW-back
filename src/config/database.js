import mongoose from "mongoose";
import dotenv from 'dotenv';
import {Animal} from '../models/Animal.js';

dotenv.config();

const uri = `mongodb+srv://acolhepetadmin:${process.env.DATABASE_PASSWORD}@acolhepet.cbjqm.mongodb.net/animals?retryWrites=true&w=majority&appName=AcolhePET`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function getAnimalsList() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().ping();

        const animals = await Animal.find();
        console.log("Lista de animais obtida com sucesso.");
        return animals;
    } catch (error) {
        console.error('Erro ao obter a lista de animais:', error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}


// Executar uma verificação de conexão (opcional)
export async function checkConnection() {
    try {
        await mongoose.connection.db.admin().ping();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}

export async function putAnimal(id, updateData) {
    try {
        const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAnimal) {
            throw new Error("Animal não encontrado.");
        }
        console.log("Animal atualizado com sucesso:", updatedAnimal);
        return updatedAnimal;
    } catch (error) {
        console.error('Erro ao atualizar o animal:', error);
        throw error; // Lança o erro para ser tratado no chamador
    }
}