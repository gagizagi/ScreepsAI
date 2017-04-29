let roleUpgrader = {

    /**
     * run - Base upgrader role function
     * if creep has energy it will attempt to upgrade the controller
     * else it will attempt to gather energy
     *
     * @param  {Creep} creep http://docs.screeps.com/api/#Creep
     */
    run: function(creep) {

        // {bool} upgrading is a state in creep memory
        // TRUE     - creep attempts to upgrade controller
        // FALSE    - creep attempts to gather energy
        // If creep is upgrading but runs ouf of energy set to false
        // If creep is not upgrading but has full energy set to true
        if(creep.memory.upgrading && creep.carry.energy == 0)
            creep.memory.upgrading = false
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity)
            creep.memory.upgrading = true

        // If creep is upgrading
        if(creep.memory.upgrading) {
            // Attempt to upgrade controller
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // If not in range of controller, move to it
                creep.moveTo(creep.room.controller /* TODO add color */)
            }
        }
        // If not upgrading
        else {
            // Get an array of energy sources
            let sources = creep.room.find(FIND_SOURCES)
            // Attempt to harvest 0th energy resource
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                // If not in range of 0th energy resource, move to it
                creep.moveTo(sources[0] /* TODO add color */)
            }
        }
    }
}

module.exports = roleUpgrader
