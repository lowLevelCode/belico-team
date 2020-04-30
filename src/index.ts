import { FastifyInstance, Plugin } from "fastify";
import { RestPlugin } from "../typings";

import AuthPlugin from "./plugins/auth.plugin";

import UserPlugin from "./plugins/users";
import UsuarioPluginGen from "./plugins/usuario-gen.plugin";
import TipoUsuarioPluginGen from "./plugins/tipoUsuario-gen.plugin";

const ApiPlugin: RestPlugin = (fastify, opts, next) => {

    // register business routes
    fastify.register(AuthPlugin, { prefix: '/auth' });  // endpoint concreto

    fastify.register(UsuarioPluginGen, { prefix: '/usuario' }); // enpoint generico
    fastify.register(TipoUsuarioPluginGen, { prefix: '/tipoUsuario' }); // enpoint generico
    fastify.register(UserPlugin, { prefix: '/users' });  // enpoint generico

    // call next
    next();
}
export = ApiPlugin;
