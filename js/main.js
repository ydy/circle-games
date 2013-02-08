
var maxHeight = 300
var maxWidth = 500
var svg = d3.select('#game').append('svg')
  .attr('width', maxWidth)
  .attr('height', maxHeight)

function randomNumber(lower, upper){
  return Math.floor(Math.random() * (upper-lower+1) + lower)
}
function randomCircle(){
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

var counter = 0

function drawCircles() {
  var allCircles = svg.selectAll('circle.pieces').data(makeCircles())
  allCircles.transition().duration(1000)
    .attr('cx', function(c){return c.cx})
    .attr('cy', function(c){return c.cy})
    .attr('r', function(c) {return c.r})

  var piecesEnter = allCircles.enter().append('circle')
  piecesEnter.classed('pieces', true)
  piecesEnter.attr('r', 0)
  piecesEnter.attr('cx', function(c){return c.cx})
  piecesEnter.attr('cy', function(c){return c.cy})
  piecesEnter.transition().duration(1000).attr('r', function(c) {
    return c.r
  })
  piecesEnter.on('click', function(circle){
    d3.select(this).transition().duration(1000).style('fill','blue')
    counter += 21-circle.r
    drawScore()
  })
  
  allCircles.exit().transition().duration(1000).attr('r', 0).remove()
}


function removeCircles(){
  svg.selectAll('circle').transition().duration(1000).attr('r', 0).remove()
}

function drawScore(){
  d3.select('#score').text('Score: '+ counter)
}

d3.select('#start').on('click', function(){
  counter = 0  
  drawScore()
  var drawTimer = setInterval(drawCircles, 1500)
  drawCircles()
  d3.select('#gameover').classed('finish', false)
  setTimeout(function gameover() {
    clearInterval(drawTimer)
    removeCircles()
    d3.select('#gameover').classed('finish', true)
  }, 1000)
})


