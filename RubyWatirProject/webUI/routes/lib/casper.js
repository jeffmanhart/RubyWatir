var fs = require('fs'),
    cp = require('child_process').exec;

function casperMethods(io, mong) {
  runCasper = function(callback){
    var child = cp('casperjs routes/casperTest.js '+'defect'+' --ssl-protocol=any');
    child.stdout.on('data', function(data){
      io.emit('consoleUpdate', '<br>'+data);
    });
    child.stderr.on('data', function(data){
      console.log(data);
    });
    child.on('close', function(code){
      io.emit('consoleUpdate', '<br> Finished with code: '+code);
      callback();
    });
  };

  this.runCasper = runCasper;

  this.getValuesAndRunCasper = function(res, count){
    mong.getValuesFromDatabase('actors', function(actors){
      var tempString = "";
      mong.getValuesFromDatabase('storyNames', function(storyNames){
        for(i=0;i<count;i++){
          tempString += actors.randomElement()+ " " +storyNames.randomElement();
          if(i!=count-1){
            tempString += "|,|";
          }
        }
        fs.writeFile("routes/stories.csv", tempString, function(err){
          if(err) return console.log(err);
          this.runCasper(function(){
            res.end();
          });
        });
      });
    });
  };
}

module.exports = casperMethods;