phantom.page.injectJs('../casperLib/bindShim.js');
phantom.page.injectJs('steps.js');
var x = require('casper').selectXPath;
var casper = require('casper').create({
  verbose: true,
  logLevel: 'error'
});

var shim = new BindShim();
var steps = new Steps();

shim.add();
steps.gotoLoginPage();
steps.waitForSubscriptionsPage();

casper.thenClick(x('//a[.="Rally Development"]'), function() {
    console.log("Clicked on the Sub name link"); //100
});

casper.then(function(){
	this.open('https://trial2prod.rallydev.com/#/1ud/detail/subscription/400059/workspaces').then(function(){
		this.echo("Opening workpaces page (wait 5)..."); //Going to the Workspaces page
		this.wait(5000, function(){
		});
	});
});

casper.thenClick(x('//*[@id="doWorkspaceMoveLink136079183"]'), function() {
    console.log("I hit the sub name link"); //100
});

casper.then(function() {
    this.sendKeys('input[name=text]', '31094'); //Workspace: A Place For Sales
});

casper.then(function() {
    this.clickLabel('Continue', 'button');
    this.wait(20000, function(){ //Unfortunately this one spins for quite some time before confirmation dialog popup appears
    });
});

casper.then(function() {
    this.clickLabel('Yes, Move It', 'button');
});

casper.run();
