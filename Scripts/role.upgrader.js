let Upgrader = require('class.upgrader')

let roleUpgrader = {
    
    run: function(creep) {
        let upgrader = new Upgrader(creep)

        if(!upgrader.working && upgrader.fullEnergy)
            upgrader.working = creep.memory.work = true
        if(upgrader.working && upgrader.needEnergy)
            upgrader.working = creep.memory.work = false

        if(!upgrader.working) upgrader.harvestEnergy()
        else upgrader.work()
    }
}

module.exports = roleUpgrader
