let roleHarvester = require('role.harvester')
let roleUpgrader = require('role.upgrader')
let roleBuilder = require('role.builder')

module.exports.loop = function () {

    // Loop over all Creeps
    for(let name in Game.creeps) {
        // This creep
        let creep = Game.creeps[name]

        // Run function for this crap based on its role
        switch(creep.memory.role) {
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
}
