//import fetch from 'node-fetch';
const { SlashCommandBuilder } = require('discord.js');

const axios = require('axios');

async function get_first_prob() {
    try {
        const response = await axios.get('https://solved.ac/api/v3/search/problem', {
            params: {
                'query': 'tier:s5..p4 -solved_by:wbjeon2k',
                'page': '1',
                'sort': 'random'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        console.log('got response successfully.')
        console.log(response.data)
        console.log('response.data lookup')
        //console.log(response.data.items[0].problemId)

        console.log(JSON.stringify(response.data.items));
        return response.data.items[0].problemId;

    } catch (error) {
        console.error(error);
    }
}

const prob_url_format = 'https://www.acmicpc.net/problem/'


module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomprob')
        .setDescription('Returns url of single random problem'),
    async execute(interaction) {
        const first_prob = await get_first_prob();
        return interaction.reply(prob_url_format + first_prob.toString());
    },
};



