import express, { urlencoded } from "express";
import { adminController, cekadminController, dataUserController, dbloginAdminController, editController, homeController, loginAdminController, logoutAdminController, tampilanController } from "./controllers/indexController.js";
import { cekuserController, dbloginController, dbRegistrasiController, loginController, logoutController, RegistrasiController } from "./controllers/userController.js";
import {  shopChartController, transaksiController, usertranController } from './controllers/checkoutController.js';
import { indeController,  tambahController, tarikController } from './controllers/transaksiController.js';
import session from "express-session";
import { aditController, deleteController, deletehistoryController, deletestokController} from "./controllers/submitController.js";
const app = express()

app.use(urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({
    secret: 'classified'
}))
app.set ('view engine', 'ejs')
app.use(express.static('views/img'))
app.use(express.static('views/vid'))

app.get('/home', homeController)
app.get('/tampilan',cekuserController, tampilanController)

app.get('/admin', cekadminController, adminController )
app.get('/dataUser', cekadminController ,dataUserController)

app.get("/loginAdmin", loginAdminController)
app.post("/loginAdmin", dbloginAdminController)

app.get("/logoutAdmin", logoutAdminController)

app.get('/edit/:id', editController)
app.post('/edit/:id', aditController)
app.get('/delete/:id', deleteController)

app.get("/registrasi", RegistrasiController)
app.post("/registrasi", dbRegistrasiController)

app.get("/login", loginController)
app.post("/login", dbloginController)

app.get("/logout", logoutController)

app.get ("/userTran", cekuserController ,shopChartController, usertranController);

app.get('/adminTran', cekadminController ,indeController);
app.post('/items/tambah', tambahController);
app.post('/items/tarik', tarikController);
app.get('/deleteStok/:id', deletestokController)
app.get('/deleteHistory/:id', deletehistoryController)


app.post('/items/beli', transaksiController);

app.listen(3000,()=>{
    console.log('Berhasil')
})