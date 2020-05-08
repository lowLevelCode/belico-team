import { Usuario } from "../../../models/usuario.entity";
import { defaultConn } from "../../../core/db";
import { UserResult } from "../../resultSets/UserResult";
import { HttpStatus } from "../../HttpStatus";

export default function (fastify, opts, done) 
{      

    // verificamos las credenciales del usuario.
    fastify.post('/login', async (request, reply) => {
        try {        
        const {username, password} = request.body;                        
        
        if(username ==="" || password ==="")                        
            reply.status(HttpStatus.BAD_REQUEST).send({msg:"Campos vacios"});   // estatus BadRequest
        
        const usuarioRepo = await defaultConn.getRepository(Usuario);           // obtenemos el repositorio correspondiente        

        // Consulta
        const userResult:UserResult = await usuarioRepo
        .createQueryBuilder('user')
        .select(['user', 'tipousuario.id'])        
        .leftJoin('user.tipousuario', 'tipousuario')
        .where('user.nombre = :nombre', { nombre: username } )
        .andWhere('user.contraseña = :contrasenia', { contrasenia: password } )        
        .andWhere('user.eliminado = 0' )        
        .getOne();                

        if(!userResult)
            reply.status(HttpStatus.NOT_FOUND).send({msg:"No existe el usuario"});   // estatus Unauthorized        
        
        const idTipousuario = userResult.tipousuario.id;            
        userResult.token = fastify.jwt.sign({username,password,idTipousuario}, {expiresIn:'1m'}); // generamos el token        

        await reply.status(HttpStatus.OK).send(userResult);   // estatus Ok

        } catch (error) {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({err:error});  // error interno de servidor
        }

    });

    fastify.get(
        "/jwtAccess",
        {
          preValidation: [fastify.authenticate]
        }, 
        async function(request, reply) {
            await reply.status(HttpStatus.OK).send({msg:"Autenticado"});
        });

    done();
}