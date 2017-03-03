phantom.page.injectJs('../casperLib/bindShim.js');
phantom.page.injectJs('navigation.js');
var x = require('casper').selectXPath;
var casper = require('casper').create({
  verbose: false,
  logLevel: 'debug'
});

var shim = new BindShim();
var navigateTo = new Navigation();

shim.add();
navigateTo.loginPage();
navigateTo.userStories();
navigateTo.workProductStatus();
navigateTo.releaseMetrics();
navigateTo.tasks();
navigateTo.defects();
navigateTo.defectSuites();
navigateTo.testCases();
navigateTo.testPlan();
navigateTo.portfolioItems();
navigateTo.roadMap();
navigateTo.releasePlanning();
navigateTo.portfolioKanban();
navigateTo.portfolioTimeline();
navigateTo.reports();


casper.run();
