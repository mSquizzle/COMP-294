const svgns = "http://www.w3.org/2000/svg";

function drawSeries(chartParams, data){
	var dataPoints = Object.entries(data);
	
	var parentHeight = chartParams.height;
	var parentWidth = chartParams.width;
	var chartParent = chartParams.chartParent;
	var max = chartParams.maxVal;
	var placementStep = parentWidth / (dataPoints.length-1);
	var startX = 0;
	var circleList = document.createDocumentFragment();
	var	lineList = document.createDocumentFragment();
	
	var scale = getScaleFunction(0, max, 0, parentHeight);
	var startY = parentHeight - scale(dataPoints[0][1]);
	var circle = document.createElementNS(svgns, "circle");
	circle.setAttribute("fill", "red");
	circle.setAttribute("cx", startX);
	circle.setAttribute("cy", startY);
	circle.setAttribute("r", 5);
	circleList.append(circle);
		
	for (var i = 1; i < dataPoints.length; i++){
		var point = dataPoints[i];
		var nextX = startX + placementStep;
		var nextY = parentHeight - scale(point[1]);
		circle = document.createElementNS(svgns, "circle");
		circle.setAttribute("fill", "red");
		circle.setAttribute("cx", startX);
		circle.setAttribute("cy", startY);
		circle.setAttribute("r", 5);
		circleList.append(circle);
	
		var line = document.createElementNS(svgns, "line");
		line.setAttribute("x1", startX);
		line.setAttribute("y1", startY);
		line.setAttribute("x2", nextX);
	
		line.setAttribute("y2", nextY);

		startX = nextX;
		startY = nextY;
		lineList.append(line);
	}
	var circle = document.createElementNS(svgns, "circle");
		circle.setAttribute("fill", "red");
		circle.setAttribute("cx", startX);
		circle.setAttribute("cy", startY);
		circle.setAttribute("r", 5);
		circleList.append(circle);
	
	chartParent.appendChild(lineList);
	chartParent.appendChild(circleList);
	
};

function getScaleFunction(dataMin, dataMax, windowMin, windowMax){
	return function(dataValue){
		var dataRange = dataMax - dataMin;
		var windowRange = windowMax - windowMin;
		return (dataValue - dataMin) / dataRange * windowRange + windowMin;
	}
};