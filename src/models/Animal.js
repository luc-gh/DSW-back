import mongoose from "mongoose";

let animalSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, {collection: 'general'});

export let Animal = mongoose.model('Animal', animalSchema);