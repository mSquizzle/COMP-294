
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
	//todo - insert extra circle and draw line into chart
	//move the circle and the line based off of the current config
	//of the chart
	
	var index = 1;
	var nextNodes = [];
	var nodeGroups = [];
	var lineGroups = [];
	var previousLines = [];
	var lines = [];
	var circles = [];
	for(var i = 0; i < chartParams.keys.length;i++){
		var nodeList = [];
		var lineList = [];
		for(var j = 0; j < firstChartGroup.length; j++){		
			var circleId = "series-"+j+"-circle-"+(i);
			var lineId = "series-"+j+"-line-"+(i);
			nodeList.push(document.getElementById(circleId));	
			lineList.push(document.getElementById(lineId));
		}
		nodeGroups.push(nodeList);
		lineGroups.push(lineList);
	}
	for(var i = 0; i < firstChartGroup.length; i++){
		lines.push(document.getElementById("series-"+i+"-line"));
		circles.push(document.getElementById("series-"+i+"-circle"));
	}
	for(var i = 0; i < firstChartGroup.length;i++){
		nodeGroups[0][i].classList.remove("not-drawn");
	}	
	nextNodes = nodeGroups[1];
	previousLines = lineGroups[0];
	window.addEventListener("keydown", function(e){
		var key = e.which || e.keyCode;
		var chart = document.getElementById("chart");
		if(e.keyCode == 37){
			init-=5;
			if(init < 0 ){
				//decrement index;
				index--;
				init = 100;
				if(index < 1){
					index = 1;
					init = 0;
				}				
				nextNodes = nodeGroups[index];
				previousLines = lineGroups[index-1];
				for(var i = 0; i < firstChartGroup.length; i++){
					var nextX = previousLines[i].x1.baseVal.value;
					var nextY = previousLines[i].y1.baseVal.value;
					lines[i].setAttribute("x1", nextX);
					lines[i].setAttribute("y1", nextY);
					//var nextX = nodeGroups[index-1][i].cx.baseVal.value;
					//var nextY = nodeGroups[index-1][i].cy.baseVal.value;
					console.log(circles[i]);
					circles[i].setAttribute("cx", nextX);
					circles[i].setAttribute("cy", nextY);
					circles[i].classList.add("not-drawn");
					previousLines[i].classList.add("not-drawn");
					nextNodes[i].classList.add("not-drawn");
				}
			}
		}else if(e.keyCode == 39){
			init+=5;
			if(init > 100){
				init = 0;
				index++;
				if(index >= chartParams.keys.length){
					index = chartParams.keys.length-1;
					init = 100;
				}
				for(var i = 0; i < firstChartGroup.length; i++){
					var nextX = nextNodes[i].cx.baseVal.value;
					var nextY = nextNodes[i].cy.baseVal.value;
					lines[i].setAttribute("x1", nextX);
					lines[i].setAttribute("y1", nextY);
					
					nextNodes[i].classList.remove("not-drawn");
					
				}
				for(var i = 0; i < previousLines.length; i++){
					//lines[i].classList.remove("not-drawn");
					previousLines[i].classList.remove("not-drawn");
				}
				nextNodes = nodeGroups[index];
				previousLines = lineGroups[index-1];
			}
		}
		for(var i = 0; i < firstChartGroup.length; i++){
			var startX = lines[i].x1.baseVal.value;
			var startY = lines[i].y1.baseVal.value;
			var nextX = nextNodes[i].cx.baseVal.value;
			var nextY = nextNodes[i].cy.baseVal.value;
			var diffX = nextX - startX;
			var diffY = nextY - startY;
			var pct = init/100.0;
			lines[i].setAttribute("x2", startX + pct * diffX);
			lines[i].setAttribute("y2", startY + pct * diffY);
			if(init > 80){
				circles[i].classList.remove("not-drawn");
			}
			circles[i].setAttribute("cx", startX + pct * diffX);
			circles[i].setAttribute("cy", startY + pct * diffY);
			//circles[i].setAttribute("cx", nextX);
			//circles[i].setAttribute("cy", nextY);			
			circles[i].setAttribute("r", 5 * pct);
		}
	});
	
}