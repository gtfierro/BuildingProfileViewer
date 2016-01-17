var gulp = require('gulp');
var fs = require('fs');
var git = require('gulp-git');
var handleErrors = require('../util/handleErrors');
var yaml = require('js-yaml');

gulp.task('loadProfile', function() {
    fs.access('./BuildingProfile', fs.F_OK, function(err) {
        if (err) { // doesn't exist?
            // git clone it
            git.clone('https://github.com/gtfierro/BuildingProfile', null, function(err) {
                if (err) {
                  return console.log(err);
                }
            });
        } else { // update it
            git.pull('origin', 'master', {cwd: "./BuildingProfile"}, function(err) {
                if (err) {
                  return console.log(err);
                }
            });
        }
        // now read the files
        var domainList = [];
        yaml.safeLoadAll(fs.readFileSync('./BuildingProfile/domains.yaml'), function(doc) {
            domainList.push(doc);
        });
        var err = fs.writeFileSync("./src/www/domains.json", JSON.stringify(domainList));
        if (err) {
            return console.log(err);
        }

        var tagsList = [];
        yaml.safeLoadAll(fs.readFileSync('./BuildingProfile/tags.yaml'), function(doc) {
            tagsList.push(doc);
        });
        var err = fs.writeFileSync("./src/www/tags.json", JSON.stringify(tagsList));
        if (err) {
            return console.log(err);
        }
    });
    // pull the git repo for building profile ontology
    // transform the YAML file into JSON
    // save the JSON file in the config
    // have the react code read in the config file instead of hardcoding it
});
