let Worker = require('class.worker')

let roleWorker = {

    run: (creep) => {
        let worker = new Worker(creep)

        if(!worker.working && worker.fullEnergy)
            worker.working = creep.memory.work = true
        if(worker.working && worker.needEnergy)
            worker.working = creep.memory.work = false

        if(!worker.working) worker.harvestEnergy()
        else worker.work()
    }

}

module.exports = roleWorker
