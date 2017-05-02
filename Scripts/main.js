let roleHarvester = require('role.harvester')
let roleUpgrader = require('role.upgrader')
let roleBuilder = require('role.builder')
let roleWorker = require('role.worker')
let spawner = require('util.spawner')
let gc = require('util.garbage')

module.exports.loop = () => {
    let getCreeps = {
        worker: 5,
        harvester: 0,
        upgrader: 1,
        builder: 0
    }
    spawner.run(getCreeps)
    // Loop over all Creeps
    for(let name in Game.creeps) {
        // This creep
        let creep = Game.creeps[name]

        // Run function for this crap based on its role
        switch(creep.memory.role) {
        case 'worker':
            roleWorker.run(creep)
            break
        case 'harvester':
            roleHarvester.run(creep)
            break
        case 'upgrader':
            roleUpgrader.run(creep)
            break
        case 'builder':
            roleBuilder.run(creep)
            break
        }
    }

    gc.run()
}
