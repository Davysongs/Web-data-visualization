// Fetch data from the API
fetch('/api/market-insights/')
  .then(response => response.json())
  .then(data => {
    // Process data and create the chart
    createBarChart(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to create the bar chart
function createBarChart(data) {
    // Declare the chart dimensions and margins.
    var width = document.querySelector('.chart-wrapper').clientWidth;
    var height = document.querySelector('.chart-wrapper').clientHeight;
// Use svgWidth and svgHeight variables when creating the SVG

    const marginTop = 20;
    const marginRight = 5;
    const marginBottom = 30;
    const marginLeft = 10;
  
    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(d3.groupSort(data, ([d]) => -d.intensity, (d) => d.likelihood)) // descending intensity
        .range([marginLeft, width - marginRight])
        .padding(0.1);
    
    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.intensity)])
        .range([height - marginBottom, marginTop]);
  
    // Create the SVG container.
    const svg = d3.select('#likelihood-intensity-chart')
    .append('svg')
    .attr('width', width + marginLeft + marginRight)
    .attr('height', height + marginTop + marginBottom)
    .append('g')
    .attr('transform', `translate(${marginLeft},${marginTop})`);

    // Add a rect for each bar.
    svg.append("g")
        .attr("fill", "steelblue")
      .selectAll()
      .data(data)
      .join("rect")
        .attr("x", (d) => x(d.likelihood))
        .attr("y", (d) => y(d.intensity))
        .attr("height", (d) => y(0) - y(d.intensity))
        .attr("width", x.bandwidth());
  
    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
  
    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ intensity (%)"));
  
    // Return the SVG element.
    return svg.node();
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
