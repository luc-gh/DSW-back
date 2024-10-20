import mongoose from "mongoose";
import dotenv from 'dotenv';
import {Animal} from '../models/Animal.js';

dotenv.config();

const uri = `mongodb+srv://acolhepetadmin:${process.env.DATABASE_PASSWORD}@acolhepet.cbjqm.mongodb.net/animals?retryWrites=true&w=majority&appName=AcolhePET`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const animals = [
    {
        id: 1,
        name: 'Fido',
        description: 'Um cachorro amigável e brincalhão.',
        imageUrl: 'https://img.freepik.com/free-photo/friendly-smart-basenji-dog-giving-his-paw-close-up-isolated-white_346278-1626.jpg?t=st=1729341110~exp=1729344710~hmac=c12f5abc75a709721badd76a778077a8b8e40cd243f4dbe5ff7ee0373784136d&w=1060',
    },
    {
        id: 2,
        name: 'Whiskers',
        description: 'Um gato carinhoso e independente.',
        imageUrl: 'https://img.freepik.com/free-photo/kitty-with-monochrome-wall-her_23-2148955134.jpg?t=st=1729341366~exp=1729344966~hmac=a476c89f9bd588da8c9bc8b175564a01a732277b1c1d9a2d2a68e46ac00ec2a2&w=740',
    },
    {
        id: 3,
        name: 'Rex',
        description: 'Um cachorro leal e protetor.',
        imageUrl: 'https://img.freepik.com/free-photo/beautiful-pet-portrait-dog_23-2149218450.jpg?t=st=1729341427~exp=1729345027~hmac=090d60e158120585ff84213a69ffd8982ec19fe6fc2f7b40643790b857d0463b&w=1380',
    },
    {
        id: 4,
        name: 'Mittens',
        description: 'Uma gata curiosa e energética.',
        imageUrl: 'https://img.freepik.com/free-photo/adorable-black-white-kitty-with-monochrome-wall-her_23-2148955182.jpg?t=st=1729341398~exp=1729344998~hmac=b258efc045671633e11220b8ee00b6d8e09ba9e829db3750e6c730dd29fec353&w=740',
    },
];


export async function run(){
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Conectado ao banco.")

        for (let animal of animals) {
            const newAnimal = new Animal(animal);
            await newAnimal.save();
            console.log("Novo dado inserido:", newAnimal.name);
        }
    } finally {
        await mongoose.disconnect();
    }
}

run().catch(console.dir);  //Chama a função 'run()' e lida com qualquer erro gerado durante sua execução