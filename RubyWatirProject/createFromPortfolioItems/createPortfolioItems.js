phantom.page.injectJs('../casperLib/bindShim.js');
phantom.page.injectJs('../navigation/navigation.js');
phantom.page.injectJs('portfolioItemsPageElements.js');

var shim = new BindShim(),
piEl = PortfolioItemsPageElements,
navigateTo = new Navigation(),
currentPi = "",
fs = require('fs'),
somePis = fs.read('pis.csv').split('|,|'),

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

piType = casper.cli.get(0),
x = require('casper').selectXPath;

shim.add();

navigateTo.loginPage();
navigateTo.portfolioItems();

casper.then(function(){
  this.click(x(piEl.addNewButton));
});

casper.then(function(){
  this.click(x(piEl.piTypeDropDown));
});

casper.then(function(){
  piEl.getPiSelector(piType);
});

casper.then(function(){
  this.click(x(piEl.passedPiType));
});

casper.eachThen(somePis, function(piName){
  currentPi = piName.data;
  this.sendKeys(x(piEl.addNewTextField), currentPi);
  casper.then(function(){
    this.wait(2000, function(){
      this.click(x(piEl.addNewAddButton));
    });
  });
  casper.then(function(){
    this.wait(2000);
  })
});

casper.run();
