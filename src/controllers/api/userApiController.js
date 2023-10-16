const db = require ('../../database/models')
const bcrypt = require('bcrypt')
const Users = db.Users

module.exports={
    list: async (req, res) =>{
        let response = {data:{}}
        try {
           const usuarios  = await Users.findAll()
           response.data.count = usuarios.length
           response.data.users = usuarios.map(usuario => {
                return {
                    id: usuario.id,
                    name: usuario.nombre,
                    email: usuario.email,
                    detail: `api/user/${usuario.id}`,
                    imagen: usuario.fotoPerfil
                
                }})
            response.data.lastUser = response.data.users.pop()
            response.data.users.push(response.data.lastUser)
            return res.json(response)
        } catch (error) {
            response.msg = "Hubo un error!"
            return res.json(response)
        }
    },

    detail: async (req, res) => {
      let response = {};
      try {
        const findUser = await Users.findByPk(req.params.id, {attributes:{exclude:["contrasenia", 'rol_id']}});
        response.meta = {
          status: 200,
          total: findUser.length,
          url: `/api/user/${req.params.id}`,
        };
        response.data = findUser;
        response.data.fotoPerfil = `/img/${findUser.fotoPerfil}`
        return res.json(response);
      } catch (error) {
        console.error("Error finding user:", error);
        response.meta = {
          status: 500,
          total: null,
          url: `/api/user/${req.params.id}`,
        };
        response.msg = `Error! No encontramos el usuario con id: ${req.params.id}.`;
        return res.status(500).json(response);
      }
    }
  };