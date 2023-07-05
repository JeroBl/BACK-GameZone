const axios = require('axios');
const url = 'https://store.steampowered.com/api/featuredcategories/';

const newReleases= async (req, res) => {
    try {
        const { data } = await axios.get(url)
        let info = data.new_releases.items
        res.status(200).json(info)
    } catch (error) {
        res.status(400).send('Error')
    }
}

module.exports = newReleases;