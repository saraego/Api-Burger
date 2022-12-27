require('dotenv').config()
module.exports = {
	dialect: process.env.DB_DIALECT, //aqui estamos informando qual banco de dados iremos usar
	host: process.env.DB_HOST, // nossa conexao local
	username:process.env.DB_USER, //username que criamos no docker ou no postbird
	password:process.env.DB_PASSWORD,// a senha que criamos no docker ou qual quer outro banco,
	database: process.env.DB_NAME, //aqui como sera chamado nosso banco de dados
	define:{
		timespamps:true,// toda vez que eu crio um dado no meu banco de dados, ele criar o created_at e o updated_at, que ajuda na rastreamento dos dados criados ou atualizados
		underscored: true,// essas duas config irao deixa os dados com escrita padrao em 'create_users' caixa-baixa e separado por anderline _
		underscoredAll: true
	}
}