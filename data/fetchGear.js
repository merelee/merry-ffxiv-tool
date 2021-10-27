const fetch = require('node-fetch');
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI()
const { lodestoneId } = require('.././config.json')

console.log('Fetching gear...')

let gear = [];
let gearStats = [];

async function searchGear() {
const getCharacter = await xiv.character.get(lodestoneId)
const getGear = await getCharacter.Character.GearSet.Gear
var interval = 1000
var promise = Promise.resolve();
    
for (const [key, value] of Object.entries(getGear)) {
    promise = promise.then(async function () {
        if (key === 'SoulCrystal' || key === 'Waist') {
            return
        }
        else {
        let equip = { Slot: key }
        let item = value.ID
        const response = await fetch(`https://xivapi.com/item/${item}?columns=ID,Name,Icon,ClassJobCategory.Name,Stats&language=en`);
        const data = await response.json();
        let merged = {
            ...equip,
            ...data
        }
        gear.push(merged)
        }
        return new Promise(function (resolve) {
            setTimeout(resolve, interval);
        });
    });
};
    
promise.then(function () {
    console.log('Finished grabbing gear.');
    console.log('Getting stats...');
    gear.forEach(gear => {
        let item = { Item: gear.Name }
        let stats = gear.Stats
        let merged = {
            ...item,
            ...stats
        }
        gearStats.push(merged)
    })
    console.log(gear)
});
}

searchGear();

module.exports = {
    gear,
    gearStats
}