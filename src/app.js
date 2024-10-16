import express from 'express'
let app = express()
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
import adoptionRouter from './routes/adoption.js'

dotenv.config()

app.use(cors())
app.use(adoptionRouter)

//rota de pagina inicial não é necessária

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
