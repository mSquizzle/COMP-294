function buildStar(parentId, id, numPoints, r1){
	var starParent = document.getElementById(parentId);
	let svg = document.createElementNS(svgns, "svg");
	let height = r1 * 2.25;
	let width = r1 * 2.25;
	svg.setAttribute("height", height);
	svg.setAttribute("width", width);
	svg.setAttribute("id", id);
	svg.setAttribute("data-r", r1);
	svg.setAttribute("data-rotate", 0);
	let polygon = document.createElementNS(svgns, "polygon");
	var points = "";
	var two_pi = Math.PI * 2.0;
	var angle = two_pi / numPoints;
	var halfAngle = angle / 2.0;
	for(var a = 0; a < two_pi; a+= angle){
		var innerX = Math.cos(a) * r1/2.0;
		var innerY = Math.sin(a) * r1/2.0;
		var outerX = Math.cos(a+halfAngle) * r1;
		var outerY = Math.sin(a+halfAngle) * r1;
		points += innerX + "," + innerY +" "+outerX+","+outerY+" ";
	}
	polygon.setAttribute("points", points);
	polygon.setAttribute("fill", "white");
	polygon.setAttribute("transform", "translate("+r1+","+r1+") rotate(90)");
	polygon.dataset.rotate = 0;
	svg.appendChild(polygon);
	svg.setAttribute("class", "hidden series-0");
	svg.setAttribute("data-prev", "0");
	starParent.insertBefore(svg,starParent.lastElementChild );	
}


function rotateStar(star){
	let rotate = parseInt(star.dataset.rotate);
	var x = setInterval(function(){
		rotate = rotate + 1;
		star.dataset.rotate = rotate;
		r = star.dataset.r;
		star.firstChild.setAttribute("transform", "translate("+r+","+r+") rotate("+rotate+")");
		}, 1);
	star.dataset.stop=x;
}

function stopRotation(star){
	clearInterval(star.dataset.stop);
}
function setStar(target){
	var id = target.parentElement.dataset.id;
	var star = document.getElementById("star-"+id);
	console.log(target.cx.baseVal.value);
	star.setAttribute("x",target.cx.baseVal.value - star.dataset.r);
	star.setAttribute("y", target.cy.baseVal.value - star.dataset.r);
	star.classList.remove("series-"+star.dataset.prev);
	star.classList.add("series-"+target.dataset.series);
	star.setAttribute("data-prev",target.dataset.series);
	rotateStar(star);
	star.classList.toggle("hidden");
}


function clearStar(target){
	var id = target.parentElement.dataset.id;
	var star = document.getElementById("star-"+id);
	stopRotation(star);
	star.classList.toggle("hidden");
	}