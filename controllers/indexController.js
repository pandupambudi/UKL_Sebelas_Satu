import  jwt  from "jsonwebtoken"
import { db } from "../database.js"

const JWT_Secret = 'classified'

export const homeController = (req,res)=>{
    res.render("home")
}

export const tampilanController = (req,res)=>{
    res.render("tampilan")
}

export const loginAdminController = (req,res)=>{
    res.render("loginAdmin")
}

export const dbloginAdminController = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query(`insert into admin (email, password) values ("${email}","${password}")`)

    db.query(`select * from admin where email = "${email}" and password = "${password}"`, (err, result)=>{
        if(err){
            console.log(err)
            return res.redirect('/loginAdmin')
        }

        const pengguna = result[0]
        if (!pengguna) return res.redirect('/loginAdmin')

        const token = jwt.sign({
            name : pengguna.name,
            email : pengguna.email,
            password : pengguna.password
        }, JWT_Secret,{expiresIn: '6h'})
        req.session.penggunaToken = token;
        return res.redirect('/admin')
    })
}

export const logoutAdminController = (req,res) => {
    req.session.penggunaToken = undefined
    return res.redirect('/loginAdmin')
}

export const cekadminController = (req,res, next)=>{
    if (!req.session.penggunaToken)
    return res.redirect("/loginAdmin")

    jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna)=>{
        if(err){
            console.log(err)
            return res.redirect("/loginAdmin")
        }
        req.penguna = pengguna
        next()
    })
}

export const adminController = (req,res)=>{
    res.render("admin")
}

export const dataUserController = (req,res)=>{
    return db.query('select * from user', (err,result)=>{
        if (err) throw err
        return res.render('dataUser', {user: result})
    })
}

export const editController =(req,res)=>{
    const id = req.params.id
    return db.query(`select * from user where id = ${id}`, (err,result)=> {
        if (err) throw err
        return res.render('edit', {user : result[0]})
    })
}

