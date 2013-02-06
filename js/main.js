
var maxHeight = 300
var maxWidth = 500
var svg = d3.select('#game').append('svg')
  .attr('width', maxWidth)
  .attr('height', maxHeight)

randomNumber = function(lower, upper){
  return Math.floor(Math.random() * (upper-lower+1) + lower)
}

randomCircle = function(){
  return {cx:randomNumber(0, maxWidth), cy:randomNumber(0, maxHeight), r:randomNumber(5,20)}
}

function makeCircles() {
  var circles = []
  var circlesNumber = randomNumber(5, 50)

  for(var i = 0; i < circlesNumber; i++){
   circles[i] = randomCircle()
  }
  return circles
}

function drawCircles() {
  var allCircles = svg.selectAll('.pieces').data(makeCircles())
  allCircles.transition().duration(1000)
    .attr('cx', function(c){return c.cx})
    .attr('cy', function(c){return c.cy})
    .attr('r', function(c) {return c.r})

  var piecesEnter = allCircles.enter().append('circle')
  piecesEnter.classed('pieces', true)
  //piecesEnter.attr('r', function(c){return c.r})
  piecesEnter.attr('r', 0)
  piecesEnter.attr('cx', function(c){return c.cx})
  piecesEnter.attr('cy', function(c){return c.cy})
  piecesEnter.transition().duration(1000).attr('r', function(c) {
    return c.r
  })
  
  allCircles.exit().transition().duration(1000).attr('r', 0).remove()

  //allCircles.attr('r', function(c){return c.r})
}
setInterval(drawCircles, 1000)
drawCircles()
/*
piecesEnter.transition().duration(function(c, i){
  return 200*i
}).attr('cy', function(c) {
  return c.r
})
*/
