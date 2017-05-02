let spawner = {

    /**
     * Automatically replenish creep numbers to match the parameter number
     * @param  {Object} getCreeps Object matching liveCreeps object
     */
    run: function(getCreeps) {
        let liveCreeps = {
            worker: 0,
            harvester: 0,
            upgrader: 0,
            builder: 0
        }

        // Count the number of creeps of each role currently in the game
        for(let name in Game.creeps) {
            let role = Game.creeps[name].memory.role
            liveCreeps[role]++
        }

        // Recreate any creep role that is missing members
        // TODO Make higher level creep types at higher game levels
        if(liveCreeps.worker < getCreeps.worker)
            creepFactory([WORK,WORK,CARRY,MOVE], 'worker')
        else if(liveCreeps.harvester < getCreeps.harvester)
            creepFactory([WORK,WORK,CARRY,MOVE], 'harvester')
        else if(liveCreeps.upgrader < getCreeps.upgrader)
            creepFactory([WORK,WORK,CARRY,MOVE], 'upgrader')
        else if(liveCreeps.builder < getCreeps.builder)
            creepFactory([WORK,WORK,CARRY,MOVE], 'builder')
    }

}

module.exports = spawner

/**
 * Helper function for creating creeps
 * @param  {Array} body Body array of the creep http://docs.screeps.com/api/#Creep
 * @param  {string} role Role of the created creep
 */
let creepFactory = function(body, role) {
    if(!Game.spawns['Spawn1']) return
    let memory = {
        role: role,
        work: false
    }
    Game.spawns['Spawn1'].createCreep(body, undefined, memory)
}
