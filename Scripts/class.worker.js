/**
 * Basic worker creep class
 * @type {class}
 */
class Worker {
    constructor(creep) {
        this.worker = creep
    }

    // True if worker is on 0 energy
    // false if above 0 energy
    get needEnergy() {
        return this.worker.carry.energy == 0
    }

    // True if worker is on full energy
    // false if below max energy
    get fullEnergy() {
        return this.worker.carry.energy == this.worker.carryCapacity
    }

    // True if worker is working
    // false if worker is not working
    get working() {
        return this.worker.memory.work
    }

    // Sets work property in worker memory
    set working(bool) {
        this.worker.memory.work = bool
    }

    /**
     * Make the worker find a source of energy and then harvest it
     * If it is not in range it will first move to it
     */
    harvestEnergy() {
        let sources = this.worker.room.find(FIND_SOURCES)
        if(this.worker.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            this.worker.moveTo(sources[0])
    }

    /**
     * Assign work to worker based on priority system
     * 1. Transfer energy to Spawn
     * 2. Transfer energy to extensions
     * 3. Trasnfer energy to towers
     * 4. Build construction sites
     * .
     * .
     * Last priority is upgrading the controller
     */
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

    /**
     * Query all relevant objects to find worker targets
     * @param  {const} query Structure_type constant you wish to find
     * @return {array} returns array of structure objects that meet criteria
     * http://docs.screeps.com/api/#Structure
     */
    findTargets(query) {
        return this.worker.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == query)
                    // Filter out structures with full energy
                    && structure.energy < structure.energyCapacity
            }
        })
    }

    /**
     * Make the worker build provided construction sites
     * Will move to it first if not in range
     * @param  {array} targets construction sites that need to be built
     * http://docs.screeps.com/api/#ConstructionSite
     */
    build(targets) {
        if(this.worker.build(targets[0]) == ERR_NOT_IN_RANGE)
            this.worker.moveTo(targets[0])
    }

    /**
     * Make the worker transfer energy to provided structures
     * Will move to it first if not in range
     * @param  {array} buildings structures not on full energy
     * http://docs.screeps.com/api/#Structure
     */
    dump(buildings) {
        if(this.worker.transfer(buildings[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.worker.moveTo(buildings[0] /* TODO add color */)
        }
    }

    /**
     * Make the worker transfer energy to the room controller
     * Will move to it first if not in range
     * http://docs.screeps.com/api/#StructureController
     */
    upgrade() {
        if(this.worker.upgradeController(this.worker.room.controller) == ERR_NOT_IN_RANGE) {
            // If not in range of controller, move to it
            this.worker.moveTo(this.worker.room.controller /* TODO add color */)
        }
    }

}

module.exports = Worker
