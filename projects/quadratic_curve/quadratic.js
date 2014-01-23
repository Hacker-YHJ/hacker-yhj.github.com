var w = 900,
    h = 600,
    padding = 10,
    quadratic = {},
    line = d3.svg.line().x(x).y(y),
    e = 1.0,
    pp=200.0;

var vis = d3.select("#vis").append("svg")
    .attr("width", w + 2 * padding)
    .attr("height", h + 2 * padding)
  .append("g")
    .attr("transform", "translate(" + padding + "," + padding + ")");

var axis=vis.selectAll("path.axis").data([[{x:200, y:0},{x:200, y:h}],[{x:0, y:300},{x:w, y:300}]]);
axis.enter().append("path")
    .attr("class", "axis")
    .attr("d", line)
axis.attr("d", line);

var st=vis.selectAll("path.stline").data([[{x:100, y:0},{x:100, y:h}]]);
st.enter().append("path")
  .attr("class", "stline")
  .attr("d", line)
st.attr("d", line);

vis.append("text")
  .attr("class", "e")
  .attr("x", w / 2)
  .attr("y", h)
  .attr("text-anchor", "middle");

vis.selectAll("circle.stpoint")
    .data([{x: 300, y: 300}])
  .enter().append("circle")
    .attr("class", "stpoint")
    .attr("r", 5)
    .attr("cx", x)
    .attr("cy", y);

vis.selectAll("circle.o")
    .data([{x: 200, y: 300}])
  .enter().append("circle")
    .attr("class", "o")
    .attr("r", 5)
    .attr("cx", x)
    .attr("cy", y);

vis.selectAll("circle.control")
    .data([{x: 200, y: 300}])
  .enter().append("circle")
    .attr("class", "control")
    .attr("r", 7)
    .attr("cx", x)
    .attr("cy", y)
    .call(d3.behavior.drag()
      .on("dragstart", function(d) {
        this.__origin__ = [d.x, d.y];
      })
      .on("drag", function(d) {
        d.x = Math.min(300, Math.max(100, this.__origin__[0] += d3.event.dx));
        //d.y = Math.min(h, Math.max(0, this.__origin__[1] += d3.event.dy));
        quadratic = {};
        e=(300.0-d.x)/(d.x-100.0);
        pp=d.x;
        update();
        vis.selectAll("circle.control")
          .attr("cx", x)
          .attr("cy", y);
      })
      .on("dragend", function() {
        delete this.__origin__;
      }));

update();

function update() {

  var path = vis.selectAll("path.curve")
      .data(getCurve);
  path.enter().append("path")
      .attr("class", "curve");
  path.attr("d", line);

  var path = vis.selectAll("path.asymptote")
      .data(getAsy);
  path.enter().append("path")
      .attr("class", "asymptote");
  path.attr("d", line);

  vis.selectAll("text.e")
    .text("e=" + e.toFixed(2));
}

function getAsy(d, i) {
  if( e > 1 ) {
    var z=pp-e*200/(e*e-1);
    var tan=e/2;
    return [[{x: 300.0/tan+z, y: 0}, {x: z, y: 300}, {x: 300.0/tan+z, y: 600}]];
  }
  else
    return [];
}


function getCurve(d, i) {
  if (!quadratic[0]) {
    quadratic[0] = [{x:pp, y:300}];
    for (var t=pp+1; t<=900; t+=1) {
      var dy=((t-100.0)*e)*((t-100.0)*e)-(300.0-t)*(300.0-t);
      if( dy<0 ) {
        quadratic[0].push( { x: t, y: 300.0 } );
        quadratic[0].unshift( { x: t, y: 300.0 } );
        break;
      }
      dy=Math.sqrt(dy)/2;
      if( dy>300 ) break;
      quadratic[0].push( { x: t, y: 300.0-dy } );
      quadratic[0].unshift( { x: t, y: 300.0+dy } );
    }
  }
  return [quadratic[0]];
}

function x(d) { return d.x; }
function y(d) { return d.y; }