
var init = 0;


function moveSecondChart(){
	window.addEventListener("keydown", function(e){
		var key = e.which || e.keyCode;
		var chart = document.getElementById("chart");
		if(e.keyCode == 37){
			init-=5;
		}else if(e.keyCode == 39){
			init+=5;
		}	
		chart.setAttribute("transform","translate("+init+")");
	});
}

function handleFirstChart(){
	var index = 0;
	window.addEventListener("keydown", function(e){
		var key = e.which || e.keyCode;
		console.log(key);
		var chart = document.getElementById("chart");
		if(e.keyCode == 37){
			init-=5;
			if(init < 0 ){
				init = 0;
				//decrement index;
			}
		}else if(e.keyCode == 39){
			init+=5;
			if(init > 1){
				init = 0;
				index++;
				if(index > 12){
					index = 12;
				}
			}
		}
	});
}