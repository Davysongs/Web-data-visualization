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

// Fetch data from the API
fetch('/api/top-topics-by-region/')
  .then(response => response.json())
  .then(data => {
    // Create a map instance
    const map = L.map('map-chart').setView([0, 0], 2);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Define an object to store markers by region
    const markersByRegion = {};

    // Iterate through the data and create markers with checks for geolocation data
    data.forEach(item => {
      const { region, topic, latitude, longitude } = item;

      // Check if geolocation data is available, skip if not
      if (!latitude || !longitude) {
        console.warn(`Skipping marker creation for region: ${region}, missing geolocation data`);
        return;
      }

      // Create a marker for the region with popup content
      const marker = L.marker([latitude, longitude]).bindPopup(`<b>Region:</b> ${region}<br><b>Topic:</b> ${topic}`);

      // Add the marker to the map
      marker.addTo(map);

      // Add the marker to the markersByRegion object
      if (!markersByRegion[region]) {
        markersByRegion[region] = [];
      }
      markersByRegion[region].push(marker);
    });

    // Add layer control to toggle markers by region
    L.control.layers(null, markersByRegion, { collapsed: false }).addTo(map);
  })
  .catch(error => console.error('Error fetching data:', error));

