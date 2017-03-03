var Navigation = function() {

  function browseTo(menuName, topMenu, subMenu) {
    casper.then(function(){
      this.wait(2000, function(){
        if(this.exists(x(topMenu))){
          this.click(x(topMenu));
        } else {
          var newTopMenu = topMenu.replace('div[2]', 'div[3]');
          this.click(x(newTopMenu));
        }
      });
    });
    casper.then(function(){
      this.waitForSelector(x(subMenu), function(){
        this.click(x(subMenu));
      });
    });
    casper.then(function(){
      this.wait(2000, function(){
        this.echo('Browsed to '+menuName);
        casper.capture(menuName+'.png');
      });
    });
  };

  this.loginPage = function(server, user, pass) {
    casper.start(server, function(){
      this.waitForSelector('form#login-form', function(){
        this.fill('form#login-form', {
          j_username: user,
          j_password: pass
        }, true);
        this.wait(2000, function(){
          console.log("Logged in.");
        });
      });
    });
  };

  this.dashboard = function() {
    var dashboardTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[1]/a',
        dashboardSubMenu = '//*[text()="Dashboard"]';

    browseTo('Dashboard', dashboardTopMenu, dashboardSubMenu);
  };

  this.backlog = function(){
    var backlogTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[2]/a',
        backlogSubMenu = '//*[text()="Backlog"]';
    browseTo('Backlog', backlogTopMenu, backlogSubMenu);
  };

  this.userStories = function(){
    var userStoriesTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[2]/a',
        userStoriesSubMenu = '//*[text()="User Stories"]';
    browseTo("User Stories", userStoriesTopMenu, userStoriesSubMenu);
  };

  this.releases = function(){
    var releasesTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[2]/a',
        releasesSubMenu = '//*[text()="Releases"]';
    browseTo("Releases", releasesTopMenu, releasesSubMenu);
  };

  this.iterations = function(){
    var iterationsTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[2]/a',
        iterationsSubMenu = '//*[text()="Iterations"]';
    browseTo("Iterations", iterationsTopMenu, iterationsSubMenu);
  };

  this.mileStones = function(){
    var mileStonesTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[2]/a',
        mileStonesSubMenu = '//*[text()="Milestones"]';
    browseTo("Milestones", mileStonesTopMenu, mileStonesSubMenu);
  };

  this.plan = function(){
    var planTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[2]/a',
        planSubMenu = '//*[contains(@class,"rui-navigation-menu-item")][normalize-space(text())="Plan"]';
    browseTo("Plan-Plan", planTopMenu, planSubMenu);
  };

  this.workProductStatus = function(){
    var workProductStatusTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[3]/a',
        workProductStatusSubMenu = '//*[text()="Work Product Status"]';
    browseTo("Work Product Status", workProductStatusTopMenu, workProductStatusSubMenu);

  };

  this.releaseMetrics = function(){
    var releaseMetricsTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[3]/a',
        releaseMetricsSubMenu = '//*[text()="Release Metrics"]';
    browseTo("Release Metrics", releaseMetricsTopMenu, releaseMetricsSubMenu);
  };

  this.tasks = function(){
    var tasksTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[3]/a',
        tasksSubMenu = '//*[text()="Tasks"]';
    browseTo("Tasks", tasksTopMenu, tasksSubMenu);
  };

  this.defects = function(){
    var defectsTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[4]/a',
        defectsSubMenu = '//*[text()="Defects"]';
    browseTo("Defects", defectsTopMenu, defectsSubMenu);
  };

  this.defectSuites = function(){
    var defectSuitesTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[4]/a',
        defectSuitesSubMenu = '//*[text()="Defect Suites"]';
    browseTo("Defect Suites", defectSuitesTopMenu, defectSuitesSubMenu);
  };

  this.testCases = function(){
    var testCasesTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[4]/a',
        testCasesSubMenu = '//*[text()="Test Cases"]';
    browseTo("Test Cases", testCasesTopMenu, testCasesSubMenu);
  };

  this.testPlan = function(){
    var testPlanTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[4]/a',
        testPlanSubMenu = '//*[text()="Test Plan"]';
    browseTo("Test Plan", testPlanTopMenu, testPlanSubMenu);
  };

  this.portfolioItems = function(){
    var portfolioItemsTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[5]/a',
        portfolioItemsSubMenu = '//*[text()="Portfolio Items"]';
    browseTo("Portfolio Items", portfolioItemsTopMenu, portfolioItemsSubMenu);
  };

  this.roadMap = function(){
    var roadMapTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[5]/a',
        roadMapSubMenu = '//*[text()="Roadmap"]';
    browseTo("Road Map", roadMapTopMenu, roadMapSubMenu);
  };

  this.releasePlanning = function(){
    var releasePlanningTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[5]/a',
        releasePlanningSubMenu = '//*[text()="Release Planning"]';
    browseTo("Release Planning", releasePlanningTopMenu, releasePlanningSubMenu);
  };

  this.portfolioKanban = function(){
    var portfolioKanbanTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[5]/a',
        portfolioKanbanSubMenu ='//*[text()="Portfolio Kanban"]';
    browseTo("Portfolio Kanban", portfolioKanbanTopMenu, portfolioKanbanSubMenu);
  };

  this.portfolioTimeline = function(){
    var portfolioTimelineTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[5]/a',
        portfolioTimelineSubMenu = '//*[text()="Portfolio Timeline"]';
    browseTo("Portfolio Timeline", portfolioTimelineTopMenu, portfolioTimelineSubMenu);
  };

  this.reports = function(){
    var reportsTopMenu = '/html/body/div[2]/div/div[1]/div/div[1]/ul/li[6]/a',
        reportsSubMenu = '//*[text()="Reports"]';
    browseTo("Reports", reportsTopMenu, reportsSubMenu);
  };
};
