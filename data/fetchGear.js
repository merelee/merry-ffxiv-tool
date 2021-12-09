const fetch = require('node-fetch');
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI()
const { lodestoneId } = require('.././config.json')

console.log('Fetching gear...')

let gear = [];

//The order to display gear in.
let slot = ['MainHand', 'OffHand', 'Head', 'Body', 'Hands', 'Legs', 'Feet', 'Necklace', 'Bracelets', 'Ring1', 'Ring2'];

//Base stat template to overwrite.
let base = {
    Stats: {
        //MAIN STAT
        Vitality: {NQ: 0}, Strength: {NQ: 0}, Dexterity: {NQ: 0}, Intelligence: {NQ: 0}, Mind: {NQ: 0},
        //SECONDARY
        CriticalHit: {NQ: 0}, Determination: {NQ: 0}, DirectHitRate: {NQ: 0},
        SkillSpeed: {NQ: 0}, SpellSpeed: {NQ: 0}, Tenacity: {NQ: 0}, Piety: {NQ: 0},
        //CRAFTING
        Craftsmanship: {NQ: 0}, Control: {NQ: 0}, CP: {NQ: 0},
        //GATHERING
        Gathering: {NQ: 0}, Perception: {NQ: 0}, GP: {NQ: 0}
    }
};

async function searchGear() {
const getCharacter = await xiv.character.get(lodestoneId)
const getGear = await getCharacter.Character.GearSet.Gear
var interval = 1000
var promise = Promise.resolve();
    
for (const [key, value] of Object.entries(getGear)) {
    promise = promise.then(async function () {
        if (key === 'SoulCrystal') {
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
    gear.forEach(gear => {
        function merge(gear, base){
            if (gear === base || gear === null) {
                return
            }
            Object.keys(base).forEach(function(key) {
                var value = base[key];
                if (value !== null && typeof value === 'object') {
                    if(!gear.hasOwnProperty(key)) {
                        gear[key] = {};
                    }
                    merge(gear[key], base[key]);
                }
                else if (!gear.hasOwnProperty(key)) {
                    gear[key] = base[key]
                }
            })
        }
        merge(gear, base)
    })
});
}

searchGear();

module.exports = {
    gear,
    slot
}