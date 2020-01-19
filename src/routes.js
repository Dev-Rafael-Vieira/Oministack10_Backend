const { Router } = require('express');// importa somente o Router do express
const axios = require('axios');
const Dev = require('./models/Dev'); // importa o DevSchema contido em Dev.js
const routes = Router(); // instancia o Router 


//query: param ${request.query.id}, '/'
//route: param ${request.params.id}, '/:id'
//body: ${request.body.id}, '/', app.use(express.json());

routes.post('/devs', async (request, response)=> {
    const { github_username, techs } = request.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

    const { name = login, avatar_url, bio } = apiResponse.data; // recebe login se name não existir

    const techsArray = techs.split(',').map(tech => tech.trim());

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
    })

    return response.json(dev);
});

module.exports = routes;