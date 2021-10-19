const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs')
const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI()

//pull data
const gear = require('./gear.js')

app.set('view engine', 'ejs')

//home page
app.get('/', async (req, res) => {
    const getCharacter = await xiv.character.get('2650420')
    gear();
    
    res.render('index', {
        character: getCharacter.Character,
    })
})

app.use(express.json());
app.use(express.static('public'));
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);