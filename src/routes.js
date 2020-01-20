const { Router } = require('express');// importa somente o Router do express
const DevControler = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')


const routes = Router(); // instancia o Router 


//query: param ${request.query.id}, '/'
//route: param ${request.params.id}, '/:id'
//body: ${request.body.id}, '/', app.use(express.json());

routes.get('/devs', DevControler.index);
routes.post('/devs', DevControler.store);
routes.put('/devs',  DevControler.update);
routes.delete('/devs', DevControler.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;