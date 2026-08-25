const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const UserControler = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const routes = new Router();

routes.post('/user', schemaValidator(userSchema), UserControler.create);

routes.get('/health', (req, res) => res.send({ message: 'Legal, a API está funcionando bem melhor!' }));

module.exports = routes;
