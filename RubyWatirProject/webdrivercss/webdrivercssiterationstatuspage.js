//First attempt to write some css comparison tests using webdriverio & webdrivercss
//Iteration Status Page example
var assert = require('assert');
// init WebdriverIO
var client = require('webdriverio').remote(
    {desiredCapabilities:{
        browserName: 'chrome'}})
// init WebdriverCSS
require('webdrivercss').init(client);
client
    .init()
    //login
    .url('https://test9cluster.rallydev.com')
    .setValue('#j_username', 'test_sub@rallydev.com')
    .setValue('#j_password', 'Password')
    .click('#login-button')
    .waitFor('.btid-nav-tab-track', 4000)
    //Nav to the Iteration Status Page
    .click('.btid-nav-tab-track')
    .waitFor('*=Iteration Status', 2000)
    .click('*=Iteration Status')
    .waitFor('*=US19', 4000)
    .pause(3000)
    //Stats banner open - what does it look like
    .webdrivercss('IterationStatusPage1',[
        {
            name: 'StatsBannerOpen',
            elem: '.stats-banner'
        }
    ], function(err, res) {
        try {
        assert.ifError(err);
        assert.ok(res.StatsBannerOpen[0].isWithinMisMatchTolerance);
        }
        catch(error) {
            console.log('statsbanneropenfailed')
        }
    })
    .waitFor('.collapse-expand', 5000)
    //Collapse the stats bar - closed
    .click('.collapse-expand')
    .waitFor('.stats-banner-closed', 5000)
    //Stats banner closed - what does it look like?
    .webdrivercss('IterationStatusPage2',[
        {
            name: 'StatsBannerClosed',
            elem: '.stats-banner-closed'
        }
    ], function(err, res) {
        try {
        assert.ifError(err);
        assert.ok(res.StatsBannerClosed[0].isWithinMisMatchTolerance);
       }
       catch(error) {
        console.log('statsbannerclosedfail')
       }
    })
    .end();




    