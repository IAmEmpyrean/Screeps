var roleUpgrader = require('role.Upgrader');
module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            // if no constructionSite is found
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
             var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                                 
                });
            // find closest source
            var sources = creep.room.find(FIND_DROPPED_RESOURCES);
            var source = _.sortBy(sources, s => creep.pos.getRangeTo(s));
            if(source.length)
            {
                creep.moveTo(source[0]);
                creep.pickup(source[0]);
            }
            else{
                var containers = creep.room.find(STRUCTURE_CONTAINER);
                var container = _.sortBy(containers, s => creep.pos.getRangeTo(s));
                creep.moveTo(container[0]);
                creep.withdraw(container[0],RESOURCE_ENERGY);
            }
        }
    }
};