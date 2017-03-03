var Steps = function() {

  var testSite = 'https://trial2prod.rallydev.com',
  username = 'rallyadmin',
  password = '********'

  this.gotoLoginPage = function() {
    casper.start(testSite, function(){
      this.echo(this.getCurrentUrl());
      this.fill('form#login-form', {
        j_username: username,
        j_password: password
      }, true);
    });
  };

  this.waitForSubscriptionsPage = function() {
    casper.then(function(){
      this.waitForUrl(/subscriptions/, function(){
        this.echo('Found the subscriptions page! '+this.getCurrentUrl());
      });
    });
  };
};
  
 




