//import fetch from 'node-fetch';
const { SlashCommandBuilder } = require('discord.js');

const axios = require('axios');

async function get_first_page() {
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
        return response.data.items;

    } catch (error) {
        console.error(error);
    }
}

function extract_problem_id(page_list) {
    const list_len = page_list.length;
    var ret = [];
    for (i = 0; i < list_len; ++i){
        ret.push(page_list[i].problemId);
    }
    return ret;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randompage')
        .setDescription('Returns json file of problems in the first page'),
    async execute(interaction) {
        const first_page = await get_first_page();
        return interaction.reply(extract_problem_id(first_page).toString());
    },
};



