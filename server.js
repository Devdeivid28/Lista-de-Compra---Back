//importação da função randomUUID
const { randomUUID } = require("crypto")
//importação do framework express
const express = require("express")
const cors = require("cors")
const Banco = require("./banco")          
const app = express()
const banco = new Banco()
app.use(cors())
app.use(express.json())

//Servidor App
app.listen(3333, () =>{
    console.log("Servidor iNICIADO")
})


//Metodo HTTP Get Para Listar Produtos
app.get("/produtos", async(request, response) =>{
    const lista = await banco.listar()
    return response.json(lista)
})

//Metodo HTTP Post para Adicionar Produto a Lista
app.post("/produtos", (request, response) =>{
    const {item,quantidade, categoria} = request.body
    const produto = {
        item,
        quantidade,
        categoria,
    }

    let ct;
    if(categoria == "Padaria" || categoria == "Legume" || categoria == "Fruta")
        if(quantidade == "1")
            ct = "Unidade"
        else
            ct = "Unidades"
    else if(categoria == "Carne")
        ct = "Kg"
    else if(categoria == "Bebida")
        if(quantidade == "1")
            ct = "Litro"
        else
            ct = "Litros"

    banco.inserir(produto, ct)
    return response.json(produto)
})


app.delete("/produtos/:id", async(request, response) =>{
    const { id } = request.params

    const pos = await banco.buscar(id)
    console.log(pos)
    if(pos <= 0)
        return response.status(400).json({mensage: "Aluno não encontrado"})

    banco.remover(id)
    return response.json({mensage: "Removido"})
})

/*app.put("/alunos/:id", async(request, response) =>{
    const {id} = request.params
    const { nome, email} = request.body

    const pos = await banco.buscar(id)
    console.log(pos)
    if(pos <= 0)
        return response.status(400).json({mensage: "Aluno não encontrado"})

    const aluno ={
        id,
        nome,
        email
    }

    banco.atualizar(aluno)
    return response.json({mensage: "Aluno atualizado"})
    //alunos[pos] = aluno
})*/