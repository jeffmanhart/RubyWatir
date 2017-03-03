var socket = io(),
  stepCount = 0,
  elementsAndActions = {},
  configObject = {
  "actions" : [
    {
      "type" : "login",
      "serverName" : "",
      "userName" : "",
      "password" : "",
    }
  ]
};
var setCollectionValue = function(name){
  $("#collectionTextBox").val(name);
};

var loadFieldList = function(type){
  $("#fieldSelection").removeClass("disabled");
  $.ajax({
    type: "GET",
    url: "/getPageElements",
    data: {"type" : type},
    success: function(values){
      var listItems = "";
      elementsAndActions = values;
      for(i=0;i<elementsAndActions.length;i++){
        listItems += "<li class=\"ddl-hover casper-action\" onclick=\"populateActionsDropDown('"+i+"');\">"+elementsAndActions[i].name+"</li>";
      }
      $("#casperField").html(listItems);
      $("#action").removeClass("disabled");
    },
    error: function(err){
      $(".results").append("Failed to get values.");
    }
  });
};

var showNavigateTo = function(){
  $("#pageSelection").removeClass("disabled");
};

var populateActionsDropDown = function(keyIndex){
  var actionsList = "";
  var objActionsList = elementsAndActions[keyIndex].actions;
  for(i=0;i<objActionsList.length;i++){
    actionsList += "<li class=\"ddl-hover\">"+objActionsList[i]+"</li>";
  }
  $("#actionList").html(actionsList);
};

$(document).ready(function(){
  $(".tabs").tab();
  var form = $(".create-backlog-stories").closest("form");
  var dbForm = $(".add-to-database");
  socket.on('consoleUpdate', function(data){
    $('.results').append(data);
  });
  socket.on('dbUpdate', function(data){
    $('.db-results').append(data);
  });

  $("#newStep").on("click", function(e){
    e.preventDefault();
    stepCount++;
  });

  $.ajax({
    type: "GET",
    url: "/getDbCollections",
    success: function(response){
      var collectionsArray = response;
      for(i=0;i<collectionsArray.length;i++){ //Turn this into an event handler.
        $("#collectionDropdown").append('<li onclick=setCollectionValue("'+collectionsArray[i]+'")>'+collectionsArray[i]+'</li>');
      }
    },
    error: function(){
      console.log('There was an error.');
    }
  });

  $(".backlog-stories").closest("button").on("click", function(){
    console.log('backlog clicked.');
    $(form).unbind('submit');
    $(form).submit(function(e){
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/createStoriesFromBacklog",
        data: form.serialize(),
        success: function(response){
          $(".results").append(response);
        }
      });
    });
  });

  $("#grab-data").on("click", function(){
    $(".db-results").html("");
      $.ajax({
        type: "POST",
        url: "/giveMeDatabaseValues",
        data: "dbForm.serialize()",
        success: function(response){
          $(".db-results").append(response);
        }
      });
  });

  $("#create-data").on("click", function(){
    $(".db-results").html("");
    $.ajax({
      type: "POST",
      url: "/createDatabaseValue",
      data: dbForm.serialize(),
      success: function(response){
        $(".db-results").append(response);
      }
    });
  });

  $("#createTheObject").on("click", function(e){
    e.preventDefault();
    console.log("Attempting to create an object.");
    $.ajax({
      type: "POST",
      url: "/createActionObject",
      data: configObject,
      success: function(response){
        $(".results").append(response);
      },
      error: function(response){
        $(".results").append(response);
      }
    });
  });

  $("#runTheCasper").on("click", function(e){
    e.preventDefault();
    console.log("Running the casper.");
    $.ajax({
      type: "POST",
      url: "/runTheCasper",
      success: function(response){
        $(".results").append(response);
      },
      error: function(response){
        $(".results").append(response);
      }
    });
  });

  $(".casperConfig").focusout(function(){
    var field = $(this).attr("id");
    configObject.actions[0][field] = $(this).val();
  });

  $("#mongo a").click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });

  $("#casper a").click(function(e){
    e.preventDefault();
    $(this).tab('show');
  });
});