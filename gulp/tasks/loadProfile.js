var gulp = require('gulp');
var fs = require('fs');
var git = require('gulp-git');
var handleErrors = require('../util/handleErrors');
var yaml = require('js-yaml');

var loadAndSave = function(cb) {
    // now read the files
    var domainList = [];
    yaml.safeLoadAll(fs.readFileSync('./BuildingProfile/domains.yaml'), function(doc) {
        domainList.push(doc);
    });
    var err = fs.writeFileSync("./src/www/domains.json", JSON.stringify(domainList));
    if (err) {
        cb(console.log(err));
        return;
    }

    var tagsList = [];
    yaml.safeLoadAll(fs.readFileSync('./BuildingProfile/tags.yaml'), function(doc) {
        tagsList.push(doc);
    });
    var err = fs.writeFileSync("./src/www/tags.json", JSON.stringify(tagsList));
    if (err) {
        cb(console.log(err));
        return;
    }
    cb(null);
}

gulp.task('loadProfile', function(cb) {
    fs.access('./BuildingProfile', fs.F_OK, function(err) {
        if (err) { // doesn't exist?
            // git clone it
            git.clone('https://github.com/gtfierro/BuildingProfile', null, function(err) {
                if (err) {
                  cb(console.log(err));
                  return;
                }
                loadAndSave(cb);
            });
        } else { // update it
            git.pull('origin', 'master', {cwd: "./BuildingProfile", args: "--rebase"}, function(err) {
                if (err) {
                  cb(console.log(err));
                  return;
                }
                loadAndSave(cb);
            });
        }
    });
    // pull the git repo for building profile ontology
    // transform the YAML file into JSON
    // save the JSON file in the config
    // have the react code read in the config file instead of hardcoding it
});
