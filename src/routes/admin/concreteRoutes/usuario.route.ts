import { defaultConn }  from "../../../core/db";
import { Usuario } from "../../../models/usuario.entity";
import { HttpStatus } from "../../HttpStatus";
import { UserResult } from "routes/resultSets/UserResult";

export default function (fastify, opts, done) {          


    fastify.post('/add', async (request, reply) => {

        try {                        

            let usuario:Usuario = { ...request.body };            
            let usuarioRepo = await defaultConn.getRepository(Usuario); //obtenemos el repositorio correspondiente            

            const userSaved:Usuario = await usuarioRepo.save(usuario);    // guardamos la informacion en bd            
            const {nombre,contraseña} = userSaved;            

            let userResult:UserResult = { ...userSaved };   

            userResult.token = fastify.jwt.sign({ nombre, contraseña}, {expiresIn:'1m'}); // generamos el token

            await reply.status(HttpStatus.OK).send(userResult);                 // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({err:error});  // error interno de servidor
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