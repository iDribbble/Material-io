var circle = document.querySelector('#circle');
var square = document.querySelector('#square');
var innerBlock = document.querySelector('#innerBlock');
var svg = document.querySelector('svg');
var oBack = document.querySelector('#back');
var trangle = document.querySelector('#transformTrangle');

var circleLength = circle.getTotalLength();
var squareLength = square.getTotalLength();

circle.style.strokeDasharray = circleLength;
square.style.strokeDasharray = circleLength;

circle.style.strokeDashoffset = circleLength;
square.style.strokeDashoffset = circleLength;

var extremeInOutEasing = mojs.easing.path('M0, 100 C54.387239731236384, 91.3270459830493 27.041331697335025, 6.387239731236383 100, 0 ');

var speedAccelerating = mojs.easing.path('M0, 100 C32.75777544552211, 99.61276026876361 59.949928537065304, 80.97745484368649 65, 75 C71.2330256706606, 67.62235598855045 99.26454598304935, 38.958668302664954 100, 0 ');

// stroke circle and rotate
new mojs.Tween({
  delay:    2000,
  duration: 1000,
  onUpdate: function (progress) {
    var extremeInOutProgress = extremeInOutEasing(progress);
    circle.style.strokeDashoffset = (1-extremeInOutProgress) * circleLength;
    
    svg.style.transform = `rotate(${(extremeInOutProgress-1)*90}deg)`
  }
}).play();

// stroke square
new mojs.Tween({
	delay:1000,
	duration:1000,
	onUpdate:function(progress){
		var extremeInOutProgress = speedAccelerating(progress);

		square.style.strokeDashoffset = (1-extremeInOutProgress) * squareLength;
	}
}).play()

// Zoom in the center circle
new mojs.Tween({
	delay:2500,
	duration:600,
	onUpdate:function(progress){
		var extremeInOutProgress = extremeInOutEasing(progress);

		innerBlock.style.width = `${(extremeInOutProgress)*200}px`;
		innerBlock.style.height = `${(extremeInOutProgress)*200}px`;

		innerBlock.style.left = `${80 - (extremeInOutProgress)*100}px`;
		innerBlock.style.top = `${80 - (extremeInOutProgress)*100}px`;
	}
}).play()

// Zoom the squrae stage
new mojs.Tween({
	delay:2900,
	duration:600,
	onUpdate:function(progress){
		var extremeInOutProgress = extremeInOutEasing(progress);

		oBack.style.transform = `scale(${(extremeInOutProgress)*0.2+0.8})`
	}
}).play()

// Turn a rectangle to triangle
new mojs.Tween({
	delay:2600,
	duration:1000,
	onUpdate:function(progress){
		var extremeInOutProgress = extremeInOutEasing(progress);

		"697 1572 843 1572 697 1718 843 1718"
		trangle.setAttribute('points',`697 1572 843 1572 ${770 + 73*(1-extremeInOutProgress)} 1718 ${770 - 73*(1-extremeInOutProgress)} 1718`)
	}
}).play()