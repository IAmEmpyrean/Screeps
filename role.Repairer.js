var roleConstructor = require('role.Constructor');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to repair something but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleConstructor.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var sources = creep.room.find(FIND_DROPPED_RESOURCES);
            var source = _.sortBy(sources, s => creep.pos.getRangeTo(s));
            var containers = creep.room.find(STRUCTURE_CONTAINER)
            var container = _.sortBy(containers, s => creep.pos.getRangeTo(s));
            if(source.length)
            {
                creep.moveTo(source[0]);
                creep.pickup(source[0]);
            }
            else{
                creep.moveTo(container[0]);
                creep.withdraw(container[0],RESOURCE_ENERGY);
            }
        }
    }
};