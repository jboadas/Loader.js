module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-jsvalidate');
	grunt.initConfig({
		jsvalidate: {
			files: ['js/**']
		},
		concat: {
			'build/z.tmp': [
				"./js/**"
			]
		},
		min: {
			'./js/loader-min.js': ['z.tmp']
		}
	});
	grunt.registerTask('default', 'jsvalidate concat min");
};