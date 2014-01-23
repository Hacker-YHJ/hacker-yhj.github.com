var windowsWidth = 800,
  windowsHeight = 600,
  margin = { top: 50, right: 50, bottom: 50, left: 100 },
  width = windowsWidth - margin.left - margin.right,
  height = windowsHeight - margin.top - margin.bottom,
  gridSize = Math.floor(width/7),
  gridMargin = 5,
  brickSize = gridSize - gridMargin,
  color = ["#3182bd","#6baed6","#9ecae1","#c6dbef","#31a354","#74c476","#a1d99b","#c7e9c0"],
  days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

d3.tsv("courses.tsv",
  function(d){
    return {
      day: +d.day,
      index: +d.index,
      duration: +d.duration,
      count: +d.count,
      flag: +d.flag };
  },
  function(error, data){
    var countSort = [],
      clength;
    for( var g = 0; g < data.length; ++g ) {
        countSort.push( data[g].count );
    }
    clength = countSort.length;
    countSort.sort( function(a,b){ return b-a; });
    countSort.push( countSort[0] );
    countSort.push( countSort[Math.floor(clength/3)] );
    countSort.push( countSort[Math.floor(2*clength/3)] );
    countSort.splice(0,clength);

    var svg = d3.select("div#chat").append("svg")
      .attr("width", windowsWidth)
      .attr("height", windowsHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var weekLables = svg.selectAll(".weekLable")
      .data(days).enter().append("text")
      .text(function(d){ return d; })
      .attr("y", 0)
      .attr("x", function(d,i){ return i*gridSize; })
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize/2 + ",-6)")
      .attr("class", "weekLable");

    var indexLables = svg.selectAll(".indexLable")
    .data(d3.range(1,13)).enter().append("text")
    .text(function(d){ return "No." + d; })
    .attr("x", 0)
    .attr("y", function(d,i){ return i*gridSize/2; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-10," + gridSize/3 +")")
    .attr("class", "indexLable");

    var timetable = svg.selectAll(".table")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){ return (d.day-1)*gridSize; })
      .attr("y", function(d){ return (d.index-1)*gridSize/2; })
      .attr("width", brickSize )
      .attr("height", function(d){ return (brickSize*d.duration+gridMargin*(d.duration-1))/2; })
      .attr("class", "table")
      .attr("rx", 8)
      .attr("ry", 8)
      .style("fill", function(d, i){
        var bias = (d.flag == 1) ? 4 : 0;
        if( d.count < countSort[2] ) return color[3+bias];
        if( d.count < countSort[1] ) return color[2+bias];
        if( d.count < countSort[0] ) return color[1+bias];
        return color[0+bias]; });

    var counter = svg.selectAll(".counter")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){ return d.count; })
    .attr("x", function(d){ return (d.day-1)*gridSize; })
    .attr("y", function(d){ return (d.index-1)*gridSize/2; })
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize/2 + "," + gridSize/1.4 + ")")
    .attr("class", "counter");
  });