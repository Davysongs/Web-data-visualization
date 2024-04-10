// Declare the chart dimensions and margins.
  var width = document.querySelector('.chart-wrapper').clientWidth;
  var height = document.querySelector('.chart-wrapper').clientHeight;

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
// Use svgWidth and svgHeight variables when creating the SVG

    const marginTop = 20;
    const marginRight = 5;
    const marginBottom = 30;
    const marginLeft = 15;
  
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
        .call(d3.axisLeft(y).tickFormat((y) => (y).toFixed()))
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


fetch('/api/market-insights/histogram/')
  .then(response => response.json())
  .then(data => {
    // Process data and create the chart
    createHistogram(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
function createHistogram(data){
  const marginTop = 20;
  const marginRight = 15;
  const marginBottom = 20;
  const marginLeft = 15;

  // Bin the data.
  const bins = d3.bin()
      .thresholds(40)
      .value((d) => d.relevance)
    (data);

  // Declare the x (horizontal position) scale.
  const x = d3.scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.select('#histogram')
  .append('svg')
  .attr('width', width + marginLeft + marginRight)
  .attr('height', height + marginTop + marginBottom)
  .append('g')
  .attr('transform', `translate(${marginLeft},${marginTop})`);

  // Add a rect for each bin.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(bins)
    .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length));

  // Add the x-axis and label.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call((g) => g.append("text")
          .attr("x", width)
          .attr("y", marginBottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text("relevance (%) →"));

  // Add the y-axis and label, and remove the domain line.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency (no. of topics)"));

  // Return the SVG element.
  return svg.node();
}