const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs')
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI()
const fetch = require('node-fetch');

//pull data
const { lodestoneId } = require('./config.json')
const jobs = require('./data/jobs.js')
const fetchGear = require('./data/fetchGear.js')

app.set('view engine', 'ejs')

//home page and character sheet
app.get('/', async (req, res) => {
    const getCharacter = await xiv.character.get(lodestoneId)
    res.render('index', {
        character: getCharacter.Character
    })
})

//gear
app.get('/gear', async (req, res) => {
    const getCharacter = await xiv.character.get(lodestoneId)
    const activeJob = await getCharacter.Character.ActiveClassJob.Name.split('/')[1].replace(/\s/g, '')
    res.render('gear', {
        activeJob: activeJob,
        tank: jobs.tank,
        healer: jobs.healer,
        slaying: jobs.slaying,
        aiming: jobs.aiming,
        casting: jobs.casting,
        crafting: jobs.crafting,
        gathering: jobs.gathering,
        gear: fetchGear.gear,
        slot: fetchGear.slot
    })
})

app.use(express.json());
app.use(express.static('public'));
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);