const express = require('express')
let app = express()
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

app.use(cors)

app.get('/api/home', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.REACT_HOME_URL}`);
        res.json(response.data);
    } catch (error) {
        console.error('Erro na chamada:', error);
        res.status(500).send('Erro ao acessar a página do React');
    }
});

const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});