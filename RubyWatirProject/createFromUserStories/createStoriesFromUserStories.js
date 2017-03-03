phantom.page.injectJs('../casperLib/bindShim.js');
phantom.page.injectJs('../navigation/navigation.js');
phantom.page.injectJs('userStoriesPageElements.js');
phantom.page.injectJs('userStoryEDPElements.js');

var shim = new BindShim(),
usEl = UserStoriesPageElements,
edpEl = UserStoryEDPElements,
navigateTo = new Navigation(),
currentUserStory = "",
fs = require('fs'),
// someUserStory = fs.read('stories.csv').split('|,|'),

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
x = require('casper').selectXPath;

shim.add();

navigateTo.loginPage();
navigateTo.userStories();

casper.then(function(){
  this.mouseEvent('mouseover', x(usEl.actionsDropDown.dropDown));
});

casper.then(function(){
  this.click(x(usEl.actionsDropDown.newUserStory));
});

casper.then(function(){
  this.waitForSelector(x(edpEl.nameTextField), function(){
    this.sendKeys(x(edpEl.nameTextField), 'testUserStory');
  });
});

casper.then(function(){
  this.click(x(edpEl.createButton));
});

casper.then(function(){
  this.wait(2000);
});

casper.run();
