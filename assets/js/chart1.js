
 
var svg1Width = window.innerWidth * .6;
var svg1Height = window.innerHeight *.5;


var margin = {
  top: 25,
  right: 25,
  bottom: 25,
  left: 25
};

var width1 = svg1Width - margin.left - margin.right;
var height1 = svg1Height - margin.top - margin.bottom;



var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svg1Width)
  .attr("height", svg1Height)



var chartGroup1 = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


    

  d3.csv("assets/data/data.csv", function(error, Statedata){  
  
    if (error) throw error;
    console.log(Statedata)
    Statedata.forEach(function(data) {
      data.poverty = +data.poverty;
      data.povertyMoe = +data.povertyMoe;
      data.age = +data.age;
      data.ageMoe = +data.ageMoe;
      data.income = +data.income;
      data.incomeMoe = +data.incomeMoe;
      data.healthcare = +data.healthcare;
      data.healthcareLow = +data.healthcareLow;
      data.healthcareHigh = +data.healthcareHigh;
      data.obesity = +data.obesity;
      data.obesityLow = +data.obesityLow;
      data.obesityHigh = +data.obesityHigh;
      data.smokes = +data.smokes;
      data.smokesLow = +data.smokesLow;
      data.smokesHigh = +data.smokesHigh;


    });

    var xScale1 = d3.scaleLinear()
      .domain(d3.extent(Statedata, d => d.age))
      .range([0, width1]);
    var yScale1 = d3.scaleLinear()
      .domain([0, d3.max(Statedata, d => d.smokes)])
      .range([height1, 0]);

    var xAxis = d3.axisBottom(xScale1).ticks(10);
    var yAxis = d3.axisLeft(yScale1).ticks(4);
  

    chartGroup1.append("g").attr("transform", `translate(0, ${height1})`).call(xAxis);

    chartGroup1.append("g").call(yAxis)
    
    
    chartGroup1.append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Percent of population smokes (%)");;

    chartGroup1.append("text")             
      .attr("transform",
            "translate(" + (width1/2) + " ," + 
                           (height1 + margin.top - 30) + ")")
      .style("text-anchor", "middle")
      .text("Life Expectancy (years)");



    var circlesGroup1 = chartGroup1.selectAll("circle")
    .data(Statedata)
    .enter();

    circlesGroup1
    .append("circle")
    .attr("r", 15)
    .attr("cx", d => xScale1(d.age))
    .attr("cy", d => yScale1(d.smokes))
    .attr("stroke", "Black")
    .attr("stroke-width", 1.5)
    .attr("fill", 'none') 
    console.log(Statedata);


    circlesGroup1
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale1(d.age))
    .attr("y", d => yScale1(d.smokes))
    .attr("font-size", "10px")
    .attr("transform",
    "translate(" + -10 + " ," + 
                   5 + ")");







  var toolTip = d3.select("body")
    .attr("dx", function(d){return -20})
    .append("div")
    .classed("tooltip", true);

  d3.selectAll("circle").on('mouseover', function(d) {

    toolTip.style("display", "block")
      .html(`<b>${d.state}</b>`)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY + "px");
    d3.select(this)
      .attr("fill", "yellow")
      .attr("r", 40);
  })

  .on("mouseout", function() {
    toolTip.style("display", "none");
    d3.select(this)
    .attr("fill", "none")
    .attr("r", 15);
  });


 
          

  });
      
