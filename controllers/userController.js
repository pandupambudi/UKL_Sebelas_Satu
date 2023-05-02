import  jwt  from "jsonwebtoken";
import { db } from "../database.js";

const JWT_Secret = 'classified'

export const RegistrasiController = (req,res)=>{
    return res.render('registrasi')
}

export const dbRegistrasiController = (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`insert into user (name, email, password) values ("${name}","${email}","${password}")`)
    res.redirect('/login')
}

export const loginController = (req,res)=>{
    res.render('login')
}

export const dbloginController = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query(`select * from user where email = "${email}" and password = "${password}"`, (err, result)=>{
        if(err){
            console.log(err)
            return res.redirect('/login')
        }

        const pengguna = result[0]
        if (!pengguna) return res.redirect('/login')

        const token = jwt.sign({
            name : pengguna.name,
            email : pengguna.email,
            password : pengguna.password
        }, JWT_Secret,{expiresIn: '6h'})
        req.session.penggunaToken = token;
        return res.redirect('/tampilan')
    })
}

export const logoutController = (req,res) => {
    req.session.penggunaToken = undefined
    return res.redirect('/login')
}

export const cekuserController = (req,res, next)=>{
    if (!req.session.penggunaToken)
    return res.redirect("/login")

    jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna)=>{
        if(err){
            console.log(err)
            return res.redirect("/login")
        }
        req.penguna = pengguna
        next()
    })
}