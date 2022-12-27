import express from "express"
import multer from "multer"
import multerConfig from "./config/multer"
import middlewaresConfig from "./app/middlewares/auth"
//constrollers
import UserController from "./app/controllers/UserController"
import Sessions from "./app/controllers/Sessions"
import ProductController from "./app/controllers/ProductController"
import CategoiresController from "./app/controllers/CategoiresController"
import OrderController from "./app/controllers/OrderCOntroller"

const route = express.Router()
const upload = multer(multerConfig)

//routas- create e login
route.post('/create',UserController.store)
route.post('/login',Sessions.store)

//middlerwares
route.use(middlewaresConfig)

//routes - cadastra produtos
route.post('/newproducts',upload.single('file'),ProductController.store)
route.get('/newproducts', ProductController.index)
route.put('/newproducts/:id',upload.single('file'), ProductController.update)

route.post('/categories',upload.single('file'),  CategoiresController.store)
route.put('/categories/:id',upload.single('file'),  CategoiresController.update)
route.get('/categories', CategoiresController.index)

route.post('/orders', OrderController.store)
route.get('/orders', OrderController.index)
route.put('/orders/:id', OrderController.update)

export default route
