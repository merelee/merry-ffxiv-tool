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
    res.render('gear', {
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