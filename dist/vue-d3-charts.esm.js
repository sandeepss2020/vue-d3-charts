/* eslint-disable import/prefer-default-export */
import { select } from "d3-selection";
import { selectAll } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { axisLeft } from "d3-axis";
import { axisBottom } from "d3-axis";
import { scaleBand } from "d3-scale";
import * as d3Line from "d3-shape";
// import { line } from "d3-shape";
import * as d3 from "d3";
import { transition } from "d3-transition";
import { scaleOrdinal } from "d3-scale";
import { curveBasis } from "d3-shape";

//IMPORTING FOR SCATTER GRAPH
import { csv, extent, max } from "d3";

window.onload = function () {
  // document.getElementById("graph1");
  // document.getElementsByTagName("svg");
  // document.getElementById("graph").innerHTML = "";
  document.getElementByTagName("svg").empty();
};
window.onbeforeunload = function () {
  console.log("CALL CALL CALL");
};
let script = {
  name: "BarCharts",
  allData: [],
  marks_data: [],
  svgWidth: window.innerWidth,
  max: 0,
  count: 0,
  pie_data: [
    { platform: "Android", percentage: 40.11 },
    { platform: "Windows", percentage: 36.69 },
    { platform: "iOS", percentage: 13.06 },
  ],
};

//GRAPH 1
class scatterplot {
  async scatterGraph(data) {
    //   const scatterPlot = (selection, props) => {
    //     const {
    //       xValue,
    //       yValue,
    //       margin,
    //       width,
    //       height,
    //       data
    //     } = props;
    //     // console.log("Radius is",circleRadius)
    //     console.log(data)
    //     const innerWidth = script.svgWidth - margin.left - margin.right;
    //     const innerHeight = 550 - margin.top - margin.bottom;

    //     // const xScale = scaleBand().domain(data.map((d) => d.name)).range([0, innerWidth])
    //     const xScale = scaleLinear()
    //       .domain(extent(data, xValue))
    //       // .domain([0, Math.max(...data.map((o) => o.horsepower))])
    //       .range([0, innerWidth]).nice()
    //       // .domain(extent(data, xValue))
    //       // .range([0, innerWidth])
    //       // .nice();

    //     const yScale = scaleBand().domain(data.map((d) => d.name)).range([innerHeight, 0]),

    //       yScale1 = scaleLinear().domain([0, 8]).range([0, innerHeight]).nice(),

    //       y_axis = axisLeft().scale(yScale1);
    //         // const yScale = scaleLinear();Q
    //     // yScale.domain(extent(data, yValue));
    //     // yScale.range([innerHeight, 0]);
    //     // yScale.nice();

    //        const x_axis = axisBottom(xScale),
    //          xAxisTranslate =500;

    //      const xGridLine = axisBottom(xScale)
    //       .scale(xScale)
    //       .tickSize(500, 0, 0)
    //        .tickFormat("");

    //         var yGridLine = axisLeft(yScale1)
    //           .scale(yScale1)

    //           // .tickPadding(5)
    //           .tickSize(-innerWidth)

    //           .tickFormat("");

    //     let g0 = svg_1
    //       .append("g")
    //       .attr("transform", "translate(" + 30 + "," + 20 + ")");

    // svg_1.append("g")
    //       .attr("class", "y axis")
    //       .attr("transform", "translate(25,0)")
    //   // .call(y_axis)

    //   // svg_1.select(".x.axis").call(x_axis);
    //   //   svg_1.select(".x.axis").remove();

    // svg_1
    //       .append("g")
    //       .attr("class", "x axis")
    //       .attr("transform", "translate(20," + xAxisTranslate + ")")
    //       // .call(x_axis)

    //         svg_1
    //       .append("g")
    //       .classed("gridLine", true)
    //       .attr("transform", "translate(25,0)")
    //       .style("color", "grey")
    //       .attr("opacity", "0.5")
    //       // .call(yGridLine);

    //     svg_1
    //       .append("g")
    //       .classed("gridLine", true)
    //       .attr("transform", "translate(25,0)")
    //       .style("color", "grey")
    //       .attr("opacity", "0.5")
    //       // .call(xGridLine);

    //     const circles = g0
    //       .selectAll('circle').data(data);
    //     circles
    //       .enter().append('circle')
    //       .attr('cx', innerWidth / 2)
    //       .attr('cy', innerHeight / 2)
    //       .attr('r', function (d) {
    //         // console.log("i values", circleRadius.cylinders)
    //         return Math.exp(d.horsepower / 100);
    //       })
    //       .attr("fill", function (circleRadius) { return circleRadius.horsepower <= 100 ? '#BCCBB1' : '#8676FF' })
    //       .attr("opacity", 0.7).on("mouseover", mouseover)
    //       .on("mousemove", function () {
    //           Tooltip
    //             .style("top", event.pageY - 10 + "px")
    //             .style("left", event.pageX + 10 + "px");
    //         })
    //       .on("mouseleave", mouseleave);

    //   svg_1.selectAll("circle")
    //   .transition()
    //   .duration(2000)
    // .delay((d, i) => i * 10)
    //         .attr('cy', d => yScale(yValue(d)))
    //         .attr('cx', d => xScale(xValue(d)))
    //         .attr('r', function (circleRadius) {
    //           // console.log("i values", circleRadius.cylinders)
    //   return 5*(Math.exp(circleRadius.horsepower /100));
    //         })
    //   };
    const svg_1 = select("#graph1")
      .append("svg")
      .attr("viewBox", `0 0 ${script.svgWidth + 50} 550`);

    function render() {
      const xValue = function (circleRadius) {
          return circleRadius.horsepower;
        },
        yValue = function (circleRadius) {
          return circleRadius.name;
        },
        margin = { top: 20, right: 10, bottom: 20, left: 10 };

      // console.log(data)
      const innerWidth = script.svgWidth - margin.left - margin.right;
      const innerHeight = 550 - margin.top - margin.bottom;

      // const xScale = scaleBand().domain(data.map((d) => d.name)).range([0, innerWidth])
      const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

      const yScale = scaleBand()
          .domain(data.map((d) => d.name))
          .range([innerHeight, 0]),
        yScale1 = scaleLinear().domain([0, 8]).range([0, innerHeight]).nice(),
        y_axis = axisLeft().scale(yScale1);

      const x_axis = axisBottom(xScale),
        xAxisTranslate = 500;

      const xGridLine = axisBottom(xScale)
        .scale(xScale)
        .tickSize(500, 0, 0)
        .tickFormat("");

      var yGridLine = axisLeft(yScale1)
        .scale(yScale1)

        // .tickPadding(5)
        .tickSize(-innerWidth)

        .tickFormat("");

      let g0 = svg_1
        .append("g")
        .attr("transform", "translate(" + 30 + "," + 20 + ")");

      svg_1
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(25,0)");

      svg_1
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(20," + xAxisTranslate + ")");
      // .call(x_axis)

      svg_1
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(25,0)")
        .style("color", "grey")
        .attr("opacity", "0.5");
      // .call(yGridLine);

      svg_1
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(25,0)")
        .style("color", "grey")
        .attr("opacity", "0.5");
      // .call(xGridLine);

      const circles = g0.selectAll("circle").data(data);
      circles
        .enter()
        .append("circle")
        .attr("cx", innerWidth / 2)
        .attr("cy", innerHeight / 2)
        .attr("r", function (d) {
          // console.log("i values", circleRadius.cylinders)
          return Math.exp(d.horsepower / 100);
        })
        .attr("fill", function (circleRadius) {
          return circleRadius.horsepower <= 100 ? "#BCCBB1" : "#8676FF";
        })
        .attr("opacity", 0.7)
        .on("mouseover", mouseover)
        .on("mousemove", function () {
          Tooltip.style("top", event.pageY - 10 + "px").style(
            "left",
            event.pageX + 10 + "px"
          );
        })
        .on("mouseleave", mouseleave);

      svg_1
        .selectAll("circle")
        .transition()
        .duration(2000)
        .delay((d, i) => i * 10)
        .attr("cy", (d) => yScale(yValue(d)))
        .attr("cx", (d) => xScale(xValue(d)))
        .attr("r", function (circleRadius) {
          // console.log("i values", circleRadius.cylinders)
          return 5 * Math.exp(circleRadius.horsepower / 100);
        });
      console.log("render", data);
    }
    // create a tooltip
    var Tooltip = select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    let mouseover = function (d) {
      Tooltip.style("opacity", 1)
        .style("visibility", "visible")
        .html("The exact value of<br>this cell is: " + d.horsepower)
        .style("left", event.pageX + 70 + "px")
        .style("top", event.pageY + "px");
      select(this)
        .attr("r", function (circleRadius) {
          // console.log("i values", circleRadius.cylinders)
          return 7 * Math.exp(circleRadius.horsepower / 100);
        })
        .style("stroke", function (circleRadius) {
          return circleRadius.horsepower <= 100 ? "#7BCCB5" : "blue";
        })
        .style("stroke-width", 10)
        .style("opacity", 0.3);
    };
    let mousemove = function (d) {
      Tooltip.html("The exact value of<br>this cell is: " + d.horsepower)
        .style("left", event.pageX + 70 + "px")
        .style("top", event.pageY + "px");
    };
    let mouseleave = function (d) {
      Tooltip.style("opacity", 0);
      select(this)
        .attr("r", function (circleRadius) {
          // console.log("i values", circleRadius.cylinders)
          return 5 * Math.exp(circleRadius.horsepower / 100);
        })
        .style("stroke", "none")
        .style("opacity", 0.8);
    };

    let response2 = await fetch(
      "https://run.mocky.io/v3/35effb46-6d36-4026-9695-e573f6c90248"
    );
    data = await response2.json();
    data = data.slice(0, 25);

    const xValue1 = function (circleRadius) {
        return circleRadius.horsepower;
      },
      yValue1 = function (circleRadius) {
        return circleRadius.name;
      };

    const xScale1 = scaleLinear()
      .domain(extent(data, xValue1))
      // .domain([0, Math.max(...data.map((o) => o.horsepower))])
      .range([0, innerWidth]);

    const yScale2 = scaleBand()
      .domain(data.map((d) => d.name))
      .range([innerHeight, 0]);

    let sim = d3.forceSimulation(data);
    sim.force("collision", d3.forceCollide()); // Repulsion force
    // .attr('cy', d => yScale(yValue(d)))
    // .attr('cx', d => xScale(xValue(d)))
    sim.force(
      "x_force",
      d3.forceX((d) => xScale1(xValue1(d)))
    ); // Each point attacted to its center x and y
    sim.force(
      "y_force",
      d3.forceY((d) => yScale2(yValue1(d)))
    );
    sim.on("tick", render()); // Redraws scatterplot at every simulation "tick"

    sim.alpha(1);
    sim.restart();
    // this.heySim = sim;
    // console.log("hey", this.heySim);
    // sim.stop(); // Simulation is off initially
    // render();
  }
}

//GRAPH 2
class D3BarChart {
  async myData(user) {
    script.marks_data = [];
    script.allData = [];
    script.allData = user;
    this.marks_data = user.marks;
    var max = Math.max(...user.map((o) => o.marks));
    script.max = max;
    // console.log("new datasss", script.newdata);

    script.allData.forEach((element) => {
      script.marks_data.push(element.marks);
    });
    document.getElementById("chkgraph").innerHTML = "";
    this.makegraph();
  }

  makegraph() {
    script.count += 1;
    const bar_color = "black";
    const svgHeight = 300,
      barPadding = 30,
      barWidth = script.svgWidth / script.allData.length,
      //y scale
      yScale = scaleLinear().domain([0, script.max]).range([0, svgHeight]),
      yScale1 = scaleLinear().domain([0, script.max]).range([svgHeight, 0]),
      y_axis = axisLeft().scale(yScale1),
      //X scale
      margin = { top: 10, right: 100, bottom: 50, left: 25 },
      xScale = scaleBand()
        .range([margin.left, barWidth * script.allData.length + 30])
        .domain(script.allData.map((d) => d.testName));
    // console.log("width is ", script.svgWidth);

    const x_axis = axisBottom(xScale),
      xAxisTranslate = svgHeight + 10;

    const xGridLine = axisBottom(xScale)
      .scale(xScale)
      .tickSize(svgHeight, 0, 0)
      .tickFormat("");

    // .ticks(10);
    var yGridLine = axisLeft(yScale1)
      .scale(yScale1)
      .tickSize(-script.svgWidth, 0, 0)
      .tickFormat("");

    // For making the svg
    const svg = select("#chkgraph")
      .append("svg")
      .attr("viewBox", `0 0 ${script.svgWidth + 50} ${svgHeight + 100}`);

    //drawing y axis
    svg.append("g").attr("transform", "translate(25,0)").call(y_axis),
      //Xaxis DRAW

      // svg.selectAll("*").remove();
      svg
        .append("g")
        .attr("transform", "translate(0," + xAxisTranslate + ")")
        .call(x_axis)
        .selectAll("text")
        .style("text-anchor", "end")
        .style("color", "black")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg
      .append("g")
      .classed("gridLine", true)
      .attr("transform", "translate(25,0)")
      .style("color", "grey")
      .attr("opacity", "0.5")
      .call(yGridLine);

    svg
      .append("g")
      .classed("gridLine", true)
      .attr("transform", "translate(0,0)")
      .style("color", "grey")
      .attr("opacity", "0.5")
      .call(xGridLine);

    svg
      .selectAll("rect")
      .data(script.marks_data, (d) => d)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth)
      .attr("y", function (p) {
        return svgHeight - yScale(p);
      })
      .attr("height", function (d) {
        return yScale(d);
      })
      .attr("width", barWidth - barPadding)
      .attr("fill", bar_color)
      .attr("transform", "translate(40,0)") //mose over start
      .on("mouseover", function (marks_data, i) {
        tooltip.html(`Marks: ${marks_data}`).style("visibility", "visible");
        select(this).attr("fill", "#666666");
      })
      .on("mousemove", function () {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
        select(this).attr("fill", bar_color);
      });

    //Line chart
    var g = svg
      .append("g")
      .attr("transform", "translate(" + barWidth / 2 + "," + 0 + ")");
    var x = xScale,
      y = yScale1,
      line = d3Line
        .line()
        .x(function (d) {
          return x(d.testName);
        })
        .y(function (d) {
          // console.log(d.marks);
          return y(d.marks);
        });
    // .curve(curveBasis);

    var path = g
      .append("path")
      .datum(script.allData)
      .attr("fill", "none")
      .attr("stroke", "#79BAC5")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2.5)
      .attr("d", line);
    // g.selectAll("path").datum(this.allData)

    const tooltip = select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "#56ecb2")
      .style("border-radius", "5px")
      .style("color", "#fff")
      .text("a simple tooltip");
    console.log(script.count);
    // rect.exit().remove();
    // svg.selectAll("rect > *").remove();
  }
}

//GRAPH 3
class piePlot {
  pieGraph() {
    const svgHeight = 300,
      radius = Math.min(script.svgWidth, svgHeight) / 2;
    console.log("radius is", radius);
    console.log("pie data", script.pie_data);

    const svg = select("#pieChart")
      .append("svg")
      // .append("svg")
      .attr("viewBox", `0 0 ${script.svgWidth} ${svgHeight + 20}`);
    // .style("background-color", "pink");

    const g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + (radius + 20) + "," + (radius + 10) + ")"
      );

    // var color = scaleOrdinal(d3.schemeCategory10);
    let colorScale = scaleOrdinal()
      .domain(script.pie_data.map((d) => d.platform))
      .range(["#FFC145", "#33A02C", "#3379B3"]);

    const pies = d3Line.pie().value(function (d) {
      console.log(d.percentage);

      return d.percentage;
    });
    //SHADOW
    var defs = svg.append("defs");

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 2)
      .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const path = d3Line.arc().outerRadius(radius).innerRadius(70);
    //  console.log("ok");

    const arc = g
      .selectAll("arc")
      .data(pies(script.pie_data))
      .enter()
      .append("g")
      .style("filter", "url(#drop-shadow)");
    arc
      .append("path")
      .attr("d", path)

      .attr("fill", function (d) {
        return colorScale(d.data.percentage);
      })
      .on("mouseover", function (d, i) {
        console.log("doneeee");
        tooltip
          .html(`Percentage: ${d.data.percentage}`)
          .style("visibility", "visible");
        console.log("percent is", d);
        select(this).attr("fill", "#fffff");
      })

      .on("mousemove", function () {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
        select(this).attr("fill", function (d) {
          return colorScale(d.data.percentage);
        });
      });

    let sum = 0;
    script.pie_data.forEach((x) => {
      sum += x.percentage;
    });

    console.log("summis", sum);
    // console.log(total);
    svg
      .append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("style", "font-family:Poppins")
      .attr("font-size", "20")
      .attr("fill", "#696969")
      .attr(
        "transform",
        "translate(" + (radius + 20) + "," + (radius - 10) + ")"
      )
      .text("Total Tests:");

    svg
      .append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("style", "font-family:Poppins")
      .attr("font-size", "20")
      .attr("fill", "#696969")
      .attr(
        "transform",
        "translate(" + (radius + 20) + "," + (radius + 20) + ")"
      )
      .text(` ${sum} `);

    const tooltip = select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "15px")
      .style("background", "#56ecb2")
      .style("border-radius", "5px")
      .style("color", "#fff")
      .text("a simple tooltip");
  }
}

//GRAPH 4
class scatterplot_rect {
  async scatterGraph(data) {
    const scatterPlots = (selection, props) => {
      const { xValue, yValue, margin, width, height, data } = props;
      // console.log("Radius is",circleRadius)
      console.log("width is", script.svgWidth);
      const innerWidth = script.svgWidth - margin.left - margin.right;
      const innerHeight = 350 - margin.top - margin.bottom;

      // const xScale = scaleBand().domain(data.map((d) => d.name)).range([0, innerWidth])
      const xScale = scaleLinear()
        .domain(extent(data, xValue))
        // .domain([0, 8])
        .range([0, innerWidth])
        .nice();
      // .domain(extent(data, xValue))
      // .range([0, innerWidth])
      // .nice();

      const xScale1 = scaleLinear()
        .domain([0, 8])
        .range([0, innerWidth])
        .nice();

      const yScale = scaleBand()
          .domain(data.map((d) => d.name))
          .range([innerHeight, 0]),
        yScale1 = scaleLinear().domain([0, 8]).range([0, innerHeight]).nice(),
        y_axis = axisLeft().scale(yScale1);
      // const yScale = scaleLinear();Q
      // yScale.domain(extent(data, yValue));
      // yScale.range([innerHeight, 0]);
      // yScale.nice();

      const x_axis = axisBottom(xScale),
        xAxisTranslate = 300;

      const xGridLine = axisBottom(xScale1)
        .scale(xScale1)
        .tickSize(innerHeight, 0, 0)
        .tickFormat("");

      var yGridLine = axisLeft(yScale1)
        .scale(yScale1)

        // .tickPadding(5)
        .tickSize(-innerWidth)

        .tickFormat("");

      let g4 = svg_4
        .append("g")
        .attr("transform", "translate(" + 30 + "," + -10 + ")");

      svg_4
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(25,0)");
      // .call(y_axis)

      // svg_1.select(".x.axis").call(x_axis);
      //   svg_1.select(".x.axis").remove();

      svg_4
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(20," + xAxisTranslate + ")");
      // .call(x_axis)

      svg_4
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(25,5)")
        .style("color", "grey")
        .attr("opacity", "0.5")
        .call(yGridLine);

      svg_4
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(25,5)")
        .style("color", "grey")
        .attr("opacity", "0.5")
        .call(xGridLine);

      // console.log("each radiussss ",circleRadius )
      const rects = g4.selectAll("rect").data(data);
      rects
        .enter()
        .append("rect")
        //       .attr('x', 100)
        // .attr('y', 0)
        .attr("width", function (circleRadius) {
          return 15 * Math.log(circleRadius.mpg);
        })
        .attr("height", function (circleRadius) {
          return 10 * Math.log(circleRadius.mpg);
        })

        // .style("padding", "50px")
        .on("mouseover", mouseover)
        .on("mousemove", function () {
          Tooltip.style("top", event.pageY - 10 + "px").style(
            "left",
            event.pageX + 5 + "px"
          );
        })
        .on("mouseleave", mouseleave)
        .attr("fill", function (circleRadius) {
          return circleRadius.horsepower <= 100 ? "#308D85" : "#E74B1D";
        })
        .attr("opacity", 0.7);

      // .on("mouseover", mouseover)
      // .on("mousemove", mousemove)
      // .on("mouseleave", mouseleave);

      svg_4
        .selectAll("rect")
        // .style("padding", "50px")
        .transition()
        .duration(2000)
        .delay((d, i) => i * 10)
        .attr("y", (d) => yScale(yValue(d)))
        .attr("x", (d) => xScale(xValue(d)));
    };

    const svg_4 = select("#rect_scatter")
      .append("svg")
      .attr("viewBox", `0 0 ${script.svgWidth} 350`);
    // .style("background-color", "red")

    //  const height =  +svg.attr('height');

    function render() {
      svg_4.call(scatterPlots, {
        xValue: function (circleRadius) {
          return circleRadius.horsepower;
        },
        yValue: function (circleRadius) {
          return circleRadius.name;
        },

        margin: { top: 10, right: 20, bottom: 10, left: 50 },
        // width,
        // height,
        data,
      });

      console.log("render", data);
    }

    var Tooltip = select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    let mouseover = function (d) {
      Tooltip.style("opacity", 1)
        .style("visibility", "visible")
        .html("The exact value of<br>this cell is: " + d.horsepower)
        .style("left", event.pageX + 70 + "px")
        .style("top", event.pageY + "px");
      select(this)
        .attr("width", function (circleRadius) {
          return 15 * Math.log(circleRadius.horsepower);
        })
        .attr("height", function (circleRadius) {
          return 10 * Math.log(circleRadius.mpg);
        })
        .style("stroke", function (d) {
          return d.horsepower <= 100 ? "red" : "blue";
        })
        .style("opacity", 0.54);
    };
    let mousemove = function (d) {
      Tooltip.html("The exact value of<br>this cell is: " + d.horsepower)
        .style("left", event.pageX + 70 + "px")
        .style("top", event.pageY + "px");
    };
    let mouseleave = function (d) {
      Tooltip.style("opacity", 0);
      select(this)
        .attr("width", function (circleRadius) {
          return 15 * Math.log(circleRadius.mpg);
        })
        .attr("height", function (circleRadius) {
          return 10 * Math.log(circleRadius.mpg);
        })
        .style("stroke", "none")
        .style("opacity", 0.8);
    };
    /*
    // create a tooltip
  var Tooltip = select("#rect_scatter")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  let mouseover = function(d) {
    Tooltip
      .style("opacity", 1).style("visibility", "visible").html("The exact value of<br>this cell is: " + d.horsepower)
      .style("left", (event.pageX + 70) + "px") 
            .style("top", (event.pageY) + "px")
    select(this)
      .attr('r', function (circleRadius) {
          // console.log("i values", circleRadius.cylinders)
  return 7*(Math.exp(circleRadius.horsepower /100));
        })
      .style("stroke", function (circleRadius) { return circleRadius.horsepower <= 100 ? 'red' : 'blue' })
      .style("opacity", 0.54)
  };
  let mousemove = function(d) {
    Tooltip
      .html("Thess exact value of<br>this cell is: " + d.horsepower)
      .style("left", (event.pageX + 70) + "px") 
            .style("top", (event.pageY) + "px")
  }
  let mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    select(this)
      .attr('r', function (circleRadius) {
          // console.log("i values", circleRadius.cylinders)
  return 5*(Math.exp(circleRadius.horsepower /100));
        })
      .style("stroke", "none")
      .style("opacity", 0.8)
  }
    
  */

    const response3 = await fetch(
      "https://run.mocky.io/v3/35effb46-6d36-4026-9695-e573f6c90248"
    );
    data = await response3.json();
    data = data.slice(0, 100);
    render();
  }
}

//GRAPH 5
class treeGraph {
  async pieGraph(classes) {
    // console.log(classes);
    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "black");

    const diameter = script.svgWidth,
      radius = diameter / 2,
      innerRadius = radius - 450;

    let cluster = d3.cluster().size([360, innerRadius]);

    let line = d3
      .lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius(function (d) {
        // console.log("ddddddddddddd", d);
        return d.y;
      })
      .angle(function (d) {
        return (d.x / 180) * Math.PI;
      });

    let svg = d3
      .select("div#container")
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `-${script.svgWidth / 2} -450 ${script.svgWidth} 900`)
      .classed("svg-content", true);
    // .style("background-color", "pink");

    svg
      .selectAll("circle")
      .data(classes)
      .enter()
      .append("circle")
      .style("stroke", "#FED074")
      .style("stroke-width", "4px")

      .style("fill", "#FFE5B4")
      .attr("fill-opacity", "50%")
      .attr("r", innerRadius)
      .attr("cx", 0)
      .attr("cy", 0);
    svg
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    let link = svg.append("g").selectAll(".link"),
      node = svg.append("g").selectAll(".node");

    let root = packageHierarchy(classes).sum(function (d) {
      return d.size;
    });

    console.log("root size", root);
    cluster(root);

    console.log("leaves", root.leaves());
    link = link
      .data(packageImports(root.leaves()))
      .enter()
      .append("path")
      .each(function (d) {
        (d.source = d[0]), (d.target = d[d.length - 1]);
      })
      .attr("class", "link")
      .attr("d", line);

    node = node.data(root.leaves());

    console.log("root", node);
    node
      .enter()
      .append("a")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .append("text")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .attr("transform", function (d) {
        return (
          "rotate(" +
          (d.x - 90) +
          ")translate(" +
          (d.y + 8) +
          ",0)" +
          (d.x < 180 ? "" : "rotate(180)")
        );
      })
      .attr("text-anchor", function (d) {
        return d.x < 180 ? "start" : "end";
      })

      .text(function (d) {
        return d.data.name;
        // return d.data.key;
      })
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted);

    function mouseovered(d, i) {
      // console.log("mousemoved", i);
      link
        .classed("link--target", function (l) {
          if (l.target === i) {
            // console.log("targeett", l.target);
            return (l.source.source = true);
          }
        })
        .classed("link--source", function (l) {
          if (l.source === i) return (l.target.target = true);
        })

        .filter(function (l) {
          return l.target === i || l.source === i;
        })

        .raise();

      node
        .classed("node--target", function (n) {
          return n.target;
        })
        .classed("node--source", function (n) {
          return n.source;
        });

      div.transition().duration(200).style("opacity", 0.9);
    }

    function mouseouted() {
      // console.log(d);
      link.classed("link--target", false).classed("link--source", false);

      node.classed("node--target", false).classed("node--source", false);
      div.transition().duration(500).style("opacity", 0);
    }

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
      let map = {};

      function find(name, data) {
        let node = map[name],
          i;
        if (!node) {
          node = map[name] = data || { name: name, children: [] };
          if (name.length) {
            node.parent = find(name.substring(0, (i = name.lastIndexOf("."))));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach(function (d) {
        find(d.name, d);
      });

      return d3.hierarchy(map[""]);
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
      let map = {},
        imports = [];

      // Compute a map from name to node.
      nodes.forEach(function (d) {
        map[d.data.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function (d) {
        if (d.data.imports)
          d.data.imports.forEach(function (i) {
            imports.push(map[d.data.name].path(map[i]));
          });
      });

      return imports;
    }
  }
}
// eslint-disable-next-line no-redeclare
export { D3BarChart, scatterplot, scatterplot_rect, piePlot, treeGraph };
