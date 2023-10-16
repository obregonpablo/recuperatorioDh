const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
let db = require('../database/models');
const { log } = require('console');

const userController = {

    login: (req, res) => {
        return res.render('login')
    },
    register: (req, res) => {
        
        return res.render('register')
    },

    editUser: async (req, res) => {
        try {
            const users = await db.Users.findOne({
                where: {
                    email: req.session.usuarioLogueado
                }
            });        
            res.render('modifUsuario', { usuario: users })
        } catch (error) {
            console.log(error);
        }

    },
    update: async (req, res) => {
        try {
            const users = await await db.Users.findOne({
                where: {
                    email: req.session.usuarioLogueado
                }
            });
            const rdoValidacion = validationResult(req)
            console.log(rdoValidacion);
            if (!rdoValidacion.isEmpty()) return res.render('modifUsuario', { errors: rdoValidacion.mapped(), oldData: req.body, usuario: users })
            let userModif = await db.Users.findOne({
                where: {
                    email: req.session.usuarioLogueado
                }
            });
            console.log("update users " + userModif);
            let fotoPerfilNueva = userModif.fotoPerfil
            if (req.file != undefined) {
                    if (req.body.fotoRegistro != ""& req.file.fieldname=='fotoRegistro') fotoPerfilNueva = req.file.filename
                }
            await db.Users.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fotoPerfil: fotoPerfilNueva,
                email: req.body.usuario,
                contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
            }, { 
                where: {
                    email: req.session.usuarioLogueado
                }
            })
            req.session.usuarioLogueado = req.body.usuario
            req.session.fotoPerfil = fotoPerfilNueva
            req.session.nombre = req.body.nombre
            req.session.apellido = req.body.apellido          
            
            res.redirect('/user/perfil')
        } catch (error) {
            console.log(error);
        }
        
    },
    create: async function (req, res) {
        try {
            const rdoValidacion = validationResult(req)
            let userExists = { msg: "" }
            if (rdoValidacion.errors.length > 0) return res.render('register', { errors: rdoValidacion.mapped(), oldData: req.body, userExists: userExists })
            const usuarioEncontrado = await db.Users.findOne({
                where: {
                    email: req.body.usuario
                }
            })
            if (usuarioEncontrado == undefined) {

                let fotoRegistro = 'default-user.jpg';
                if (req.file != undefined) {
                    if (req.body.fotoRegistro != ""& req.file.fieldname=='fotoRegistro') fotoRegistro = req.file.filename
                }
                const usuarioCreado = await db.Users.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.usuario,
                    fotoPerfil: fotoRegistro,
                    contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
                    rol_id: 2
                })
                req.session.usuarioLogueado = usuarioCreado.email
                req.session.fotoPerfil = usuarioCreado.fotoPerfil
                req.session.nombre = usuarioCreado.nombre
                req.session.apellido = usuarioCreado.apellido
                return res.redirect('/user/perfil')
            }
        } catch (error) {
            console.log(error);
        }

    },



    users: async function (req, res) {
        try {
            const userFound = await db.Users.findOne({
                where: {
                    email: req.session.usuarioLogueado
                }
            });
            if (userFound) return res.render('userfound', { users: userFound })
            else return res.render("login")
        } catch (error) {
            console.log(error);
        }
    },


    logout: (req, res) => {
        req.session.destroy()
        res.clearCookie("recordame")
        return res.redirect('/')
    }

}


module.exports = userController;