(function() {
  var color, logo, padding, size, width, x, xAxis, y, yAxis;

  logo = new Vivus('svgTitle', {
    type: 'delayed',
    duration: 150,
    delay: 100
  }, function() {});

  $('header').ready(function() {
    return $(this).stellar({
      positionProperty: 'transform'
    });
  });

  $('div.top').on('click', function() {
    return $.scrollTo('#top', 300);
  });

  width = 800;

  size = 150;

  padding = 20;

  x = d3.scale.linear().range([padding / 2, size - padding / 2]);

  y = d3.scale.linear().range([size - padding / 2, padding / 2]);

  xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);

  yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

  color = d3.scale.category10();

  d3.csv("assets/data/iris.csv", function(error, data) {
    var cell, cross, domainByTrait, n, plot, svg, traits;
    if (error) {
      throw error;
    }
    plot = function(p) {
      var cell;
      cell = d3.select(this);
      x.domain(domainByTrait[p.x]);
      y.domain(domainByTrait[p.y]);
      cell.append("rect").attr("class", "frame").attr("x", padding / 2).attr("y", padding / 2).attr("width", size - padding).attr("height", size - padding);
      return cell.selectAll("circle").data(data).enter().append("circle").attr("cx", function(d) {
        return x(d[p.x]);
      }).attr("cy", function(d) {
        return y(d[p.y]);
      }).attr("r", 3).style("fill", function(d) {
        return color(d.species);
      });
    };
    cross = function(a, b) {
      var c, i, j, k, l, m, n, ref, ref1;
      c = [];
      n = a.length;
      m = b.length;
      for (i = k = 0, ref = n; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        for (j = l = 0, ref1 = m; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
          c.push({
            x: a[i],
            i: i,
            y: b[j],
            j: j
          });
        }
      }
      return c;
    };
    domainByTrait = {};
    traits = d3.keys(data[0]).filter(function(d) {
      return d !== "species";
    });
    n = traits.length;
    traits.forEach(function(trait) {
      return domainByTrait[trait] = d3.extent(data, function(d) {
        return d[trait];
      });
    });
    xAxis.tickSize(size * n);
    yAxis.tickSize(-size * n);
    svg = d3.select("#plot").append("svg").attr("width", size * n + padding).attr("height", size * n + padding).append("g").attr("transform", "translate(" + padding + "," + padding / 2 + ")");
    svg.selectAll(".x.axis").data(traits).enter().append("g").attr("class", "x axis").attr("transform", function(d, i) {
      return "translate(" + (n - i - 1) * size + ",0)";
    }).each(function(d) {
      x.domain(domainByTrait[d]);
      return d3.select(this).call(xAxis);
    });
    svg.selectAll(".y.axis").data(traits).enter().append("g").attr("class", "y axis").attr("transform", function(d, i) {
      return "translate(0," + i * size + ")";
    }).each(function(d) {
      y.domain(domainByTrait[d]);
      return d3.select(this).call(yAxis);
    });
    cell = svg.selectAll(".cell").data(cross(traits, traits)).enter().append("g").attr("class", "cell").attr("transform", function(d) {
      return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")";
    }).each(plot);
    cell.filter(function(d) {
      return d.i === d.j;
    }).append("text").attr("x", padding).attr("y", padding).attr("dy", ".71em").text(function(d) {
      return d.x;
    });
    d3.select(self.frameElement).style("height", size * n + padding + 20 + "px");
  });

}).call(this);
