var PortfolioItemsPageElements = {
  'addNewButton'   : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div/div/div[1]/div/div[1]/div/div/div/span/div/div/span/div/div[1]/span/div/div[1]/span/div/div[1]/span/div/a/span/span/span[2]',
  'piTypeDropDown' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div/div/div[1]/div/div[1]/div/div/div/span/div/div/span/div/div[1]/span/div/div[2]/span/div/table/tbody/tr/td[2]/table/tbody/tr/td[1]/input',
  'addNewTextField': '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div/div/div[1]/div/div[1]/div/div/div/span/div/div/span/div/div[1]/span/div/div[1]/span/div/div[1]/span/div/div/div/div/table/tbody/tr/td[2]/input',
  'addNewAddButton': '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/div/div/div/div[1]/div/div[1]/div/div/div/span/div/div/span/div/div[1]/span/div/div[1]/span/div/div[1]/span/div/div/div/div/a[1]/span/span/span[2]',
  'dropDownSelection' : {
    'strategy'  : '//*[text()="Strategy"]',
    'theme'     : '//*[text()="Theme"]',
    'initiative': '//*[text()="Initiative"]',
    'feature'   : '//*[text()="Feature"]'
  },
  'passedPiType' : '',
  getPiSelector : function(type){
    if(typeof type == "undefined") type = "";
    var lowerType = type.toLowerCase();
    if (lowerType == 's'){
      this.passedPiType = this.dropDownSelection.strategy;
    } else if (lowerType == 't'){
        this.passedPiType = this.dropDownSelection.theme;
    } else if (lowerType == 'i'){
        this.passedPiType = this.dropDownSelection.initiative;
    } else if (lowerType == 'f'){
        this.passedPiType = this.dropDownSelection.feature;
    } else if (lowerType != ""){
        this.passedPiType = '//*[text()="'+type+'"]';
      }
      else {
        this.passedPiType = this.dropDownSelection.feature;
      };
    }
}
