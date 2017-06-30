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
                var allies = creep.room.find(FIND_MY_CREEPS, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => (s.hits < s.hitsMax)
                });
                if(allies[0]){
                    if(creep.heal(allies[0]) == ERR_NOT_IN_RANGE)
                        creep.moveTo(allies[0]);
            }
            else{
                creep.moveTo(20,15)
            }
        }
            // if not in target room
            else {
                // find exit to target room
                var exit = creep.room.findExitTo(creep.memory.target);
                // move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit)); //creep.pos.findClosestByRange(exit)
            }
        }
    }
};