const svgns = "http://www.w3.org/2000/svg";

function drawChart(chartParams, dataSet){
	var parentHeight = chartParams.height;
	var parentWidth = chartParams.width;
	var chartParent = chartParams.chartParent;
	var dataAreaWidth = .9 * parentWidth;
	var axes =  document.createDocumentFragment();
	var leftAxis = .05 * parentWidth;
	var rightAxis = parentWidth - leftAxis;
	
	var bottom = parentHeight * .9 ;
	var top = parentHeight - bottom;

	var lineList = document.createDocumentFragment();
	var line = document.createElementNS(svgns, "line");
	line.setAttribute("x1", leftAxis);
	line.setAttribute("y1", top);
	line.setAttribute("x2", leftAxis);
	line.setAttribute("y2", bottom);
	line.setAttribute("class", "axis");
	line.setAttribute("stroke", "black");
	lineList.appendChild(line);
	line = document.createElementNS(svgns, "line");
	line.setAttribute("x1", rightAxis);
	line.setAttribute("y1", top);
	line.setAttribute("x2", rightAxis);
	line.setAttribute("y2", bottom);
	line.setAttribute("class", "axis");
	line.setAttribute("stroke", "black");
	lineList.appendChild(line);
	line = document.createElementNS(svgns, "line");
	line.setAttribute("x1", leftAxis);
	line.setAttribute("y1", bottom);
	line.setAttribute("x2", rightAxis);
	line.setAttribute("y2", bottom);
	line.setAttribute("class", "axis");
	line.setAttribute("stroke", "black");
	lineList.appendChild(line);
	var start = bottom;
	var labelStepSize = chartParams.labelStepSize ? chartParams.labelStepSize : 5;
	var scale = getScaleFunction(0, 25, bottom, top, 1);	
	for(var i = 0; i <= chartParams.maxVal; i+= labelStepSize){
		start = scale(i);
		line = document.createElementNS(svgns, "line");
		line.setAttribute("x1", leftAxis);
		line.setAttribute("y1", start);
		line.setAttribute("x2", leftAxis-15);
		line.setAttribute("y2", start);
		line.setAttribute("class", "axis");
		line.setAttribute("stroke", "black");
		var text =  document.createElementNS(svgns, "text");
		text.setAttribute("x", 0);
		text.setAttribute("y", start);
		text.setAttribute("class", "axis");
		text.setAttribute("stroke", "black");
		text.innerHTML = i+"%";		
		lineList.appendChild(line);
		lineList.appendChild(text);
	}
	chartParent.appendChild(lineList);
		
	dataSet.forEach(function(element, i){
		drawSeries(chartParams, bottom, top, element, i);
	});
}

function drawSeries(chartParams, bottom, top, data, id){
	var dataPoints = Object.entries(data);
	var max = chartParams.maxVal;
	
	var parentHeight = chartParams.height;
	var parentWidth = chartParams.width;
	var chartParent = chartParams.chartParent;
	var placementStep = .9 * parentWidth / (dataPoints.length);
	var startX = .05 * parentWidth;
	var circleList = document.createDocumentFragment();
	var	lineList = document.createDocumentFragment();
	
	var scale = getScaleFunction(0, max, bottom, top, 1);
	var startY = scale(dataPoints[0][1]);
	var circle = document.createElementNS(svgns, "circle");
	var formatter = getFormatter(chartParams);
	circle.setAttribute("cx", startX);
	circle.setAttribute("cy", startY);
	circle.setAttribute("r", 5);
	circle.setAttribute("data-series", id);
	circle.setAttribute("class","series-"+id);
	circle.setAttribute("data-label", dataPoints[0][0]);
	circle.setAttribute("data-val", formatter(dataPoints[0][1]));
	circle.addEventListener("mouseenter", setToolTip);
	circle.addEventListener("mouseleave", clearToolTip);
	circle.addEventListener("mousemove", moveToolTip);
	circleList.append(circle);
	
	var limit = dataPoints.length;
	for (var i = 0; i < limit; i++){
		var point = dataPoints[i];
		var nextX = startX + placementStep;
		var nextY = scale(point[1]);
		circle = document.createElementNS(svgns, "circle");
		circle.setAttribute("cx", startX);
		circle.setAttribute("cy", startY);
		circle.setAttribute("r", 5);		
		circle.setAttribute("data-series", id);		
		circle.setAttribute("class","series-"+id);
		circle.setAttribute("data-label", dataPoints[i][0]);
		circle.setAttribute("data-val", formatter(point[1]));
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
	circle.setAttribute("cx", startX);
	circle.setAttribute("cy", startY);	
	circle.setAttribute("data-series", id);
	circle.setAttribute("class","series-"+id);
	circle.setAttribute("data-label", dataPoints[limit-1][0]);
	circle.setAttribute("data-val", formatter(dataPoints[limit-1][1]));
	circle.addEventListener("mouseenter", setToolTip);
	circle.addEventListener("mouseleave", clearToolTip);
	circle.addEventListener("mousemove", moveToolTip);
	circle.setAttribute("r", 5);
	circleList.append(circle);
	
	chartParent.appendChild(lineList);
	chartParent.appendChild(circleList);	
};

function setToolTip(event){
	var tip = document.getElementById("tip");
	var data = event.target.dataset;
	var series = data.series;
	var seriesTitle = chartTitles[series];
	tip.innerHTML = seriesTitle+"<br/>"+data.label +" - "+data.val;
	console.log(event.x);
	//set zIndex really high
	tip.classList.toggle("hidden");
	setStar(event.target);
};

function getFormatter(chartConfig){
	if(chartConfig.format === "percentage"){
		return function(value){
			return value + "%";
		};
	}
	return function(value){ return value};
}

function setStar(target){
	//todo - implement
}

function clearToolTip(event){
	var tip = document.getElementById("tip");
	tip.innerHTML="";
	//set zIndex back to the series id
	tip.classList.toggle("hidden");
	clearStar(event.target);
};

function clearStar(target){
	//todo - implement
}

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