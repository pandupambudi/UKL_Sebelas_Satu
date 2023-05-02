import { db } from "../database.js"

export const aditController = (req,res)=>{
    const id = req.params.id
    const data = req.body
    console.log(data)

    db.query(`update user set name = "${data.name}", email = "${data.email}", password = "${data.password}" where id = ${id}`)
    res.redirect('/dataUser')
}

export const deleteController = (req,res)=>{
    const id = req.params.id

    db.query(`delete from user where id = ${id}`)

    res.redirect('/dataUser')
}

export const deletestokController = (req,res)=>{
    const id = req.params.id

    db.query(`delete from items where id = ${id}`)

    res.redirect('/adminTran')
}

export const deletehistoryController = (req,res)=>{
    const id = req.params.id
    
    db.query(`delete from pembukuan where id = ${id}`)

    res.redirect('/adminTran')
}