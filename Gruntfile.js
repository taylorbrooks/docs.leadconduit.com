module.exports = function(grunt) {
  grunt.initConfig({
    run: {
      lc_fields: {
        args: [
          'lcFields.js'
        ]
      }
    },
    // Compile JS
    uglify: {
      my_target: {
        files: {
          'app/app.min.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/lodash/dist/lodash.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'app/js/index.js',
            'app/js/modules.js'
          ]
        }
      }
    },
    // Compile CSS
    cssmin: {
      combine: {
        files: {
          'app/css/app.min.css': [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/font-awesome/css/font-awesome.css',
            'app/css/main.css'
          ]
        }
      }
    },
    // Upload to S3
    aws: grunt.file.readJSON('grunt-aws.json'),
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read'
      },
      dev: {
        upload: [
          {
            src: 'fields.json',
            dest: 'fields.json'
          },
          {
            src: 'app/index.html',
            dest: 'index.html',
            options: {
              gzip: true,
              verify: true
            }
          },
          {
            src: 'app/app.min.js',
            dest: 'app.min.js',
            options: {
              gzip: true,
              verify: true
            }
          },
          {
            src: 'app/img/*',
            dest: 'img/',
            options: {
              verify: true
            }
          },
          {
            src: 'app/css/app.min.css',
            dest: 'app.min.css',
            options: {
              verify: true
            }
          },
          {
            src: 'bower_components/font-awesome/fonts/*',
            dest: 'fonts/',
            options: {
              gzip: true,
              verify: true
            }
          }
        ]
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-s3');

  // Define app tasks
  grunt.registerTask('default', ['run:lc_fields', 'uglify', 'cssmin', 's3']);
};
