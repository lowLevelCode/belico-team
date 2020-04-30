import { defaultConn }  from "../../../core/db";
import { TipoUsuario } from "../../../models/tipoUsuario.entity";

export default function (fastify, opts, done) {      

    // verificamos las credenciales del usuario.
    fastify.post('/add', async (request, reply) => {

        try {
            let tipoUsuario = new TipoUsuario();    // creamos entity o DAO
            let tipoUsuarioRepo = await defaultConn.getRepository(TipoUsuario); //obtenemos el repositorio correspondiente

            Object.assign(tipoUsuario, request.body);   // asignamos el objeto que llega en el request

            await tipoUsuarioRepo.save(tipoUsuario);    // guardamos la informacion en bd

            reply.status(200).send("TipoUsuario guardado con exito");   // estatus Ok

        } catch (error) {
            reply.status(500).send(error);  // error interno de servidor
        }
    });
  
    done();
}