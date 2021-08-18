const docRouter = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yml');
swaggerDocument['servers'][0]['url'] = process.env.API_HOST || 'no api host found';
docRouter.use('/', swaggerUi.serve);
docRouter.get('/', swaggerUi.setup(swaggerDocument));

module.exports = docRouter;