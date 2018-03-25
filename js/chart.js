const svgns = "http://www.w3.org/2000/svg";

function drawSeries(chartParams, data, id){
	var dataPoints = Object.entries(data);
	
	var parentHeight = chartParams.height;
	var parentWidth = chartParams.width;
	var chartParent = chartParams.chartParent;
	var max = chartParams.maxVal;
	var placementStep = parentWidth / (dataPoints.length-1);
	var startX = 0;
	var circleList = document.createDocumentFragment();
	var	lineList = document.createDocumentFragment();
	
	var scale = getScaleFunction(0, max, 0, parentHeight, .9);
	var startY = parentHeight - scale(dataPoints[0][1]);
	var circle = document.createElementNS(svgns, "circle");
	circle.setAttribute("fill", "red");
	circle.setAttribute("cx", startX);
	circle.setAttribute("cy", startY);
	circle.setAttribute("r", 5);
	circle.setAttribute("data-series", id);
	circle.setAttribute("class","series-"+id);
	circle.setAttribute("data-label", dataPoints[0][0]);
	circle.setAttribute("data-val", dataPoints[0][1]);
	circle.addEventListener("mouseenter", setToolTip);
	circle.addEventListener("mouseleave", clearToolTip);
	circle.addEventListener("mousemove", moveToolTip);
	circleList.append(circle);
	
	var limit = dataPoints.length;
	for (var i = 1; i < limit; i++){
		var point = dataPoints[i];
		var nextX = startX + placementStep;
		var nextY = parentHeight - scale(point[1]);
		circle = document.createElementNS(svgns, "circle");
		circle.setAttribute("fill", "red");
		circle.setAttribute("cx", startX);
		circle.setAttribute("cy", startY);
		circle.setAttribute("r", 5);		
		circle.setAttribute("data-series", id);		
		circle.setAttribute("class","series-"+id);
		circle.setAttribute("data-label", dataPoints[i][0]);
		circle.setAttribute("data-val", point[1]);
		circle.addEventListener("mouseenter", setToolTip);
		circle.addEventListener("mouseleave", clearToolTip);
		circle.addEventListener("mousemove", moveToolTip);
		circleList.append(circle);
	
		var line = document.createElementNS(svgns, "line");
		line.setAttribute("x1", startX);
		line.setAttribute("y1", startY);
		line.setAttribute("x2", nextX);
		line.setAttribute("y2", nextY);
		line.setAttribute("class","series-"+id);
		line.setAttribute("data-series", id);

		startX = nextX;
		startY = nextY;
		lineList.append(line);
	}
	var circle = document.createElementNS(svgns, "circle");
	circle.setAttribute("fill", "red");
	circle.setAttribute("cx", startX);
	circle.setAttribute("cy", startY);	
	circle.setAttribute("data-series", id);
	circle.setAttribute("class","series-"+id);
	circle.setAttribute("data-label", dataPoints[limit-1][0]);
	circle.setAttribute("data-val", dataPoints[limit-1][1]);
	circle.addEventListener("mouseenter", setToolTip);
	circle.addEventListener("mouseleave", clearToolTip);
	circle.addEventListener("mousemove", moveToolTip);
	circle.setAttribute("r", 5);
	circleList.append(circle);
	
	chartParent.appendChild(lineList);
	chartParent.appendChild(circleList);	
};

function setToolTip(event){
	event.target.setAttribute("fill", "green");
	var tip = document.getElementById("tip");
	var data = event.target.dataset;
	var series = data.series;
	var seriesTitle = chartTitles[series];
	tip.innerHTML = seriesTitle+"<br/>"+data.label +" - "+data.val;
	console.log(event.x);
	//set zIndex really high
	tip.classList.toggle("hidden");
};

function clearToolTip(event){
	event.target.setAttribute("fill","red");
	var tip = document.getElementById("tip");
	tip.innerHTML="";
	//set zIndex back to the series id
	tip.classList.toggle("hidden");
};

function moveToolTip(event){
	var tip = document.getElementById("tip");
	var offset = tip.offsetWidth;
	var offsetY = 5 + tip.offsetHeight;
	tip.style.left = (event.x-offset/2)+"px";
	tip.style.top = (event.y - offsetY)+"px";	
};

function getScaleFunction(dataMin, dataMax, windowMin, windowMax, percentage){
	return function(dataValue){
		var dataRange = dataMax - dataMin;
		var windowRange = windowMax - windowMin;
		var scaledVal = (dataValue - dataMin) / dataRange * windowRange + windowMin;
		return percentage * scaledVal;
	}
};