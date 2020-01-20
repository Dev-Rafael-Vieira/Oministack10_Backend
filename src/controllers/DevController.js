const axios = require('axios');
const Dev = require('../models/Dev'); // importa o DevSchema contido em Dev.js
const parseStringAsArray = require('../utils/parseStringAsArray');

// um controller contem apenas 5 funções => index, show, store, update, destroy 
module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
                
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data; // recebe login se name não existir
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }; //longitude deve vir antes de acordo com a documentação do mongoDB
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
    
        return response.json(dev);
    },

 
};