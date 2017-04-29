let roleHarvester = {

    /**
     * run - Base harvester role function
     * if creep has energy it will attempt to transfer it to structures
     * else if will attempt to gather energy
     *
     * @param  {Creep} creep http://docs.screeps.com/api/#Creep
     */
    run: function(creep) {
        // If creep is not on full energy
        if(creep.carry.energy < creep.carryCapacity) {
            // Get array of energy sources
            let sources = creep.room.find(FIND_SOURCES)
            // Try to harvest the energy source
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                // If not in range to harvest energy source, move to it
                creep.moveTo(sources[0] /* TODO add color */)
        }
        // If creep is on full energy
        else {
            // Get array of structures that require energy
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( // Filter structure types
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER)
                        // Filter out structures with full energy
                        && structure.energy < structure.energyCapacity
                }
            })

            // If targets array is not empty
            if(targets.length > 0) {
                // Attempt to transfer energy from creep to 0th target
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // If not in range of 0th target move to it
                    creep.moveTo(targets[0] /* TODO add color */)
                }
            }
        }
    }

}

module.exports = roleHarvester
