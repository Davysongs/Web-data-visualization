fetch('/api/market-insights/')
  .then(response => response.json())
  .then(data => {
    // Filter out data points with missing intensity or likelihood
    const filteredData = data.filter(insight => insight.intensity !== null && insight.likelihood !== null);
    const intensityData = filteredData.map(insight => insight.intensity);
    const likelihoodData = filteredData.map(insight => insight.likelihood);
    const relevanceData = filteredData.map(insight => insight.relevance);  // Assuming relevance for color coding

    // Create your D3.js chart
    const svgWidth = 570;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Append SVG to the chart container
    const svg = d3.select('#intensity-likelihood-chart')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Create color scale for relevance
    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(relevanceData)])  // Assuming relevance between 0 and max
      .range(['lightblue', 'darkblue']);  // Color range for relevance

    // Create scales for x and y axes
    const xScale = d3.scaleLinear().domain([0, d3.max(intensityData)]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, d3.max(likelihoodData)]).range([height, 0]);

    // Create x and y axes
    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    // Append x axis to the SVG
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', width / 2)
      .attr('y', margin.bottom - 10)
      .text('Intensity');

    // Append y axis to the SVG
    svg.append('g')
      .call(yAxis)
      .append('text')
      .attr('class', 'axis-label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .text('Likelihood');

    // Create circles for each data point with tooltips
    svg.selectAll('circle')
  .data(filteredData)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.intensity))
  .attr('cy', d => yScale(d.likelihood))
  .attr('r', 5)
  .attr('fill', d => colorScale(d.relevance))  // Color based on relevance
  // Add tooltip on hover (without nested event handler)
  .on('mouseover', function(d) {
    const tooltip = d3.select(this).append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    tooltip.html(`
      Intensity: ${d.intensity} <br>
      Likelihood: ${d.likelihood} <br>
      Relevance: ${d.relevance}
    `)
      .style('left', (d3.event.pageX + 10) + 'px')
      .style('top', (d3.event.pageY + 10) + 'px')
      .transition()
      .duration(200)
      .style('opacity', 0.9);
  })
  .on('mouseout', function() {
    d3.select(this).select('.tooltip').transition().duration(200).style('opacity', 0).remove();
  });
})