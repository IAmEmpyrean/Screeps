module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: roleName, working: false });
        };

    // create a new function for StructureSpawn
    StructureSpawn.prototype.createLongDistanceHarvester =
        function (energy, numberOfWorkParts, home, target, sourceIndex) {
            // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
            var body = [];
            for (let i = 0; i < numberOfWorkParts; i++) {
                body.push(WORK);
            }

            // 150 = 100 (cost of WORK) + 50 (cost of MOVE)
            energy -= 150 * numberOfWorkParts;

            var numberOfParts = Math.floor(energy / 100);
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body
            return this.createCreep(body, undefined, {
                role: 'longDistanceHarvester',
                home: home,
                target: target,
                sourceIndex: sourceIndex,
                working: false
            });
        };
        
         StructureSpawn.prototype.createDefender =
        function (energy, numberOfWeapons, home, sourceIndex) {
            // create a body with the specified number of TOUGH parts and one MOVE part per non-MOVE part
            var body = [];
            for (let i = 0; i < numberOfWeapons; i++) {
                body.push(TOUGH);
            }

            
            energy -= 10 * numberOfWeapons;

            var numberOfParts = Math.floor(energy/130);
            for (let i = 0; i < numberOfParts; i++) {
                body.push(ATTACK);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body
            return this.createCreep(body, undefined, {
                role: 'Defender',
                home: home,
                sourceIndex: sourceIndex,
                working: false
            });
        };
        
        
        StructureSpawn.prototype.createMiner =
        function (energy, numberOfWorkParts) {
            // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
            var body = [];
            for (let i = 0; i < numberOfWorkParts+2; i++) {
                body.push(WORK);
            }
            
            
            energy -= 350 * numberOfWorkParts;

            var numberOfParts = Math.floor(energy / 100);
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body
            return this.createCreep(body, undefined, {
                role: 'Miner',
                working: false
            });
        };
        
        
        StructureSpawn.prototype.createTransporter =
        function(energy) {
            // create a balanced body as big as possible with the given energy
            var numberOfParts = Math.floor(energy / 100);
            var body = [];
            for (let i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }

            // create creep with the created body and the given role
            return this.createCreep(body, undefined, { role: 'Transporter', working: false });
        };
        
};