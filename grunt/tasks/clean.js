module.exports = function(grunt) {
	'use strict';

	grunt.renameTask('clean', '_clean');
	grunt.registerTask('clean', ['_clean:build']);
	grunt.registerTask('mrproper', ['clean', '_clean:node_modules', '_clean:bower_components', '_clean:coverage']);
};
