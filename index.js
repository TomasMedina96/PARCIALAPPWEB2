import express from 'express'
import cors from 'cors'
import {readFile , writeFile} from 'fs/promises';


const app = express()

const port = 3000
app.use(express.json());

app.listen(port, () => {

    console.log(`Servidor levantado en puerto ${port}`)
})

app.use(cors({
    origin: 'http://127.0.0.1:5500'

}))

//lee y trae el archivo
const fileIngrediente = await readFile('./ingredientes.json','utf-8')
//Lo convierte en JSON.
const ingredientesData = JSON.parse(fileIngrediente)

//lee y trae el archivo
const fileReceta= await readFile('./recetas.json','utf-8')
//Lo convierte en JSON.
const recetaData = JSON.parse(fileReceta)

//POST INGREDIENTES
app.post('/agregarIngredientes/',async (req,res) => {
const nombre = req.body.nombre

    try {
        const lastIngId = ingredientesData.length > 0 ? ingredientesData[ingredientesData.length -1].id + 1 : 1

        const data = {
            id: lastIngId,
            nombreIngrediente: nombre
        }
        ingredientesData.push(data)
        await writeFile('./ingredientes.json', JSON.stringify(ingredientesData, null, 2), 'utf-8');
        res.status(200).json('INGREDIENTE AGREGADO')

    } catch (error) {
        res.status(400).json(error)
    }

})

//POST RECETA
app.post('/agregarRecetas/', async (req,res) => {
    const {name, ingredientes} = req.body

    
    try {
        const lastRecId = recetaData.length > 0 ? recetaData[recetaData.length -1].id + 1 : 1
        const data = {
            id: lastRecId,
            nombre: name,
            ingredientes
        }
           
        recetaData.push(data)

        await writeFile('./recetas.json', JSON.stringify(recetaData, null, 2), 'utf-8');
        res.status(200).json('RECETA AGREGADA')
    } catch (error) {
        res.status(400).json(error)
    }
    
})


//GET INGREDIENTES
app.get('/infoIngredientes/', async (req,res) => {
        
    try {
     
        res.status(200).json(ingredientesData);
    } catch (error) {
        res.status(400).json(error)
    }
        
})


//GET RECETAS
app.get('/infoRecetas/', (req,res) => {
            
    try {

        res.status(200).json(recetaData);
    } catch (error) {
        res.status(400).json(error)
    }
})