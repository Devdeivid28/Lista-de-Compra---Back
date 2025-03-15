const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')


class Banco{

    constructor(){
        this.criarTabela()
    }
    
    async sqlConnection() {
    const banco = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
    })
    return banco;
    }

    async criarTabela() {
    const banco = await this.sqlConnection();

    const tabela = `CREATE TABLE IF NOT EXISTS produtos (
                    id integer PRIMARY KEY AUTOINCREMENT,
                    itens varchar(100),
                    quantidade varchar(100),
                    categoria varchar(100)
                    );`;
    await banco.exec(tabela) 
    }

    async inserir(produto, ct) {
    const {item, quantidade, categoria} = produto;
    const banco = await this.sqlConnection();
    await banco.run("INSERT INTO produtos (itens, quantidade, categoria) values (?, ?, ?)", item, quantidade+" "+ct, categoria)
    }

    async remover(id) {
    const banco = await this.sqlConnection();
    await banco.run("DELETE FROM produtos WHERE id = ?", id)
    }

    /*async atualizar(aluno) {
    const { nome, email, id} = aluno;
    const banco = await this.sqlConnection();
    await banco.run("UPDATE alunos SET nome = ?, email = ? WHERE id = ?", nome, email, id )
    }*/

    async listar() {
    const banco = await this.sqlConnection();
    const result = await banco.all("SELECT * FROM produtos")
    console.log(result)
    return result
    }

    async buscar(id) {
    const banco = await this.sqlConnection();
    const result = await banco.all("SELECT * FROM produtos WHERE id = ?", id)
    return result
    }

}


module.exports = Banco;