let roleUpgrader = {

    /**
     * run - Base upgrader role function
     * if creep has energy it will attempt to upgrade the controller
     * else it will attempt to gather energy
     *
     * @param  {Creep} creep http://docs.screeps.com/api/#Creep
     */
    run: function(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            // If not in range of controller, move to it
            creep.moveTo(creep.room.controller /* TODO add color */)
        }
    }
}

module.exports = roleUpgrader
