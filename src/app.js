const express = require('express')
let app = express()
const cors = require('cors')

app.use(cors)

app.get('/api/home', (req, res) => {

})

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000!")
})