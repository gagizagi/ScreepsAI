var roleHarvester = require('role.harvester');

module.exports.loop = function () {
    //Hi
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}
