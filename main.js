// imports
require('prototype.spawn')();
var roleMiner = require('role.Miner');
var roleUpgrader = require('role.Upgrader');
var roleConstructor = require('role.Constructor');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');
var roleRepairer = require('role.Repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleDefender = require('role.Defender');
var roleBuilder = require('role.Builder');
var roleTransporter = require('role.Transporter');
var roleAttacker = require('role.Attacker');
var HOME = 'W97S68';

//----- minimums
// setup some minimum numbers for different roles
    var minimumNumberOfMiners = 3;
    var minimumNumberOfUpgraders = 3;
    var minimumNumberOfTransporters = 1;
    var minimumNumberOfConstructors = 3;
    var minimumNumberOfRepairers = 2;
    var minimumNumberOfLongDistanceHarvestersW96S68 = 8;
    var minimumNumberOfLongDistanceHarvestersW97S67 = 8;
    var minimumNumberOfWallRepairers = 2;
    var minimumNumberOfLongDistanceHarvestersW98S68 = 8;
    var minimumNumberOfLongDistanceHarvestersW98S67 = 0;
    var minimumNumberOfDefenders = 8;
    var minimumNumberOfAttackersW97S69 = 0;
//---------

module.exports.loop = function () {
    var Cuck = Game.spawns.DogeMeme.hits;// Initial spawn hp check
    var energy = Game.spawns.DogeMeme.room.energyCapacityAvailable;
    // check for memory entries of dead creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is Miner, call Miner script
        if (creep.memory.role == 'Miner') {
            roleMiner.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'Upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is Transporter, call transporter script
        else if (creep.memory.role == 'Transporter') {
            roleTransporter.run(creep);
        }
        // if creep is Constructor, call Constructor script
        else if (creep.memory.role == 'Constructor') {
            roleConstructor.run(creep);
        }
        // if creep is Repairer, call Repairer script
         else if (creep.memory.role == 'Repairer') {
            roleRepairer.run(creep);
        }
        // if creep is LDH, call LDH script
        else if (creep.memory.role == 'longDistanceHarvester') {
            roleLongDistanceHarvester.run(creep);
        }
        // if creep is Defender, call Defender script
        else if (creep.memory.role == 'Defender') {
            roleDefender.run(creep);
        }
        // if creep is wallRepairer, call wallRepairer script
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'Attacker') {
            roleAttacker.run(creep);
        }
    }

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a role
    var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'Miner');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'Upgrader');
    var numberOfTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'Transporter');
    var numberOfConstructors = _.sum(Game.creeps, (c) => c.memory.role == 'Constructor');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'Repairer');
    var numberOfLDH = _.sum(Game.creeps, (c) => c.memory.role == 'LongDistanceHarvester');
    var numberOfLongDistanceHarvestersW96S68 = _.sum(Game.creeps, (c) =>
        c.memory.role == 'longDistanceHarvester' && c.memory.target == 'W96S68');
    var numberOfLongDistanceHarvestersW97S67 = _.sum(Game.creeps, (c) =>
        c.memory.role == 'longDistanceHarvester' && c.memory.target == 'W97S67');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
    var numberOfDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'Defender');
    var numberOfLongDistanceHarvestersW98S68 = _.sum(Game.creeps, (c) =>
        c.memory.role == 'longDistanceHarvester' && c.memory.target == 'W98S68');
    var numberOfLongDistanceHarvestersW98S67 = _.sum(Game.creeps, (c) =>
        c.memory.role == 'longDistanceHarvester' && c.memory.target == 'W98S67');
    var numberOfAttackersW97S69 = _.sum(Game.creeps, (c) =>
        c.memory.role == 'Attacker' && c.memory.target == 'W97S69');
    
    //default name
    var name = undefined;

    // if not enough Miners
    if (numberOfMiners < minimumNumberOfMiners) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createMiner(energy, 1);
            
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createCustomCreep(energy, 'Upgrader');
    }
    // if not enough Transporters
    else if (numberOfTransporters < minimumNumberOfTransporters) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createTransporter(energy);
    }
    // if not enough Constructors
    else if (numberOfConstructors < minimumNumberOfConstructors) {
        // try to spawn one
       name = Game.spawns.DogeMeme.createCustomCreep(energy, 'Constructor');
           
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createCustomCreep(energy, 'Repairer');
            
    }
    
    // if not enough longDistanceHarvesters for W97S67
    else if (numberOfLongDistanceHarvestersW97S67 < minimumNumberOfLongDistanceHarvestersW97S67) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createLongDistanceHarvester(energy, 2, HOME, 'W97S67', 0);
    }
    // if not enough longDistanceHarvesters for W96S68
    else if (numberOfLongDistanceHarvestersW96S68 < minimumNumberOfLongDistanceHarvestersW96S68) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createLongDistanceHarvester(energy, 2, HOME, 'W96S68', 0);
    }
    // if not enough wallRepairers
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createCustomCreep(energy, 'wallRepairer');
    }
    // if not enough longDistanceHarvesters for W98S68
    else if (numberOfLongDistanceHarvestersW98S68 < minimumNumberOfLongDistanceHarvestersW98S68) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createLongDistanceHarvester(energy, 2, HOME, 'W98S68', 0);
    }
    // if not enough longDistanceHarvesters for W98S67
    else if (numberOfLongDistanceHarvestersW98S67 < minimumNumberOfLongDistanceHarvestersW98S67){
        // try to spawn one
        name = Game.spawns.DogeMeme.createLongDistanceHarvester(energy, 2, HOME, 'W98S67', 0);
    }
    // if not enough Defenders
    else if (numberOfDefenders < minimumNumberOfDefenders) {
        // try to spawn one
        name = Game.spawns.DogeMeme.createDefender(energy, 2, HOME, 0);
    }
    else if (numberOfAttackersW97S69 < minimumNumberOfAttackersW97S69){
        // try to spawn one
        name = Game.spawns.DogeMeme.createAttacker(energy, 7, HOME, 'W97S69', 0);
    }

    // print name to console if spawning was a success
    if (!(name < 0)) {
        console.log("number of miners: " + numberOfMiners);
        console.log("Number of Upgraders: " + numberOfUpgraders);
        console.log("Number of Transporters: " + numberOfTransporters);
        console.log("Number of Constructors: " + numberOfConstructors);
        console.log("Number of Repairers: " + numberOfRepairers);
        console.log("Number of Wall Repairers: " + numberOfWallRepairers);
        console.log("Number of Long Distance Miners: " + numberOfLDH + " W97S67: " + numberOfLongDistanceHarvestersW97S67 + " W96S68: " + numberOfLongDistanceHarvestersW96S68 + " W98S68: " + numberOfLongDistanceHarvestersW98S68 + " W98S67: " + numberOfLongDistanceHarvestersW98S67);
        console.log("Number of Defenders: " + numberOfDefenders);
        console.log("Number of Attackers: "+" W97S69: " + numberOfAttackersW97S69);
        console.log("Spawned new creep: " + name);
    }
    //Checks if you are getting cucked and automatically responds
    if(Cuck < 5000){
        Game.spawns.DogeMeme.room.controller.activateSafeMode;
        Game.notify("You are getting cucked, anti cucker activation attempted. Get on asap");
    }
};