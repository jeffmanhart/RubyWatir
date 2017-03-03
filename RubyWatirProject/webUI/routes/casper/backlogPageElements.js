var BacklogPageElements = {
  'addNewButton' : {
   'keyName' : 'addNewButton',
   'name' : 'Add New Button',
   'element' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[1]/table/tbody/tr/td[2]/em/button',
   'actions' : ['click'],
   'type' : 'button'
  },
  'addNewDropDown' : {
    'keyName' : 'addNewDropDown',
    'name' : 'Add New Drop Down',
    'element' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[3]/div/img',
    'actions' : ['click'],
    'type' : 'dropDownList',
    'subItems' : [
      {'defect' : '//*[text()="Defect"]'},
      {'story' : '//*[text()="Story"]'},
      {'defectSuite' : '//*[text()="Defect Suite"]'}
    ]
  },
  'addNewTextField' : {
    'keyName' : 'addNewTextField',
    'name' : 'Add New Text Field',
    'element' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[4]/input',
    'actions' : ['populate'],
    'type' : 'textField'
  },
  'addNewAddButton' : {
    'keyName' : 'addNewAddButton',
    'name' : 'Add New Create Button',
    'element' : '/html/body/div[2]/div/div[2]/div/div/div[2]/div/div/div[1]/div/div[1]/span/div/table/tbody/tr/td[5]/table/tbody/tr/td[2]/em',
    'actions' : ['click','noClick'],
    'type' : 'button'
  },

  getElementsAndActions : function(){
    var returnKeys = [];
    for(var key in BacklogPageElements){
      if(BacklogPageElements.hasOwnProperty(key)) {
        if(typeof BacklogPageElements[key] != "function"){
          returnKeys.push(BacklogPageElements[key]);
        }
      }
    }
    return returnKeys;
  }
};

module.exports = BacklogPageElements;