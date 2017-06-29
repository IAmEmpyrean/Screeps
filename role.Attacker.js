module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.room == creep.memory.home) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        //else if (creep.memory.working == false && creep.room != creep.memory.target) {
            // switch state
          //  creep.memory.working = true;
        //}

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // if in home room
            if (creep.room.name != creep.memory.home){
                // find exit to home room
                var exit = creep.room.findExitTo(creep.memory.home);
                // and move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // if in target room
            if (creep.room.name == creep.memory.target) {
                const enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                const eSpawn = creep.attack(creep.room.find(FIND_HOSTILE_SPAWNS)[0]);
                var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
            if(targets) {
                creep.attack(targets[0]);
            }
                else if(eSpawn) {
                    if(creep.attack(eSpawn) == ERR_NOT_IN_RANGE)
                        creep.moveTo(eSpawn);
                    
                }
                
                else{
                    if(creep.attack(enemy) == ERR_NOT_IN_RANGE)
                        creep.moveTo(enemy);
            }
        }
            // if not in target room
            else {
                // find exit to target room
                var exit = creep.room.findExitTo(creep.memory.target);
                // move to exit
                creep.moveTo(36,49); //creep.pos.findClosestByRange(exit)
            }
        }
    }
};