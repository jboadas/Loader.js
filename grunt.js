module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-jsvalidate');
	grunt.initConfig({
		jsvalidate: {
			files: ['js/**']
		},
		exec: {
			manifest: {
				command: 'node ./grunt.manifest.js',
				stdout: true
			}
		},
		copy: {
			dist: {
				files: {
					"build/color-piano/inc/": "inc/**",
					"build/color-piano/media/": "media/**",
					"build/color-piano/soundfont/soundfont-ogg.js": "soundfont/soundfont-ogg.js"
				}
			}
		},
		compress: {
			zip: {
				files: {
					"build/color-piano.zip": "build/color-piano/**"
				}
			}
		},
		concat: {
			'build/color-piano/z.tmp': [
				"./js/Color/SpaceW3.js",
				"./js/MIDI/audioDetect.js",
				"./js/MIDI/loadPlugin.js",
				"./js/MIDI/Player.js",
				"./js/MIDI/Plugin.js",
				"./js/MusicTheory/_musictheory.js",
				"./js/MusicTheory/Chords.js",
				"./js/MusicTheory/Synesthesia.js",
				"./js/MusicTheory/Scales.js",
				"./js/MusicTheory/Solfege.js",
				"./js/Polyfill/Base64.js",
				"./js/Polyfill/Dimensions.js",
				"./js/Polyfill/JSON.js",
				"./js/Polyfill/RequestAnimationFrame.js",
				"./js/Polyfill/String.js",
				"./js/Widgets/Loader.js",
				"./js/Widgets/Uploader.js",
				"./js/Window/DOMLoader.script.js",
				"./js/Window/DOMLoader.XMLHttp.js",
				"./js/Window/Event.js",
				"./inc/jasmid/stream.js",
				"./inc/jasmid/midifile.js",
				"./inc/jasmid/replayer.js",
				"./inc/jsmidi.js",
				"./inc/base64binary.js",
//				"./inc/Three.js",
				"./inc/filer.min.js",
				"./js/Piano/_piano.js",
				"./js/Piano/Animation.js",
				"./js/Piano/Keyboard.js",
				"./js/Piano/Play.js",
				"./js/Piano/Render.js",
				"./js/Piano/UI.js",
				"./js/Piano/UI.MusicBox.js",
				"./js/Piano/UI.Topbar.js"
			]
		},
		min: {
			'build/color-piano/min/app.js': ['build/color-piano/z.tmp']
		},
		mincss: {
			compress: {
				files: {
					"build/color-piano/min/app.css": [
						'css/Piano.css'
					]
				}
			}
		}
	});
	///
	grunt.registerTask('default', 'jsvalidate copy concat min mincss exec');
//	grunt.registerTask('default', 'jsvalidate concat min mincss exec');
//	grunt.registerTask('default', 'compress');
//	grunt.registerTask('default', 'exec');
//	grunt.registerTask('default', 'jsvalidate');
	///
};