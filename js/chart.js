const svgns = "http://www.w3.org/2000/svg";

function drawChart(chartParams, dataSet){
	var parentHeight = chartParams.height;
	var parentWidth = chartParams.width;
	var chartParent = chartParams.chartParent;
	chartParent.setAttribute("data-origheight", parentHeight);
	chartParent.setAttribute("data-origwidth", parentWidth);
	var dataAreaWidth = .9 * parentWidth;
	if(chartParams.yAxisLabel){
		dataAreaWidth = .8 * parentWidth;
	}
	var axes =  document.createDocumentFragment();
	var leftAxis = .05 * parentWidth;
	if(chartParams.yAxisLabel){
		leftAxis = .1 * parentWidth;
	}
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
	var formatter = getFormatter(chartParams.format);
	if(chartParams.axisFormat){
		formatter = getFormatter(chartParams.axisFormat);
	}
	var scale = getScaleFunction(0, chartParams.maxVal, bottom, top, 1);
	var leftAlign = chartParams.yAxisLabel ? (leftAxis - 15)/2 : 0;
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
		text.setAttribute("x", leftAlign);
		text.setAttribute("y", start);
		text.setAttribute("class", "axis");
		text.setAttribute("stroke", "black");
		text.innerHTML = formatter(i);	
		lineList.appendChild(line);
		lineList.appendChild(text);
	}
	if(chartParams.showMaxVal){
		start = scale(chartParams.maxVal);
		line = document.createElementNS(svgns, "line");
		line.setAttribute("x1", leftAxis);
		line.setAttribute("y1", start);
		line.setAttribute("x2", leftAxis-15);
		line.setAttribute("y2", start);
		line.setAttribute("class", "axis");
		line.setAttribute("stroke", "black");
		var text =  document.createElementNS(svgns, "text");
		text.setAttribute("x", leftAlign);
		text.setAttribute("y", start);
		text.setAttribute("class", "axis");
		text.setAttribute("stroke", "black");
		text.innerHTML = formatter(chartParams.maxVal);	
		lineList.appendChild(line);
		lineList.appendChild(text);
	}
	line = document.createElementNS(svgns, "line");
	line.setAttribute("x1", leftAxis);
	line.setAttribute("y1", parentHeight);
	line.setAttribute("x2", rightAxis);
	line.setAttribute("y2", parentHeight);
	line.setAttribute("class", "axis");
	line.setAttribute("stroke", "black");
	lineList.appendChild(line);
	
	var stepSize = dataAreaWidth / (chartParams.keys.length-1);
	var middle = parentHeight - (parentHeight - bottom) / 2.0;
	for(var i = 0; i < chartParams.keys.length; i++){
		var text = document.createElementNS(svgns, "text");
		text.innerHTML = chartParams.keys[i];
		text.setAttribute("x", i * stepSize + leftAxis);
		text.setAttribute("y", middle);
		text.setAttribute("class", "axis key");
		lineList.appendChild(text);
	}
	
	var titleText = document.createElementNS(svgns, "text");
	var title = chartParams.title;
	if(chartParams.subtitle){
		title = "<tspan>"+title
		title += ":</tspan><tspan>" + chartParams.subtitle+"</tspan>";
	}
	titleText.innerHTML = title;
	titleText.setAttribute("x", parentWidth/2.0);
	titleText.setAttribute("y", top);
	titleText.setAttribute("class", "axis key title");	
	lineList.appendChild(titleText);
	
	var yAxisText = document.createElementNS(svgns, "text");
	if(chartParams.yAxisLabel){
		yAxisText.innerHTML = chartParams.yAxisLabel;
		yAxisText.setAttribute("x", 0);
		yAxisText.setAttribute("y", 0);
		yAxisText.setAttribute("class", "axis key title");	
		yAxisText.setAttribute("transform", "translate("+(leftAlign/2.0)+", "+(top+(bottom-top)/2.0)+") rotate(-90) ");
		lineList.appendChild(yAxisText);		
	}
	
	chartParent.appendChild(lineList);
		
	dataSet.forEach(function(element, i){
		drawSeries(chartParams, bottom, top, element, i);
	});
	
	window.addEventListener("resize", function(event){
		var windowWidth = event.target.innerWidth;
		var windowHeight = event.target.innerHeight;
		var origWidth = chartParent.dataset.origwidth;
		var origHeight = chartParent.dataset.origheight;
		if(origWidth > windowWidth || origHeight > windowHeight){
			var sample = newWidth / chartParent.dataset.origwidth;
			var other = newHeight / chartParent.dataset.origheight;
			var ratio = newWidth > newHeight ? sample : other;
			chartParent.setAttribute("height", ratio * chartParent.dataset.origheight);
			chartParent.setAttribute("width", ratio * chartParent.dataset.origwidth);
			chartParent.setAttribute("transform", "scale("+ratio+")");
		}else{
			chartParent.setAttribute("height", origHeight);
			chartParent.setAttribute("width",origWidth);
			chartParent.setAttribute("transform", "");
		}
	});
	
	if(chartParams.drawKeys){
		var keys = drawKeys(parentWidth, parentHeight);
		chartParent.appendChild(keys);
	}
}


function drawKeys(parentWidth, parentHeight){
	var keyX = .75 * parentWidth + 10;
	var keyY = 50;
	var keys = document.createDocumentFragment();
	var uninsured = drawKey(keyX, keyY, "0");
	var under65 = drawKey(keyX + 15, keyY+20, "1");
	var adults = drawKey(keyX + 90, keyY+20, "2");
	var children = drawKey(keyX + 150, keyY+20, "3");
	var skippedCare = drawKey(keyX, keyY + 50, "4");
	var unemployed = drawKey(keyX, keyY + 75, "5");
	keys.append(uninsured);
	keys.append(under65);
	keys.append(adults);
	keys.append(children);
	keys.append(skippedCare);
	keys.append(unemployed);
	return keys;
}

function drawKey(keyX, keyY, series){
	var key = document.createElementNS(svgns, "svg");
	var square = document.createElementNS(svgns, "rect");
	var label = document.createElementNS(svgns, "text");
	var cross = document.createElementNS(svgns, "path");
	
	cross.setAttribute("d", "M 0,0 L 10,10 M 10,0 L 0,10" )
	cross.setAttribute("x", 15);
	cross.setAttribute("y", 10);
	cross.setAttribute("class", "cross");
	label.setAttribute("x", 15);
	label.setAttribute("y", 10);
	label.setAttribute("class", "key");
	label.innerHTML = keyLabels[series];
	square.setAttribute("width", 10);
	square.setAttribute("height", 10);	
	square.setAttribute("class", "hidesib series-"+series);
	square.setAttribute("data-series", series);
	square.addEventListener("mouseenter", setKeyToolTip);
	square.addEventListener("mouseleave", clearKey);
	square.addEventListener("click", handleKeyClick);
	
	key.setAttribute("x", keyX);
	key.setAttribute("y", keyY);
	key.appendChild(square);
	key.appendChild(cross);
	key.appendChild(label);
	return key;
}


function drawSeries(chartParams, bottom, top, data, id){
	var dataPoints = Object.entries(data);
	var max = chartParams.maxVal;
	
	var parentHeight = chartParams.height;
	var parentWidth = chartParams.width;
	var chartParent = chartParams.chartParent;
	var placementStep = .9 * parentWidth / (dataPoints.length-1);
	if(chartParams.yAxisLabel){
		placementStep = .8 * parentWidth / (dataPoints.length-1);
	}
	var startX = .05 * parentWidth;
	if(chartParams.yAxisLabel){
		startX = .1 * parentWidth;
	}
	var circleList = document.createDocumentFragment();
	var	lineList = document.createDocumentFragment();
	
	var scale = getScaleFunction(0, max, bottom, top, 1);
	var startY = scale(dataPoints[0][1]);
	var circle = document.createElementNS(svgns, "circle");
	var formatter = getFormatter(chartParams.format);
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
	for (var i = 1; i < limit; i++){
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

function handleKeyClick(event){
	var key = event.target;
	var series = key.dataset.series;
	var chartParent = document.getElementById("chart");
	var children = chartParent.children;
	for(var i = 0; i < children.length; i++){
		var tester = children[i];
		if(tester.classList.contains("series-"+series) && tester.id !== "star"){
			tester.classList.toggle("hidden");
		}
	}
	key.classList.toggle("hidesib");
}

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

function setKeyToolTip(event){
	var tip = document.getElementById("key-tip");
	var data = event.target.dataset;
	var series = data.series;
	tip.innerHTML = keyToolTips[series];
	console.log(event.x);
	//set zIndex really high
	tip.classList.toggle("hidden");
}

function getFormatter(format){
	console.log(format);
	if(format === "percentage"){
		return function(value){
			return value + "%";
		};
	}else if (format === "million"){
		return function(value){
			if(value){
				if(value < 1000){
					return value;
				}else{
					if(value < 1000000){
						return value / 1000 + "k"
					}else{
						return value / 1000000 + "m"
					}
				}
			}
			return "";
		}
	}else if (format == "number"){
		return function(value){
			return Number(value).toLocaleString();
		}
	}
	return function(value){ return value};
}

function clearToolTip(event){
	var tip = document.getElementById("tip");
	tip.innerHTML="";
	//set zIndex back to the series id
	tip.classList.toggle("hidden");
	clearStar(event.target);
};

function clearKey(event){
	var tip = document.getElementById("key-tip");
	tip.innterHTML="";
	tip.classList.toggle("hidden");
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