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
//         id: 1,
//         name: 'Fido',
//         description: 'Um gato amigável e brincalhão.',
//         imageUrl: '/images/dog1.jpg',
//     },
//     {
//         id: 2,
//         name: 'Whiskers',
//         description: 'Um gato carinhoso e independente.',
//         imageUrl: '/images/cat1.jpg',
//     },
//     {
//         id: 3,
//         name: 'Garfield',
//         description: 'Um gato preguiçoso.',
//         imageUrl: '/images/dog2.jpg',
//     },
//     {
//         id: 4,
//         name: 'Mittens',
//         description: 'Uma gata curiosa e energética.',
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
        const data = client.db(`${process.env.DATABASE_NAME}`);
        const collection = data.collection(`${process.env.CATS_COLLECTION}`);

        //Recupera todos os documentos da coleção e os coloca em um array (Confirmação)
        const documents = await collection.find({}).toArray();
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
run().catch(console.dir);
