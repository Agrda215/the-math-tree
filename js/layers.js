addLayer("greek1", {
    name: "greek 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "&alpha;", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
      abasereq:new Decimal(2.25),
      req:new Decimal(10),
      trans:new Decimal(1),
      gen:new Decimal(0),
      g1:new Decimal(0),
      g2:new Decimal(0),
      g3:new Decimal(0),
      g4:new Decimal(0),
      g5:new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "&alpha;-Power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for &alpha;-Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  automate(){
    player.greek1.req = new Decimal.pow(player.greek1.abasereq, player.greek1.points).mul(10)
    player.greek1.gen = player.greek1.gen.add(player.greek1.g1)
    player.greek1.g1 = player.greek1.g1.add(player.greek1.g2)
    player.greek1.g2 = player.greek1.g2.add(player.greek1.g3)
    player.greek1.g3 = player.greek1.g3.add(player.greek1.g4)
    player.greek1.g4 = player.greek1.g4.add(player.greek1.g5)
    player.greek1.trans = player.greek1.gen.pow(2.5).add(1)
  },
    tabFormat: {
    "Main": {
        content: [
          "main-display",
          "clickables",
          "milestones",
          "upgrades"
        ],
    },
    "Generators": {
        content: [
          "main-display",
          ["display-text",
        function() { return 'You Have ' + player.greek1.gen + " generator, translated to a x" + player.greek1.trans + " of point gain." },
        { "color": "yellow", "font-size": "27px", "font-family": "Consolas" }],
          "buyables"
        ],
    },
},
  clickables: {
    11: {
        display() {return "<h2>Prestige +1 &alpha;-Power</h2><br>Req:" + format(player.greek1.req) + " Points"},
        canClick() {return player.points.gte(player.greek1.req)},
        onClick() {
          player.greek1.points = player.greek1.points.add(1)
        }
    }
},
  upgrades:{
    11:{
      title:"GOLAY",
      description:"EVER GAIN.",
      cost:new Decimal(4)
    },
    12:{
      title:"POWER",
      description:"GET <span class=\"aleph\">&alpha;<sup>2</sup></span> GAIN.",
      cost:new Decimal(7)
    },
    13:{
      title:"EveN GolD",
      description:"GET <span class=\"aleph\">&alpha;<sup>3</sup></span> GAIN.",
      cost:new Decimal(12)
    },
    14:{
      title:"Something New?",
      description:"Unlock new Tab.",
      cost:new Decimal(25)
    },
    15:{
      title:"EveN GolD",
      description:"GET <span class=\"aleph\">&alpha;<sup>3</sup></span> GAIN.",
      cost:new Decimal(50)
    },
    21:{
      title:"EveN GolD",
      description:"GET <span class=\"aleph\">&alpha;<sup>3</sup></span> GAIN.",
      cost:new Decimal(85)
    },
    22:{
      title:"EveN GolD",
      description:"GET <span class=\"aleph\">&alpha;<sup>4</sup></span> GAIN.",
      cost:new Decimal(117)
    },
  },
  buyables: {
    11: {
        cost(x) { return new Decimal(27).mul(x.add(1)) },
        display() { return "<h2>Generator 1</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player.greek1.g1 = player.greek1.g1.add(1)
        },
    },
    12: {
        cost(x) { return new Decimal(69).mul(x.add(1)) },
        display() { return "<h2>Generator 2</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player.greek1.g2 = player.greek1.g2.add(1)
        },
    },
    13: {
        cost(x) { return new Decimal(111).mul(x.add(1)) },
        display() { return "<h2>Generator 3</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player.greek1.g3 = player.greek1.g3.add(1)
        },
    },
    14: {
        cost(x) { return new Decimal(145).mul(x.add(1)) },
        display() { return "<h2>Generator 4</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player.greek1.g4 = player.greek1.g4.add(1)
        },
    },
    15: {
        cost(x) { return new Decimal(172).mul(x.add(1)) },
        display() { return "<h2>Generator 5 (UNLOCK I)</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player.greek1.g5 = player.greek1.g5.add(1)
        },
    },
}
})

addLayer("greek2", {
    name: "greek 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "&beta;", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["greek1"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0000FF",
    requires: new Decimal(1e61), // Can be a function that takes requirement increases into account
    resource: "&beta;-Power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(3)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for &beta;-Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})