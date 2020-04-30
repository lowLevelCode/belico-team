import * as fastifyPlugin  from "fastify-plugin";

module.exports = fastifyPlugin(async function(fastify) {
    fastify.decorate("authenticate", async function(request, reply) {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      });
});