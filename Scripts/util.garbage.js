let garbageCollector = {

    /**
     * Deletes memory of objects that no longer exist
     */
    run: () => {
        // Loop over all creep objects stored in memory
        for(var name in Memory.creeps) {
            // If the creep object exists in memory but not in game
            if(!Game.creeps[name]) {
                // Delete creep object in memory
                delete Memory.creeps[name]
            }
        }
    }

}

module.exports = garbageCollector
