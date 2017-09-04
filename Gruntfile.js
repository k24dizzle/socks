module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			js: {
				src: ['public/*.js'],
				dest: 'build/script.js',
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);
};