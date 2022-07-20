let modInfo = {
	name: "The Math Tree",
	id: "greekmath",
	author: "Agrda215",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Fun Fun.",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1 - Start</h3><br>
		- Added ? Upgrades.<br>
		- Added 5 Buyables.<br>
    - Added 2 Tab.<br>
    - Added 1 Clickable.<br>
    - Added 1 Display Text<br>
    - Endgame:6 &beta;-Power`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if(hasUpgrade("greek1", 11)) gain = gain.times(8)
  if(hasUpgrade("greek1", 12)) gain = gain.times(player.greek1.points.pow(2))
  if(hasUpgrade("greek1", 13)) gain = gain.times(player.greek1.points.pow(3))
  if(hasUpgrade("greek1", 15)) gain = gain.times(player.greek1.points.pow(3))
  if(hasUpgrade("greek1", 21)) gain = gain.times(player.greek1.points.pow(3))
  if(hasUpgrade("greek1", 22)) gain = gain.times(player.greek1.points.pow(4))
  gain = gain.times(player.greek1.trans)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.greek2.points.gte(new Decimal("6"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(86400) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}