'use strict';
const UglifyJS = require("uglify-js");

const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const mini = {};
var rootDir
function run(dirname,writeDirectory) {
    dirname = dirname || __dirname
    if(!rootDir)
        rootDir = dirname
    var next = dirname.replace(rootDir,'')
    var subDirectory = "/release.min"
    writeDirectory = writeDirectory || dirname + subDirectory
    console.log(dirname);
    fs
        .readdirSync(dirname)
        .filter(file => {
            var igone = ['test.js', 'UglifyJS.js',
                'app.js',
                'app.build.mini.js',
                'minify.js', 'require.js']
            //console.log(file);
            if (!fs.statSync(dirname+'/'+file).isFile() 
                &&file!='release.min'
            ) {
                //directory

                var dir = rootDir + subDirectory+''+next+ '/'+file
                const fileExist = fs.existsSync(dir)
                if(fs.existsSync(dir)==false){
                    console.log('[mkdirSync]',dir);
                    fs.mkdirSync(dir)
                }
  
                run(dirname +'/'+ file,dir)
            }
            if (fs.statSync(dirname+'/'+file).isFile())
            return (
                file.indexOf('.') !== 0 &&
                file !== basename &&
                file.slice(-3) === '.js' &&
                igone.includes(file) == false &&
                file.indexOf('mini.js') === -1
            );
        })
        .forEach(file => {
            //console.log(file);
            // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
            // db[model.name] = model;
            //mini[file] =  fs.readFileSync(file, "utf8");
            var options = {}
            var mini = {}
            
            //fs.writeFileSync("release.min/"+file.replace('.js','.mini.js'), UglifyJS.minify(mini, options).code, "utf8");
            var openFIle = dirname+'/'+file
            console.log('[writeDirectory ]',writeDirectory +'/'+ file);
            console.log('[openFIle ]',openFIle);
            mini[file] = fs.readFileSync(openFIle, "utf8");
            fs.writeFileSync(writeDirectory +'/' +file, UglifyJS.minify(mini, options).code, "utf8");
        });

}
run('./ace/src')
//   var options = {}
//   fs.writeFileSync("app.build.mini.js", UglifyJS.minify(mini, options).code, "utf8");
