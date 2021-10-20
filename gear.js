const fetch = require('node-fetch');
const XIVAPI = require('@xivapi/js');
const xiv = new XIVAPI()

module.exports = async (getGear) => {
    
var interval = 1000
var promise = Promise.resolve();
    
for (const [key, value] of Object.entries(getGear)) {
    promise = promise.then(async function () {
        console.log(`${key}: ${value.ID}`);
        let item = value.ID
        const response = await fetch(`https://xivapi.com/item/${item}?columns=ID,Name,Icon,ClassJobCategory.Name,EquipSlotCategory,Stats&language=en`);
        const data = await response.json();
        console.log(data)
        return new Promise(function (resolve) {
            setTimeout(resolve, interval);
        });
    });
};
    
promise.then(function () {
  console.log('Finished grabbing gear.');
});
    
};