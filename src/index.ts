import { RestPlugin } from "../typings";

import AuthRoute from "./routes/admin/concreteRoutes/auth.route";
import TipoUsuarioRoute from "./routes/admin/concreteRoutes/tipoUsuario.route";
import UsuarioRoute from "./routes/admin/concreteRoutes/usuario.route";
import ServicioRoute from "./routes/admin/concreteRoutes/servicios.route";
import IndicadorRiesgo from "./routes/admin/concreteRoutes/indicador-riesgo.route";
import AttractionsRoute from "./routes/admin/concreteRoutes/attractions.route";
import SucursalRoute from "./routes/admin/concreteRoutes/sucursales.route";

import UsuarioRouteGen from "./routes/admin/usuario-gen.plugin";
import TipoUsuarioRouteGen from "./routes/admin/tipoUsuario-gen.plugin";
import SucursalRoutegen  from "./routes/admin/sucursal-gen.plugin";

const ApiPlugin: RestPlugin = (fastify, opts, next) => {

    // register business routes
    fastify.register(AuthRoute, { prefix: '/auth' });                   // endpoint concreto
    fastify.register(TipoUsuarioRoute, { prefix: '/tipoUsuario' });     // endpoint concreto
    fastify.register(UsuarioRoute, { prefix: '/usuario' });             // endpoint concreto
    fastify.register(ServicioRoute, { prefix: '/servicio' });           // endpoint concreto
    fastify.register(IndicadorRiesgo, { prefix: '/admRiesgos' });       // endpoint concreto
    fastify.register(AttractionsRoute, { prefix: '/attractions' });     // endpoint concreto
    fastify.register(SucursalRoute, { prefix: '/sucursal' });     // endpoint concreto

    //fastify.register(UsuarioRouteGen, { prefix: '/usuario' });         // enpoint generico
    //fastify.register(TipoUsuarioRouteGen, { prefix: '/tipoUsuario' }); // enpoint generico 
    fastify.register(SucursalRoutegen, { prefix: '/sucursales' });       // enpoint generico 

    // call next
    next();
}
export = ApiPlugin;

