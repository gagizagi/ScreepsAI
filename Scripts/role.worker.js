let Worker = require('class.worker')

let roleWorker = {

    /**
     * Worker is a basic creep module with that inclused all other creep modules
     * decides worker action based on priority system
     * @param  {object} creep http://docs.screeps.com/api/#Creep
     */
    run: (creep) => {
        // Worker is a wrapper class of Creep class
        let worker = new Worker(creep)

        // Updates the state of the worker
        // If it is not working and on full energy, make it work
        // If it is working but runs out of energy, make it refill energy
        if(!worker.working && worker.fullEnergy)
            worker.working = creep.memory.work = true
        if(worker.working && worker.needEnergy)
            worker.working = creep.memory.work = false
            
        if(!worker.working) worker.harvestEnergy()
        else worker.work()
    }

}

module.exports = roleWorker
