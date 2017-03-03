phantom.page.injectJs('routes/casper/bindShim.js');
phantom.page.injectJs('routes/casper/navigation.js');
phantom.page.injectJs('routes/casper/backlogPageElements.js');

var shim = new BindShim(),
	blEl = BacklogPageElements,
	navigateTo = new Navigation(),
	currentDefect = "",
	fs = require('fs'),
	someDefects = fs.read('routes/stories.csv').split('|,|'),

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

casper.run();
