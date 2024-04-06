fetch('/api/market-insights/')
  .then(response => response.json())
  .then(data => {
    // Filter out data points with missing intensity or likelihood
    const filteredData = data.filter(insight => insight.intensity !== null && insight.likelihood !== null);
    const intensityData = filteredData.map(insight => insight.intensity);
    const likelihoodData = filteredData.map(insight => insight.likelihood);
    const relevanceData = filteredData.map(insight => insight.relevance);  // Assuming relevance for color coding

    // Create your D3.js chart
    const svgWidth = 600;
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

// Fetch data from the API
// Fetch data from the API endpoint
fetch('/api/relevance-distribution/')
  .then(response => response.json())
  .then(data => {
    // Once data is fetched, process it and create bar chart using D3.js
    createBarChart(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to create bar chart using D3.js
function createBarChart(data) {
  // Define the dimensions and margins for the plot
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Append SVG element to the container
  const svg = d3.select('#bar-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Define scales for x and y axes
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.relevance))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height, 0]);

  // Create bars for each data point
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.relevance))
    .attr('y', d => yScale(d.count))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.count))
    .attr('fill', 'steelblue');

  // Add x-axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append('g')
    .call(d3.axisLeft(yScale));

  // Add x-axis label
  svg.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
    .style('text-anchor', 'middle')
    .text('Relevance');

  // Add y-axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Count');

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Bar Chart (Relevance Distribution)');
}

// Fetch data from the API endpoint
fetch('/api/heatmap-data/')
  .then(response => response.json())
  .then(data => {
    // Once data is fetched, process it and create heat map using D3.js
    createHeatMap(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to create heat map using D3.js
function createHeatMap(data) {
  // Define the dimensions and margins for the plot
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Append SVG element to the container
  const svg = d3.select('#heat-map')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Define scales for x and y axes
  const sectors = Array.from(new Set(data.map(d => d.sector)));
  const pestles = Array.from(new Set(data.map(d => d.pestle)));

  const xScale = d3.scaleBand()
    .domain(sectors)
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleBand()
    .domain(pestles)
    .range([height, 0])
    .padding(0.1);

  // Create color scale
  const colorScale = d3.scaleSequential(d3.interpolateRdBu)
    .domain([0, d3.max(data, d => d.count)]);

  // Create rectangles for each data point
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.sector))
    .attr('y', d => yScale(d.pestle))
    .attr('width', xScale.bandwidth())
    .attr('height', yScale.bandwidth())
    .style('fill', d => colorScale(d.count));

  // Add x-axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append('g')
    .call(d3.axisLeft(yScale));

  // Add x-axis label
  svg.append('text')
    .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
    .style('text-anchor', 'middle')
    .text('Sector');

  // Add y-axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('PESTLE');

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Heat Map (Sector vs. PESTLE)');
}
