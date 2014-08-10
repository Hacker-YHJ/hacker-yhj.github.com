function run() {
  d3.select('svg.showcase').append('g')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 100)
    .attr('height', 100);
}
