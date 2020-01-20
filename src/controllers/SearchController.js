const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const {latitude, longitude, techs} = request.query;
        
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //$in operador lógico do mongo pode-se pesquisar por mongo operators
            },
            //o mongo calcula automaticamente a distância de dois pontos através de suas coordenadas
            location: {
                //filtra por local proximo com o operador $near
                $near:{
                    //$geometry recebe o tipo 'Point' junto com as coordenadas latitude e longitude oriundas do query
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDisntance: 10000, // seta uma distância máxima de 10000metros
                }
            }
        })
        
        return response.json({devs});
    }
}