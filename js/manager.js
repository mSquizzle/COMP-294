var init = 0;
var state = 0;

function handleFirstChart(){
	var chartParams = chartParams1;
	document.getElementById("chart-2").setAttribute("transform","translate(1000)");
	document.getElementById("chart-2").classList.add("not-drawn");
	
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
		//nodeGroups[0][i].classList.remove("not-drawn");
		//circles[i].setAttribute("r", 0);
		circles[i].classList.add("not-drawn")
	}	
	nextNodes = nodeGroups[1];
	previousLines = lineGroups[0];
	
	var windowHeight = window.outerHeight;
	var introText = document.getElementById("intro-text");
	var introTextHeight = introText.offsetHeight;
	var introSlide = document.getElementById("intro-slide");
	//introSlide.setAttribute("height", (windowHeight+introTextHeight)+"px");
	introText.setAttribute("style", "top:"+windowHeight+"px");
	window.addEventListener("keydown", function(e){
		var key = e.which || e.keyCode;
		var chart = document.getElementById("chart");
		if(state == 0){
			//move the intro slide
			if(e.keyCode == 37){
				init-=2;
				if(init < 0){
					init = 0;
				}
			}else if (e.keyCode == 39){
				init+=2;
				if(init > 100){
					init = 0;
					state++;
					document.getElementById("middle-grad").classList.remove("not-drawn");
					document.getElementById("top-grad").classList.add("not-drawn");
					return;
				}
			}
			var introText = document.getElementById("intro-text");
			var introSlide = document.getElementById("intro-slide");
			var windowHeight = window.outerHeight;
			var diff = windowHeight-introSlide.offsetHeight;
			var pct = init/100.0;
			var newTextTop = windowHeight - (pct) * (windowHeight+introSlide.offsetHeight);
			var newSlideTop = newTextTop - windowHeight;
			introText.setAttribute("style", "top: "+newTextTop+"px");
			introSlide.setAttribute("style", "top: "+newSlideTop+"px");
		}else if(state == 1){
			//animate the first chart
			var cover = document.getElementById("cover");
			var introSlide = document.getElementById("intro-slide");
			if(e.keyCode == 37){
				init-=5;
				if(init < 0){
					init = 100;
					state--;
					var introText = document.getElementById("intro-slide");
					introText.setAttribute("style", "transform: translate(0,"+(-init*1.5)+"%)");
					document.getElementById("middle-grad").classList.add("not-drawn");
					document.getElementById("top-grad").classList.remove("not-drawn");
					return;
				}
			}else if (e.keyCode == 39){
				init+=5;
				if(init > 100){
					init = 0;
					state++;
					for(var i = 0; i < firstChartGroup.length;i++){
						circles[i].classList.remove("not-drawn");
						circles[i].setAttribute("r",0);
					}
					cover.setAttribute("style", "fill: rgb(150,150,150,0);");
					document.getElementById("narration").innerHTML = firstChartNarration[index-1];
					return;
				}
			}
			cover.setAttribute("style", "fill: rgb(150,150,150,"+(1-init/100)+");");
		}else if(state == 2){
			//continue to draw out first chart
			if(e.keyCode == 37){
				init-=5;
				if(init < 0){
					init = 100;
					state--;
					document.getElementById("narration").innerHTML = firstChartNarration[index-1];
					return;
				}
			}else if (e.keyCode == 39){
				init+=5;
				if(init > 100){
					init = 0;
					state++;
					for(var i = 0; i < firstChartGroup.length;i++){
						nodeGroups[0][i].classList.remove("not-drawn");
					//	circles[i].classList.remove("not-drawn");
					}
					document.getElementById("narration").innerHTML = firstChartNarration[index-1];
				}
			}
			for(var i = 0; i < firstChartGroup.length;i++){
				var pct = init/100.0;
				circles[i].setAttribute("r", 5 * pct);
			}
		}else if(state == 3){
			//now begin to draw out each series
			if(e.keyCode == 37){
				init-=5;
				if(init < 0 ){
					//decrement index;
					index--;
					init = 100;
					
					if(index < 1){
						index = 1;
						init = 100;
						state--;
						for(var i = 0; i < firstChartGroup.length;i++){
							nodeGroups[0][i].classList.add("not-drawn");
						}
						document.getElementById("narration").innerHTML = firstChartNarration[index-1];
						return;
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
						circles[i].setAttribute("cx", nextX);
						circles[i].setAttribute("cy", nextY);
						circles[i].classList.add("not-drawn");
						previousLines[i].classList.add("not-drawn");
						nextNodes[i].classList.add("not-drawn");
					}
					document.getElementById("narration").innerHTML = firstChartNarration[index-1];
				}
			}else if(e.keyCode == 39){
				init+=5;
				if(init > 100){
					init = 0;
					index++;
					if(index >= chartParams.keys.length){
						index = chartParams.keys.length;
						state++;
						nextNodes = nodeGroups[index];
						previousLines = lineGroups[index-1];
						document.getElementById("narration").classList.add("not-drawn");
						for(var i = 0; i < firstChartGroup.length; i++){
							nodeGroups[index-1][i].classList.remove("not-drawn");
						}
						return;
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
					var narration = document.getElementById("narration");
					narration.innerHTML = firstChartNarration[index-1];
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
				circles[i].setAttribute("r", 5 * pct);
			}
			var narration = document.getElementById("narration");
			var newTop = calculateNewTop(narration, pct);
			narration.setAttribute("style", "top :"+newTop+"px");
	}else if(state == 4){
		if(e.keyCode == 37){
			init-=5;
			if(init < 0){
				state--;
				init = 100;
				for(var i = 0; i < firstChartGroup.length; i++){
					nodeGroups[index-1][i].classList.add("not-drawn");
					circles[i].setAttribute("r", 5);
				}
				return;
			}
		} else if(e.keyCode == 39){
			init+=5;
			if(init > 100){
				state++;
				init = 0;
				return;
			}
		}
		var pct = init/100.0;
		for(var i = 0; i < firstChartGroup.length; i++){
			circles[i].setAttribute("r", 5 * (1.0-pct));
		}
	}else if(state == 5){
			//move the first chart out
			if(e.keyCode == 37){
				init-=5;
				if(init < 0){
					state--;
					init = 100;
					document.getElementById("chart-1").setAttribute("transform","translate(0)");
					var narration = document.getElementById("narration");
					narration.innerHTML = firstChartNarration[index-1];
					var pct = init/100.0;
					var narration = document.getElementById("narration");
					var newTop = calculateNewTop(narration, pct);
					narration.setAttribute("style", "top :"+newTop+"px");
					document.getElementById("narration").classList.remove("not-drawn");
					return;
				}
			}else if(e.keyCode == 39){
				init+=5;
				if(init > 100){
					state++;
					init = 0;
					document.getElementById("chart-1").setAttribute("transform","translate(-1000)");
					document.getElementById("chart-2").classList.remove("not-drawn");
					return;
				}
			}	
			var pct = init/100.0;
			document.getElementById("chart-1").setAttribute("transform","translate("+ pct * -1000+")");
		}else if(state == 6){
			//move the second chart in
			if(e.keyCode == 37){
				init-=5;
				if(init < 0){
					state--;
					init = 100;
					document.getElementById("chart-1").setAttribute("transform","translate(-1000)");
					document.getElementById("chart-2").setAttribute("transform","translate(1000)");
					document.getElementById("chart-2").classList.add("not-drawn");
					document.getElementById("narration").classList.add("not-drawn");
					return;
				}
			}else if(e.keyCode == 39){
				init+=5;
				if(init > 100){
					state++;
					init = 0;
					document.getElementById("middle-grad").classList.add("not-drawn");
					document.getElementById("narration").innerHTML = secondChartNarration[0];
					var pct = init/100.0;
					var narration = document.getElementById("narration");
					var newTop = calculateNewTop(narration, pct);
					narration.setAttribute("style", "top :"+newTop+"px");
					narration.classList.remove("not-drawn");
					return;
				}
			}
			var pct = init/100.0;
			document.getElementById("chart-2").setAttribute("transform","translate("+((1-pct)*1000)+")");
		}else if(state == 7){
			if(e.keyCode == 37){
				init-=5;
				if(init < 0){
					state--;
					init=100;
					document.getElementById("middle-grad").classList.add("not-drawn");
					document.getElementById("narration").classList.add("not-drawn");
				}
			}else if(e.keyCode == 39){
				init+=5;
				if(init > 100){
					state++;
					init = 0;
					var narration = document.getElementById("narration");
					narration.classList.add("not-drawn");
					return;
				}
			}
			var pct = init/100.0;
			var narration = document.getElementById("narration");
			var newTop = calculateNewTop(narration, pct);
			narration.setAttribute("style", "top :"+newTop+"px");
		}else if(state == 8){
			if(e.keyCode == 37){
				init-=5;
				if(init < 0){
					state--;
					init=100;
					var narration = document.getElementById("narration");
					narration.classList.remove("not-drawn");
					document.getElementById("chart-2").setAttribute("transform","translate(0)");
					return;
				}
			}else if(e.keyCode == 39){
				init+=5;
				if(init > 100){
					init = 0;
					state++;
					var summary = document.getElementById("summary-slide");
					summary.classList.remove("not-drawn");
					var initTop = window.innerHeight;
					summary.setAttribute("style", "top: "+initTop+"px");
					return;
				}
			}
			var pct = init / 100.0;
			document.getElementById("chart-2").setAttribute("transform","translate("+(-pct * 1000)+")");
		}else if(state == 9){
			if(e.keyCode == 37){
				init-=5;
				if(init < 0){
					state--;
					init=100;
					var summary = document.getElementById("summary-slide");
					summary.classList.add("not-drawn");
					var initTop = window.innerHeight;
					summary.setAttribute("style", "top: "+initTop+"px");
					return;
				}
			}else if(e.keyCode == 39){
				init+=5;
				if(init > 100){
					init = 100;
				}
			}
			var summary = document.getElementById("summary-slide");
			var initTop = window.innerHeight;
			var pct = init/100.0;
			summary.setAttribute("style", "top: "+(initTop*(1-pct))+"px");
		}
		
	});
	
	function reinitialize(){
		console.log("INIT");
	}
	
	function calculateNewTop(narration, pct){
		var narHeight = narration.offsetHeight;
		var totalHeight = window.innerHeight;
		var targetHeight = 500 - narHeight;
		var newTop = targetHeight + (1-pct) * totalHeight;
		return newTop;
	}
	
}