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

    async update(request, response){
        // nome, avatar, bio, localização, techs
        let { github_username, name, avatar_url, bio, latitude, longitude, techs } = request.body;

        let dev = await Dev.findOne({ github_username });
        
        //assume os valores antigos se a api não passar determinado parametro
        name = !name ? dev.name : name;
        avatar_url = !avatar_url ? dev.avatar_url : avatar_url;
        bio = !bio ? dev.bio : bio;
        location = !latitude || !longitude ? dev.location : { type: 'Point',coordinates: [longitude, latitude], };
        techs = !techs ? dev.techs : parseStringAsArray(techs);

        dev = await dev.updateOne({
            name,
            avatar_url,
            bio,
            techs,
            location,
        });

        dev = await Dev.findOne({ github_username });

        return response.json({dev});
    },

    async destroy(request, response){
        const { github_username } = request.body;
        await Dev.deleteOne({ github_username });

        const devs = await Dev.find();

        return response.json(devs);
    }
};