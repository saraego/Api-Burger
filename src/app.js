import express, { application } from "express"
import route from "./routes"
import path from "path"
import "./database"


class App{
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use('/file-product', express.static(path.resolve(__dirname,'..','uploads')))
        this.app.use('/file-category', express.static(path.resolve(__dirname,'..','uploads')))
    }

    routes(){
        this.app.use(route)
    }
}

export default new App().app
