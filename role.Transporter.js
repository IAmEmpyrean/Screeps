module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to transport but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is grabbing energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to deposit energy
        if (creep.memory.working == true) {
            // find closest depositable spot
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER
                             || s.structureType == STRUCTURE_CONTAINER)
                             && s.energy < s.energyCapacity
            });

            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            
        }
        // if creep is supposed to grab energy
        else {
            // find closest dropped energy
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