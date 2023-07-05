const axios = require('axios');
const url = 'https://store.steampowered.com/api/featuredcategories/';

const topSellers = async (req, res) => {
    try {

        const { data } = await axios.get(url)
        let info = data.top_sellers.items
        res.status(200).json(info)
        
    } catch (error) {
        res.status(400).send('Error')
    }
}

module.exports = topSellers;