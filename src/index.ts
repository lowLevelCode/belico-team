import { FastifyInstance, Plugin } from "fastify";
import { RestPlugin } from "../typings";

import AuthRoute from "./routes/admin/concreteRoutes/auth.route";
import TipoUsuarioRoute from "./routes/admin/concreteRoutes/tipoUsuario.route";
import UsuarioRoute from "./routes/admin/concreteRoutes/usuario.route";

import UsuarioRouteGen from "./routes/admin/usuario-gen.plugin";
import TipoUsuarioRouteGen from "./routes/admin/tipoUsuario-gen.plugin";

const ApiPlugin: RestPlugin = (fastify, opts, next) => {

    // register business routes
    fastify.register(AuthRoute, { prefix: '/auth' });          // endpoint concreto
    fastify.register(TipoUsuarioRoute, { prefix: '/tipoUsuario' });  // endpoint concreto
    fastify.register(UsuarioRoute, { prefix: '/usuario' });  // endpoint concreto

    //fastify.register(UsuarioRouteGen, { prefix: '/usuario' });         // enpoint generico
    //fastify.register(TipoUsuarioRouteGen, { prefix: '/tipoUsuario' }); // enpoint generico 

    // call next
    next();
}
export = ApiPlugin;
