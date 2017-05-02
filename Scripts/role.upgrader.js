let Upgrader = require('class.upgrader')

let roleUpgrader = {

    /**
     * Upgrader is an upgrader worker sub module
     * Unlike the worker module this one will only upgrade the controller
     * @param  {object} creep http://docs.screeps.com/api/#Creep
     */
    run: function(creep) {
        // Upgrader is a subclass of Worker
        let upgrader = new Upgrader(creep)

        // Updates the state of the worker
        // If it is not working and on full energy, make it work
        // If it is working but runs out of energy, make it refill energy
        if(!upgrader.working && upgrader.fullEnergy)
            upgrader.working = creep.memory.work = true
        if(upgrader.working && upgrader.needEnergy)
            upgrader.working = creep.memory.work = false

        if(!upgrader.working) upgrader.harvestEnergy()
        else upgrader.work()
    }
}

module.exports = roleUpgrader
