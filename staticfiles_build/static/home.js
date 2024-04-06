// Fetch data from the API endpoint
fetch('/api/market-insights/')
  .then(response => response.json())
  .then(data => {
    // Once data is fetched, process it and create scatter plot using D3.js
    createScatterPlot(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to create scatter plot using D3.js
function createScatterPlot(data) {
  // Define the dimensions and margins for the plot
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Append SVG element to the container
  const svg = d3.select('#intensity-likelihood-chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Define scales for x and y axes
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.intensity)]) // Assuming intensity is on x-axis
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.likelihood)]) // Assuming likelihood is on y-axis
    .range([height, 0]);

  // Create circles for each data point
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.intensity))
    .attr('cy', d => yScale(d.likelihood))
    .attr('r', 5) // Radius of circles
    .style('fill', 'steelblue'); // Color of circles

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
    .text('Intensity');

  // Add y-axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Likelihood');

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .style('text-decoration', 'underline')
    .text('Intensity vs. Likelihood Distribution');
}
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
