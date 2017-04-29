module.exports = function(grunt) {
    var env = process.env
    grunt.loadNpmTasks('grunt-screeps')

    grunt.initConfig({
        screeps: {
            options: {
                email: env.screeps_email,
                password: env.screeps_password,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['Scripts/*.js']
            }
        }
    })
}
