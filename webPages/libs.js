var rest = {};
rest.get = {};
rest.post = {};
rest.put = {};
rest.delete = {};

function template(data, html){
	var res = html.match(/\{\{([^}]+)\}\}/g);
	for(x in res)
	{
		var occr = res[x].replace("{{","").replace("}}","");
		var res[x] = occr.replace(deepFind(data, occr));
		console.log(res);
	}
}

$(function(){
	console.log("Libs loaded...");
	//$.Get wrapper 
	var server = "localhost:3000";

	function get(path, cb)
	{
		$.get("http://"+server+"/admin/v1"+path,function(data){
			cb(data);
		});
	}

	rest.get.allChefs = function (){
		get("/chef", function(data){
			console.log("Returning Chefs")
			console.log(data);
			$("#chefContainer").html("");
			for(x in data)
			{
				console.log(data[x]);
				$("#chefContainer").append("<div class='well'><h4><button class='btn btn-default glyphicon glyphicon-pencil'/>   "+data[x].shopNameEN + "--" + data[x].shopNameAR +"</h4></div>");

			}
		});
	}

})

//UTILS
function deepFind(obj, path) {
  var paths = path.split('.')
    , current = obj
    , i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}
