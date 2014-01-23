var w = 900,
    h = 600,
    t = .0,
    delta = .01,
    padding = 10,
    points = [
      [{x: 150, y: 500}, {x: 150, y: 300}, {x: 150, y: 100}], 
      [{x: 450, y: 100}, {x: 450, y: 300}, {x: 450, y: 500}],
      [{x: 750, y: 500}, {x: 750, y: 300}, {x: 750, y: 100}] ],
    spoints = [
      [{x: 150, y: 500}, {x: 150, y: 300}],
      [{x: 150, y: 500}, {x: 150, y: 300}],
      [{x: 150, y: 500}, {x: 150, y: 300}] ],
    pivots = [{x: 0, y: 0}, {x: 0, y: 0}],
    bezier = {},
    line = d3.svg.line().x(x).y(y),
    stroke = d3.scale.category20b();

var vis = d3.select("#vis").append("svg")
    .attr("width", w + 2 * padding)
    .attr("height", h + 2 * padding)
  .append("g")
    .attr("transform", "translate(" + padding + "," + padding + ")");

//update();

var pGroups = vis.selectAll("g.pGroups")
    .data(points)
  .enter().append("g")
    .attr("class", "pGroups");

pGroups.selectAll("circle.control")
    .data(function (d) { return d;})
  .enter().append("circle")
    .attr("class", "control")
    .attr("r", 7)
    .attr("cx", x)
    .attr("cy", y)
    .attr("catagory", function (d, i) {
      switch (i%3) {
        case 0: return "begin";
        case 1: return "anchor";
        case 2: return "end";
      }
    })
    .call(d3.behavior.drag()
      .on("dragstart", function(d) {
        this.__origin__ = [d.x, d.y];
      })
      .on("drag", function(d) {
        d.x = Math.min(w, Math.max(0, this.__origin__[0] += d3.event.dx));
        d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
        bezier = {};
        update();
        vis.selectAll("circle.control")
          .attr("cx", x)
          .attr("cy", y);
      })
      .on("dragend", function() {
        delete this.__origin__;
      }));

vis.append("text")
  .attr("class", "t")
  .attr("x", w / 2)
  .attr("y", h)
  .attr("text-anchor", "middle");

var last = 0;
d3.timer(function(elapsed) {
  t = (t + (elapsed - last) / 5000) % 1;
  last = elapsed;
  update();
});

function update() {
  pGroups.selectAll("circle").data(function (d) {return d;}).exit().remove();
  pGroups.selectAll("circle").data(function (d, i) {return interpoints(i);})
    .enter().append("circle")
      .attr("class", "interpoints" )
      .attr("r", 4)
      .attr("cx", x)
      .attr("cy", y);

  pGroups.selectAll("circle.pivot").data(function (d,i) { 
    if(i==0) return [{ x: -100, y: -100 }];
    else return [pivots[i-1]]; })
  .enter().append("circle")
    .attr("class", "pivot")
    .attr("r", 7)
    .attr("cx", x)
    .attr("cy", y);

  var path=pGroups.selectAll("path.first").data(function (d) {return [d];});
  path.enter().append("path")
      .attr("class", "first")
      .attr("d", line)
  path.attr("d", line);

  path=pGroups.selectAll("path.second")
      .data(function (d, i) { 
    if(i==0)return [];
      return [[spoints[i-1][1], spoints[i][0]]]; });
  path.enter().append("path")
      .attr("class", "second")
      .attr("d", line)
  path.attr("d", line);

  path = pGroups.selectAll("path.curve")
      .data(getCurve);
  path.enter().append("path")
      .attr("class", "curve");
  path.attr("d", line);

  vis.selectAll("text.t")
    .text("t=" + t.toFixed(2));
}

function interpoints(d) {
  spoints[d].pop();
  spoints[d].pop();
  spoints[d].push( { x: points[d][0].x+(points[d][1].x-points[d][0].x)*t,
    y: points[d][0].y+(points[d][1].y-points[d][0].y)*t } );
  spoints[d].push( { x: points[d][1].x+(points[d][2].x-points[d][1].x)*t,
    y: points[d][1].y+(points[d][2].y-points[d][1].y)*t } );
  return points[d].concat( spoints[d] ); }

function getCurve(d, i) {
  if(i==0)
    return [];
  if (!bezier[i-1]) {
    bezier[i-1] = [];
    for (var t_=0; t_<=1; t_+=delta) {
      var tpoint_1 = { x: points[i-1][1].x+(points[i-1][2].x-points[i-1][1].x)*t_,
        y: points[i-1][1].y+(points[i-1][2].y-points[i-1][1].y)*t_ };
      var tpoint_2 = { x: points[i][0].x+(points[i][1].x-points[i][0].x)*t_,
        y: points[i][0].y+(points[i][1].y-points[i][0].y)*t_ };
      bezier[i-1].push( { x: tpoint_1.x+(tpoint_2.x-tpoint_1.x)*t_,
        y: tpoint_1.y+(tpoint_2.y-tpoint_1.y)*t_ });
    }
  }
  var p=Math.floor(t/delta);
  pivots[i-1].x=bezier[i-1][p].x;
  pivots[i-1].y=bezier[i-1][p].y;
  return [bezier[i-1].slice(0, t / delta + 1)];
}

function x(d) { return d.x; }
function y(d) { return d.y; }
function colour(d, i) {
  return stroke(i);
}
