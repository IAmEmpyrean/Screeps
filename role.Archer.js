module.exports = {
    run: function(creep){
        //default target code
    var targets = -10;
    //find targets in range
    var targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
            if(targets.length > 0) {
                creep.rangedAttack(targets[0]);
                creep.rangedMassAttack;
            }
            //find targets in room
            else{
                var targets = creep.room.find(FIND_HOSTILE_CREEPS);
                if(targets.length > 0){
                    creep.moveTo(targets[0])
                }
            }
    //move about randomly
    if(targets == ''){
        var x = Math.floor((Math.random() * 100) + 1);
        var y = Math.floor((Math.random() * 100) + 1);
        if(x < 48 && y <48){
        if (creep.moveTo(x,y) == 0)
            creep.moveTo(x,y);
        }
    }
    
    }
};