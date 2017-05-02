const Worker = require('class.worker')

class Upgrader extends Worker {

    work() {
        this.upgrade()
    }

}

module.exports = Upgrader
