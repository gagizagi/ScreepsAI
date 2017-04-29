let roleBuilder = {

    /**  
     * run - Base builder role function
     * if creep has energy it will attempt to build structures
     * else if will attempt to gather energy
     *
     * @param  {Creep} creep http://docs.screeps.com/api/#Creep
     */
    run: function(creep) {

        // {bool} building is a state in creep memory
        // TRUE     - creep attempts to build structures
        // FALSE    - creep attempts to gather energy
        // If creep is building but runs ouf of energy set to false
        // If creep is not building but has full energy set to true
        if(creep.memory.building && creep.carry.energy == 0)
            creep.memory.building = false
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity)
            creep.memory.building = true

        // If creep is building
        if(creep.memory.building) {
            // Get an array of construction sites
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES)
            // If the array is not empty attempt to build 0th construction site
            if(targets.length) {
                // If creep is not in range of 0th construction site
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE)
                    // Move to 0th construction site
                    creep.moveTo(targets[0] /* TODO add color */)
            }
        }
        // If creep is not building
        else {
            // Get an array of energy sources
            let sources = creep.room.find(FIND_SOURCES)
            // If creep is not in range of the 0th energy source
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
                // Move to 0th energy source
                creep.moveTo(sources[0] /* TODO add color */)
        }
    }

}

module.exports = roleBuilder
