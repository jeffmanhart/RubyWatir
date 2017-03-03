var BacklogPageElements = {
  'addNewButton' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[1]/table/tbody/tr/td[2]/em/button',
  'addNewDropDown' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[3]/div/img',
  'dropDownSelection': {
    'defect'      : '//*[text()="Defect"]',
    'story'       : '//*[text()="Story"]',
    'defectSuite' : '//*[text()="Defect Suite"]'
  },
  'addNewTextField' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[4]/input',
  'addNewAddButton' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[5]/table/tbody/tr/td[2]/em',
  'passedArtifactType' : '',
  getArtifactSelector : function(type){
    if(typeof type == "undefined") type = "";
    var lowerType = type.toLowerCase();
    if (lowerType == 'd'){
      this.passedArtifactType = this.dropDownSelection.defect;
    } else if (lowerType == 'ds'){
      this.passedArtifactType = this.dropDownSelection.defectSuite;
    } else {
      this.passedArtifactType = this.dropDownSelection.story;
    };
  }
};
