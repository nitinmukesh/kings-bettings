/**
 * `clean`
 *
 * ---------------------------------------------------------------
 *
 * Remove the files and folders in your Sails app's web root
 * (conventionally a hidden directory called `.tmp/public`).
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-clean
 *
 */
module.exports = function (grunt) {
    grunt.config.set('mocha_istanbul', {
        coverage: {
            src: 'test', // the folder, not the files
            options: {
                coverageFolder: 'coverage',
                mask: '**/*.spec.js',
                root: 'api/services'
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha-istanbul');
};