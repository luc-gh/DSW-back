import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = `mongodb+srv://acolhepetoff:${process.env.DATABASE_PASSWORD}@cluster0.gobo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function getAnimalsList() {
    try {
        await client.connect();
        await client.db("AcolhePET").command({ ping: 1 });
        console.log("Conectado ao MongoDB.");

        const data = client.db(`${process.env.DATABASE_NAME}`);
        const collection = data.collection(`${process.env.CATS_COLLECTION}`);

        return await collection.find({}).toArray();
    } catch (error) {
        console.error('Erro ao obter a lista de animais:', error);
        throw error; // Lança o erro para ser tratado no chamador
    } finally {
        await client.close();
    }
}

// Executar uma verificação de conexão (opcional)
(async () => {
    try {
        await client.connect();
        await client.db("AcolhePET").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    } finally {
        await client.close();
    }
})();
