const { Router } = require('express');

const routes = new Router();

routes.get('/health', (req, res) => res.send({ message: 'Legal, a API está funcionando bem melhor!' }));

module.exports = routes;
