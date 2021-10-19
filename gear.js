const fetch = require('node-fetch');
const XIVAPI = require('@xivapi/js');
const xiv = new XIVAPI()

module.exports = async () => {

async function test () {
    let item = '25807'
    const response = await fetch(`https://xivapi.com/item/${item}?columns=ID,Name,Icon,ClassJobCategory.Name&language=en`);
    const data = await response.json();
    console.log(data)
}
    
test ();
};