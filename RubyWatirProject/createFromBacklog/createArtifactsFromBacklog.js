phantom.page.injectJs('../casperLib/bindShim.js');
phantom.page.injectJs('../navigation/navigation.js');
phantom.page.injectJs('backlogPageElements.js');

var shim = new BindShim(),
    blEl = BacklogPageElements,
    navigateTo = new Navigation(),
    currentDefect = "",
    fs = require('fs'),
    someDefects = fs.read('stories.csv').split('|,|'),

    casper = require('casper').create({
      verbose: true,
      logLevel: 'debug',
      pageSettings: {
        loadImages: true,
        loadPlugins: true
      },
      viewportSize:{
        width: 1024,
        height: 1280
      }
    }),
    artifactType = casper.cli.get(0),
    x = require('casper').selectXPath;

shim.add();

navigateTo.loginPage();
navigateTo.backlog();

casper.then(function(){
  this.click(x(blEl.addNewButton));
});

casper.then(function(){
  this.click(x(blEl.addNewDropDown));
});

casper.then(function(){
  blEl.getArtifactSelector(artifactType);
});

casper.then(function(){
  this.click(x(blEl.passedArtifactType));
});

casper.eachThen(someDefects, function(defectName){
  currentDefect = defectName.data;
  this.sendKeys(x(blEl.addNewTextField), currentDefect);
  casper.then(function(){
    this.wait(2000, function(){
      this.click(x(blEl.addNewAddButton));
    });
  });
  casper.then(function(){
    this.wait(2000);
  });
});

casper.run();
