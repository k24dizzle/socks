module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			js: {
				src: ['public/app.js', 'public/controllers/*.js', 'public/directives/*.js', 'public/services/*.js'],
				dest: 'public/build/script.js',
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);
};