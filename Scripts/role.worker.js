let roleHarvester = require('role.harvester')
let roleUpgrader = require('role.upgrader')

let roleWorker = {

    run: function(creep) {
        if(creep.memory.refill && creep.carry.energy == creep.carryCapacity)
            creep.memory.refill = false
        if(!creep.memory.refill && creep.carry.energy == 0)
            creep.memory.refill = true

        if(creep.memory.refill) workerRefill(creep)
        else workerWork(creep)
    }

}

module.exports = roleWorker

let workerWork = creep => {
    debugger
    roleHarvester.run(creep, STRUCTURE_SPAWN)
    roleUpgrader.run(creep)
}

let workerRefill = creep => {
    let sources = creep.room.find(FIND_SOURCES)
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
        creep.moveTo(sources[0])
}
