const svgns = "http://www.w3.org/2000/svg";

function flashTriangle(){
	let count = 0;
	let DEGREES_TO_RADIANS = 1/180;
	let ACCELERATOR = 2.0;	

	setInterval(
		function(){
			count++;
			let val = Math.sin(count * DEGREES_TO_RADIANS * ACCELERATOR);
			document.getElementById("triangle").style.opacity = Math.abs(val);			
		},
		1
	);
}

function initStars(){
	buildStar("star-container","star1", 5, 50, "green");
	buildStar("star-container","star1", 5, 50, "purple");
	buildStar("star-container","star1", 5, 50, "blue");
}

function buildStar(parentId, id, numPoints, r1, borderColor){
	var starParent = document.getElementById(parentId);
	let svg = document.createElementNS(svgns, "svg");
	let height = r1 * 2.25;
	let width = r1 * 2.25;
	svg.setAttribute("height", height);
	svg.setAttribute("width", width);
	svg.setAttribute("id", id);
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
	polygon.setAttribute("stroke", borderColor);
	polygon.setAttribute("stroke-width", "5px");
	polygon.setAttribute("transform", "translate("+width/2+","+height/2+") rotate(90)")
	polygon.dataset.rotate = 0;
	polygon.addEventListener("mouseover", rotateStar);
	polygon.addEventListener("mouseleave", stopRotation);
	svg.appendChild(polygon);
	console.log(starParent.lastElementChild);
	console.log(starParent.lastElementChild.classList);
	starParent.insertBefore(svg,starParent.lastElementChild );	
}

function rotateStar(event){
	console.log("Rotating over the star!");
	let rotate = parseInt(event.target.dataset.rotate);
	var x = setInterval(function(){
		rotate = rotate + 1;
		event.target.dataset.rotate = rotate;
		//todo - is there a cleaner way to get this information?
		let height = parseInt(event.target.parentNode.height.baseVal.value);
		let width = parseInt(event.target.parentNode.width.baseVal.value);
		event.target.setAttribute("transform", "translate("+width/2+","+height/2+") rotate("+rotate+")");
		}, 1);
	event.target.dataset.stop=x;
}

function stopRotation(event){
	console.log("Rotation stopped!");
	clearInterval(event.target.dataset.stop);
}



/*
 * Init Functions 
 */
flashTriangle();
initStars();
