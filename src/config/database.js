const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv')

dotenv.config()

const uri =
    "mongodb+srv://acolhepetoff:" +
    process.env.DATABASE_PASSWORD +
    "@cluster0.gobo7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// let initialValues = [
//     {
//         name: 'Fido',
//         description: 'Um gato amigável e brincalhão.',
//         imageUrl: 'https://images.unsplash.com/photo-1536590158209-e9d615d525e4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     },
//     {
//         name: 'Whiskers',
//         description: 'Um gato carinhoso e independente.',
//         imageUrl: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     },
//     {
//         name: 'Garfield',
//         description: 'Um gato preguiçoso.',
//         imageUrl: 'https://plus.unsplash.com/premium_photo-1666612335748-d23dcba788e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     },
//     {
//         name: 'Mittens',
//         description: 'https://plus.unsplash.com/premium_photo-1677545182067-26ac518ef64f?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//         imageUrl: '/images/cat2.jpg',
//     },
// ];

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("AcolhePET").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        //Obtém uma referência para o banco de dados e a coleção específicos
        let data = client.db(`${process.env.DATABASE_NAME}`);
        let collection = data.collection(`${process.env.CATS_COLLECTION}`);

        //Recupera todos os documentos da coleção e os coloca em um array (Confirmação)
        let documents = await collection.find({}).toArray();
        console.log("Documentos da coleção:");
        console.log(documents);

        // ESTES DADOS JÁ FORAM ADICIONADOS AO BANCO

        // for (let value of initialValues){
        //     await collection.insertOne(value, (err, result) => {
        //         if (err) {
        //             console.error("Erro ao inserir novo dado: " + err);
        //             return;
        //         }
        //         console.log("Novo dado inserido: " + result.key_ops);
        //     });
        // }

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function getAnimalsList () {
    try {
        await client.connect()
        await client.db("AcolhePET").command({ping: 1})
        console.log("Conectado ao MongoDB.")

        let data = client.db(`${process.env.DATABASE_NAME}`);
        let collection = data.collection(`${process.env.CATS_COLLECTION}`);

        return await collection.find({}).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        await client.close()
    }
}

run().catch(console.dir);
