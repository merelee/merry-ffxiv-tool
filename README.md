# Merry FFXIV Tool
A browser tool using XIVAPI to pull data about your character.

HEAVY WORK IN PROGRESS!!!!

# How to Use

## Installation
You need Node.js to use this. https://nodejs.org/en/download/

Clone using `git`

`git clone https://github.com/merelee/merry-ffxiv-tool`

Then enter the directory and install the dependencies.

`cd merry-ffxiv-tool`
`npm install`

## Configuration

Open config.json

```
{
    "lodestoneId": "2650420"
}
```

Replace the ID with your lodestone ID. You can find your ID by searching for your character on the lodestone.

https://na.finalfantasyxiv.com/lodestone/character/

Then, once at your character profile. Copy the numbers at the end of the URL. For example, if my URL were:

https://na.finalfantasyxiv.com/lodestone/character/2650420/

Then my lodestoneId will be 2650420.

## Starting the server

Start the server using `node` from the installation directory.

`node server.js`

Then navigate to http://localhost:3000/