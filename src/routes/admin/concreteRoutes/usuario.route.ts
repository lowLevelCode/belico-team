import { defaultConn }  from "../../../core/db";
import { Usuario } from "../../../models/usuario.entity";

export default function (fastify, opts, done) {      

    // verificamos las credenciales del usuario.
    fastify.post('/add', async (request, reply) => {
        
        try {
            let usuario = new Usuario();    // creamos entity o DAO
            let usuarioRepo = await defaultConn.getRepository(Usuario); //obtenemos el repositorio correspondiente

            Object.assign(usuario, request.body);   // asignamos el objeto que llega en el request

            await usuarioRepo.save(usuario);    // guardamos la informacion en bd

            reply.status(200).send("Usuario guardado con exito");   // estatus Ok

        } catch (error) {
            reply.status(500).send(error);  // error interno de servidor
        }
    });

    fastify.get('/:id/tipoUsuario', async (request, reply) => {
        
        try {

            let {id} = request.params;
            let usuarioRepo = await defaultConn.getRepository(Usuario); //obtenemos el repositorio correspondiente
            let usuario = await usuarioRepo.findOne(id, {
                select:["idu_usuario","nom_usuario","fec_alta"],
                relations:["tipousuario"],            
                where:{ eliminado : 0}
            });                                                

            if(!usuario)
                reply.status(400).send("El usuario no existe");   // estatus Bad request

            reply.status(200).send(usuario);   // estatus Ok

        } catch (error) {
            reply.status(500).send(error);  // error interno de servidor
        }
    });
  
    done();
}