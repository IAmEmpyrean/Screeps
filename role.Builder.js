var roleUpgrader = require('role.Upgrader');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to deposit energy but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is grabbing energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to deposit
        if (creep.memory.working == true) {
            // find closest storage
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to deposit
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the storage
                    creep.moveTo(constructionSite);
                }
            }
            
        }
        // if creep is supposed to deposit
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(source.length)
            {
                creep.moveTo(source[0]);
                creep.pickup(source[0]);
            }
        }
    }
};