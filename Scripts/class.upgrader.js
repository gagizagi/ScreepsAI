const Worker = require('class.worker')

class Upgrader extends Worker {

    /* Worker work method overloaded for Upgrader use */
    work() {
        this.upgrade()
    }

}

module.exports = Upgrader
