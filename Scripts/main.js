let roleHarvester = require('role.harvester')
let roleUpgrader = require('role.upgrader')
let roleBuilder = require('role.builder')

module.exports.loop = function () {
    for(let name in Game.creeps) {
        let creep = Game.creeps[name]
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep)
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep)
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep)
        }
    }
}
