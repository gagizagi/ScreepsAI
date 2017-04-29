module.exports = function(grunt) {

    // Get username & password from env variables
    var username = process.env.screeps_email
    var password = process.env.screeps_password

    grunt.loadNpmTasks('grunt-screeps')

    grunt.initConfig({
        screeps: {
            options: {
                email: username,
                password: password,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['Scripts/*.js']
            }
        }
    })
}
