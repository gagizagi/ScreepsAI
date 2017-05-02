class Worker {
    constructor(creep) {
        this.worker = creep
    }

    get needEnergy() {
        return this.worker.carry.energy == 0
    }

    get fullEnergy() {
        return this.worker.carry.energy == this.worker.carryCapacity
    }

    get working() {
        return this.worker.memory.work
    }

    set working(bool) {
        this.worker.memory.work = bool
    }

    harvestEnergy() {
        let sources = this.worker.room.find(FIND_SOURCES)
        if(this.worker.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            this.worker.moveTo(sources[0])
    }

    work() {
        let spawns = this.findTargets(STRUCTURE_SPAWN)
        let extensions = this.findTargets(STRUCTURE_EXTENSION)
        let towers = this.findTargets(STRUCTURE_TOWER)
        let constructions = this.worker.room.find(FIND_CONSTRUCTION_SITES)

        if(spawns.length > 0) this.dump(spawns)
        else if(extensions.length > 0) this.dump(extensions)
        else if(towers.length > 0) this.dump(towers)
        else if(constructions.length > 0) this.build(constructions)
        else this.upgrade()
    }

    findTargets(query) {
        return this.worker.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == query)
                    // Filter out structures with full energy
                    && structure.energy < structure.energyCapacity
            }
        })
    }

    build(targets) {
        if(this.worker.build(targets[0]) == ERR_NOT_IN_RANGE)
            this.worker.moveTo(targets[0])
    }

    dump(buildings) {
        if(this.worker.transfer(buildings[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.worker.moveTo(buildings[0] /* TODO add color */)
        }
    }

    upgrade() {
        if(this.worker.upgradeController(this.worker.room.controller) == ERR_NOT_IN_RANGE) {
            // If not in range of controller, move to it
            this.worker.moveTo(this.worker.room.controller /* TODO add color */)
        }
    }

}

module.exports = Worker
