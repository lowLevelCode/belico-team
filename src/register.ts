import * as fastify from 'fastify';
import * as formbody from "fastify-formbody";
import * as fastifyJwt from "fastify-jwt";

import { createDefaultConnection, defaultConn } from './core/db';

const app = fastify({ logger: true });
console.log('Try to Starting');

process.on('SIGINT', function () {
    console.log("Caught interrupt signal");

    process.exit();
});

process.nextTick(() => {
    // Require the framework and instantiate it
    //const fastify = require()({ logger: true })
    // Run the server!
    const start = async () => {

        console.log('Try to connect'); 
        await createDefaultConnection();                

        app.register(require('fastify-cors'), { origin: '*' });

        console.log('Registering jwt');
        app.register(fastifyJwt,{ secret:"secret" });
        app.register(require("./middleware/auth.middleware"));

        console.log('Registering Formbody');            
        app.register(formbody);
        
        console.log('Registering API Routers',process.mainModule.filename);            
        app.register(process.mainModule.exports as any, { prefix: '/api/v0' });

        try {
            console.log('try to start server');
            await app.listen(3100);

            console.log(`server listening on ${JSON.stringify(app.server.address())}`)
        } catch (err) {
            app.log.error(err)
            process.exit(0);
        }
    }

    start()
})
