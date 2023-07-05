const axios = require('axios');
const url = 'https://store.steampowered.com/api/featuredcategories/';

const specials = async (req, res) => {
    try {
        const { data } = await axios.get(url)
        let info = data.specials.items
        res.status(200).json(info)
    } catch (error) {
        res.status(400).send('Error')
    }
}

module.exports = specials;