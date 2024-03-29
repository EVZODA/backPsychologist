const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require ('bcryptjs')




const validarlogin = async( req = request, res = response, next ) => {

    try {
        
        
      
      
        const { correo, password } = req.body;
        // leer el usuario que corresponde al uid
        const usuariocorreo = await Usuario.findOne({ correo })

        
        

        if( !usuariocorreo) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuariocorreo.password);
        // Verificar si el uid tiene estado true
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña o usuario incorrectos'
            })
        }

    
        
        
        
        
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'error'
        })
    }

}




module.exports = {
    validarlogin
}