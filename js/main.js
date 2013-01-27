var circles = []

randomNumber = function(lower, upper){
  return Math.floor(Math.random() * (upper-lower+1) + lower)
}

randomCircle = function(){
  return {cx:randomNumber(0, 500), cy:randomNumber(0,500), r:randomNumber(5,20)}
}



var circlesNumber = 10

for(var i = 0; i < 10; i++){
   circles[i] = randomCircle()
}

var svg = d3.select('#game').append('svg')
	.attr('width', 500)
	.attr('height', 500)
var piecesEnter = svg.selectAll('.pieces').data(circles).enter().append('circle')
piecesEnter.classed('pieces', true)
piecesEnter.attr('cx', function(c){return c.cx})
piecesEnter.attr('cy', function(c){return c.cy})
piecesEnter.attr('r', function(c){return c.r})







