import { defaultConn }  from "../../../core/db";
import { Usuario } from "../../../models/usuario.entity";
import { HttpStatus } from "../../HttpStatus";

export default function (fastify, opts, done) {      
    
    fastify.post('/add', async (request, reply) => {
        
        try {
            let usuario = new Usuario();    // creamos entity o DAO
            let usuarioRepo = await defaultConn.getRepository(Usuario); //obtenemos el repositorio correspondiente

            Object.assign(usuario, request.body);   // asignamos el objeto que llega en el request

            await usuarioRepo.save(usuario);    // guardamos la informacion en bd

            reply.status(HttpStatus.OK).send("Usuario guardado con exito");   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);  // error interno de servidor
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
                reply.status(HttpStatus.UNAUTHORIZED).send("El usuario no existe");   // estatus Bad request

            reply.status(HttpStatus.OK).send(usuario);   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);  // error interno de servidor
        }
    });
  
    fastify.post('/page', async (request, reply) => {    

        try {            

            const {page,limit,order} = request.body;

            if(page < 1 || limit < 0)
                reply.status(400).send({msg:"la pagina y el limite debeb de ser mayor a cero"});  // BadRequest    

            let usuarios = await defaultConn.getRepository(Usuario).createQueryBuilder("usuario")             
            .where("usuario.eliminado = 0").orderBy("usuario.idu_usuario", order || "DESC")
            .skip((page-1)*limit ).take(limit).getMany();
            

            reply.status(200).send(usuarios);   // estatus Ok

        } catch (error) {
            reply.status(500).send(error);  // error interno de servidor
        }

    });

    done();
}