
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


function makeNewCircle(c, angle) {
  return {cx: c.cx + n*c.r*Math.cos(angle), cy: c.cy + n*c.r*Math.sin(angle), r: m*c.r}
}

function makeCircleExplosion(c) {
  var circles = [c];
  for (var i=0; i<8; i++) {
    circles[i + 1] = makeNewCircle(c, i * Math.PI/4)
  }
  return circles
}

var counter = 0

function drawCircles(circles) {
  var allCircles = svg.selectAll('circle.pieces').data(circles)
  allCircles.transition().duration(1000)
    .attr('cx', function(c){return c.cx})
    .attr('cy', function(c){return c.cy})
    .attr('r', function(c) {return c.r})

  allCircles.enter().append('circle')
    .classed('pieces', true)
    .attr('r', 0)
    .attr('cx', function(c){return c.cx})
    .attr('cy', function(c){return c.cy})    
    .on('click', function(circle){
      d3.select(this).transition().duration(1000).style('fill','blue')
      counter += 21-circle.r
      drawScore()
    })
    .transition()
      .duration(1000).attr('r', function(c) {
        return c.r
      })
    allCircles.exit().transition().duration(1000).attr('r', 0).remove()
}


function removeCircles(){
  svg.selectAll('circle').transition().duration(1000).attr('r', 0).remove()
}

function drawScore(){
  d3.select('#score').text('Score: '+ counter)
}

function playGame() {
  function drawGameCircles() {
    drawCircles(makeCircles())
  }
  d3.select('#start').on('click', function startGame(){
    counter = 0  
    drawScore()
    var drawTimer = setInterval(drawGameCircles, 1500)
    drawGameCircles()
    d3.select('#gameover').classed('finish', false)
    setTimeout(function gameOver() {
      clearInterval(drawTimer)
      removeCircles()
      d3.select('#gameover').classed('finish', true)
    }, 1000)
  })
}

playGame()
var n = 2.4
var m = 0.28
var circleList = makeCircleExplosion({ cx: 200, cy: 150, r: 50 })
function makeSuperExplosion(circleList){
  var manyCircles = circleList.map(function(circle) {
    return makeCircleExplosion(circle)
  }).reduce(function (circlesArr, circles) {
    return circlesArr.concat(circles)
  })
  return manyCircles
}
drawCircles(makeSuperExplosion(circleList))
/*
1 array of 9 arrays of 9 circles
1 array of 81 circles

makeSuperExplosion(cicleList) {
  var newArray = [];
  circleList.forEach(function(circle, index) {
     newArray[index] = makeCircleExplosion(circle)
  });
  return newArray.reduce(function (circlesArr, circles) {
    return circlesArr.concat(circles)
  })
}
*/










