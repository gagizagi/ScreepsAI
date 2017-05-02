let spawner = {

    run: function(getCreeps) {
        let liveCreeps = {
            worker: 0,
            harvester: 0,
            upgrader: 0,
            builder: 0
        }

        for(let name in Game.creeps) {
            let role = Game.creeps[name].memory.role
            liveCreeps[role]++
        }

        if(liveCreeps.worker < getCreeps.worker)
            creepFactory([WORK,CARRY,CARRY,MOVE], 'worker')
        else if(liveCreeps.harvester < getCreeps.harvester)
            creepFactory([WORK,CARRY,MOVE], 'harvester')
        else if(liveCreeps.upgrader < getCreeps.upgrader)
            creepFactory([WORK,CARRY,MOVE], 'upgrader')
        else if(liveCreeps.builder < getCreeps.builder)
            creepFactory([WORK,CARRY,MOVE], 'builder')
    }

}

module.exports = spawner

let creepFactory = function(body, role) {
    let memory = {
        role: role
    }
    Game.spawns['Spawn1'].createCreep(body, undefined, memory)
}