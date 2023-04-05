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
  // console.log("CALL CALL CALL");
};
let script = {
  name: "BarCharts",
  allData: [],
  barData: [],
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
    // console.log("jss", data.topicData.length)
    let datapoints = data.topicData;
    var width = 670;
    let count = 0,
      countneg = 0;
    for (let i = 0; i < data.topicData.length; i++) {
      if (data.topicData[i].uniqueTotalCandidates > 0) {
        count++;
      } else {
        countneg++;
      }
    }
    // console.log("count is", count, "and", countneg)
    if (count <= 80) {
      let height = 280;
      makescattergraph(height);
    } else if (count <= 160) {
      let height = 450;
      makescattergraph(height);
    } else if (count <= 250) {
      let height = 650;
      makescattergraph(height);
    } else {
      let height = 900;
      makescattergraph(height);
    }

    //  var width = 650,
    //   height = 500;

    function makescattergraph(height) {
      var svg = d3
        .select("#graph1")
        .append("svg")
        // .attr("height", height)
        // .attr("width", width)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
        // .style("background-color", "black")
        .append("g")
        .attr("transform", "translate(0 , 0)");

      var defs = svg.append("defs");
      defs
        .append("pattern")
        .attr("id", "Beyonce")
        .attr("height", "100%")
        .attr("width", " 100%")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none");

      // var radiusScale = (d3.scaleSqrt().domain([1, 300]).range([0, 50]));
      var radiusScale = d3
        .scaleSqrt()
        .domain(
          extent(datapoints, function (d) {
            return d.uniqueTotalCandidates;
          })
        )
        .range([0, 35]);
      const xScale = scaleLinear().domain([0, 500]).range([50, width]);

      var forceXCombine = d3.forceX(width / 3).strength(0.05);
      var forceCollide = d3.forceCollide(function (d) {
        return radiusScale(d.uniqueTotalCandidates) + 2;
        // add mpg
      });
      var simulation = d3
        .forceSimulation()
        .force("x", forceXCombine)
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", forceCollide);

      //api caling
      // let response3 = await fetch(
      //   // "https://run.mocky.io/v3/dbd4f859-0a26-461d-a9b7-f81983c14ea4"
      //   "https://run.mocky.io/v3/35effb46-6d36-4026-9695-e573f6c90248"
      // );

      // let datapoints = await response3.json();
      // datapoints = datapoints.slice(0, 25);
      // console.log("datapoints", datapoints);
      defs
        .selectAll(".artist-pattern")
        .data(datapoints)
        .enter()
        .append("pattern")
        .attr("class", "artist-pattern")
        .attr("height", "100%")
        .attr("width", "100%")
        .append("height", 1)
        .append("width", 1)
        .attr("preserveAspectRatio", "none");

      var circles = svg
        .selectAll(".artist")
        .data(datapoints)
        .enter()
        .append("circle")
        .attr("class", "artist")
        .attr("r", function (d) {
          // console.log("ddd", d.uniqueTotalCandidates, "and" , (radiusScale(d.uniqueTotalCandidates)%100) )
          return radiusScale(d.uniqueTotalCandidates);
          // add mpg
        })
        .attr("fill", function (d) {
          return d.active ? "#8676FF" : "#BCCBB1";
        });
      //
      simulation.nodes(datapoints).on("tick", ticked);

      function ticked() {
        circles
          .attr("cx", function (d) {
            // console.log(d)
            return xScale(d.x);
            // return(d.x);
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .on("mouseover", mouseover)
          //   .on("mousemove", function () {
          //     Tooltip.style("top", event.pageY - 10 + "px").style(
          //       "left",
          //       event.pageX + 10 + "px"
          //     );
          //   })
          .on("mouseleave", mouseleave);
      }

      // create a tooltip

      var Tooltip = select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        // .style("border", "solid")
        // .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");
      // Three function that change the tooltip when user hover / move / leave a cell
      let mouseover = function (d, datapoints) {
        // console.log(datapoints.uniqueTotalCandidates)
        Tooltip.style("opacity", 1)
        .style("visibility", "visible")
        .html(

          `<div class="scatter-main">
          <div class="scatter-header">Topic name</div> 
          <div id='tipDiv'></div>
     <div class="scatterbody-content"> 
     <div class="d-flex ">
     <div style="width:5%"><img src='https://raw.githubusercontent.com/sandeepss2020/vue-d3-charts/master/Group%2056415.svg'></img></div>
     <div  style="width:85%">
     <div class="scatter-texthead">Tests</div>
     <div class="scatter-textbody">  Lorem ipsum dolor sit amet consectetur adipisicing </div>
     </div>
     <div style="width:10%" class="scatter-testnum">${datapoints.uniqueTotalCandidates} </div>
     </div>
    <div>`
        )
          .style("left", event.pageX + 20 + "px")
          .style("top", event.pageY + "px");
        select(this)
          .attr("r", function (d) {
            return radiusScale(d.uniqueTotalCandidates + 5);
            // add mpg
          })
          .style("stroke", function (d) {
            return d.active ? "#bcb4fe" : "#D0DFC5";
          })
          .style("stroke-width", 5);
        // .style("opacity", 0.3);
        Tooltip.style("display", "inline-block");
      };

      var tipSVG = select("#tipDiv")
        .append("div")
        .attr("width", 220)
        .attr("height", 55)
        .style("background-color", "red");

      let mouseleave = function (d) {
        Tooltip.style("opacity", 0);
        select(this)
          .attr("r", function (d) {
            return radiusScale(d.uniqueTotalCandidates);
            // add mpg
          })
          .style("stroke", "none")
          .style("opacity", 0.8);
        Tooltip.style("display", "none");
      };
    }
  }
}

// #Changed Code
// class D3BarChart {
//   async myData(user) {
//     script.marks_data = [];
//     let fullbarData =
//     script.allData = user;
//     // script.marks_data = user.count;
//     var max = Math.max(...user.map((o) => o.count));
//     script.max = max;
//     script.allData.forEach((element) => {
//       script.marks_data.push(element.count);
//     });
//     document.getElementById("barchartGraph").innerHTML = "";

//     //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
//     this.makegraph();
//   }

//   makegraph() {
//         // console.log("users",script.max)

//     // console.log("lennn", len)
//     const rectWidth = 50;
//     const svgHeight = 250,
//       barWidth = 20

//     let len = script.allData.length * (rectWidth) ;
//     let margin = { top: 10, right: 10, bottom: 35, left: 15 },
//       height = svgHeight - margin.bottom,
//       width = len ;
//     // For making the svg
//     const svg1 = select("#barchartGraph")
//       .append("svg")
//       .attr("height", svgHeight)
//       .attr("width", len + 50);
//       // .style("background-color", "red");

//     //SCALES START

//     const xScale = scaleBand()
//       .domain(script.allData.map((d) => d.x_axis))        //variable1??
//       .range([0, len]);
//       // .padding(0),

//     // variable2??
//     const yScale = scaleLinear().domain([0, script.max]).range([0, svgHeight - margin.bottom - margin.top]);
//     const yScale1 = scaleLinear().domain([0, script.max]).range([svgHeight - margin.bottom, 0]);

//     const x_axis = axisBottom(xScale)
//         .tickSize(-svgHeight),
//       xAxisTranslate = svgHeight - margin.bottom + 5;

//     const y_axis = axisLeft(yScale1)
//       .tickSize(-width)
//        .ticks((script.max+5)/5);

//     const g =  svg1
//       .append("g")
//       .attr("transform", "translate(" + 30 + "," +xAxisTranslate + ")")
//     // .attr("transform","translate(150,150)");
//     g.append("g")
//       .attr("class", "bar-x-axis").call(x_axis)
//         .selectAll("text")
//         .style("text-anchor", "end")
//       .style("color", "#A3A3A3")
//       .style("font","Roboto")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//       // .attr("transform", "rotate(-30)");
//       .attr("transform", "rotate(-15)");

//     svg1.append("g").attr("class", "bar-x-axis").attr("transform", "translate(30,0)")
//       .call(y_axis)
//     .selectAll("text")
//         .style("text-anchor", "end")
//       .style("color", "#A3A3A3")
//       .style("font","Roboto")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")

//     //  const xGridLine = axisBottom()
//     //   .scale(xScale)
//     //   .tickSize(svgHeight-25, 0, 0)
//     //   .tickFormat("");

//     //    svg1
//     //   .append("g")
//     //   .classed("gridLine", true)
//     //   .attr("transform", "translate(15,0)")
//     //   .style("color", "#F0F0F0")
//     //   .attr("opacity", "0.5")
//     //   .call(xGridLine);

//     //SCALES END
//     const t = select("svg1").transition().duration(2000);

//      const g1 =  svg1
//       .append("g")
//       .attr("transform", "translate(" + 25 + ","+ 0 + ")")

//     const rect =
//       g1.selectAll("rect")
//       .data(script.marks_data, (d) => d)
//       .join(
//         (enter) => {
//           const rect = enter
//             .append("rect")
//             .attr("width", rectWidth-barWidth)
//             .attr("stroke-width", 3)
//             // .attr("stroke", "#7E857E")
//             .attr("stroke", "#88888E")

//             .attr("fill", "#514B4B")
//             // overwrite the default so the animation looks better:
//             .attr("x", (d, i) => i * rectWidth)
//             .attr("y", function (p) {

//              return  height;
//             })

//             .attr("height", function (d) {
//               // return yScale(d);
//               return 0

//             })     .attr("transform", "translate(" + margin.left + "," + 0 + ")")
//     //mose over start
//       .on("mouseover", function (marks_data, i) {
//         tooltip
//           .style("top", event.pageY - 10 + "px")
//           .style("left", event.pageX + 10 + "px").html(`Marks: ${marks_data}`).style("visibility", "visible");
//         select(this).attr("fill", "#666666");

//         //tryyyy
//         /*
//          svg1
//             .append("circle")
//             .attr("cx", (d) => xScale(d) + 20)
//             .attr("cy", (d) =>
//               yScale1(d)
//             )
//             .attr("r", 4)
//             .attr("fill", "#3379B3")
//             .attr("stroke-width", function() {
//               return 2;
//             })
//             .attr("stroke", "white");
//           tooltip.style("left", i.pageX + "px");
//           tooltip.style("top", i.pageY - 87 + "px");
//           tooltip.style("display", "inline-block");
//             */
//         //end
//       })
//       .on("mousemove", function () {
//         tooltip
//           // tooltip.html(``).style("visibility", "hidden");
//       })
//       .on("mouseout", function () {
//         tooltip.html(``).style("visibility", "hidden");
//         select(this).attr("fill", "#514B4B");
//         // tooltip.remove()
//       });

//             // .attr("transform", "translate(25," + 0 + ")");

//           return rect;
//         },
//         (update) => update,
//         (exit) => {
//           exit
//             .transition(t)
//             .attr("y", function (p) {

//               return svgHeight - margin.bottom - yScale(p);
//             })
//               .attr("height", 0)
//             .remove();
//         }
//       )
//       // animate enter + update selection
//         .transition()
//         .duration(2000)
//       .delay((d, i) => i * 10)
//       .attr("x", (d, i) => i * rectWidth)
//         .attr("y", function (p) {

//         return  height - yScale(p);
//       })
//       .attr("height", function (d) {
//               return yScale(d);
//       })
//       .attr("width", rectWidth- barWidth)

//     // //Line chart
//       var x = xScale,
//       y = yScale1,
//       line = d3Line
//         .line()
//         .x(function (d) {
//           return x(d.x_axis);
//         })
//         .y(function (d) {
//           return y(d.count);
//         });
//     // .curve(curveBasis);

//     const g2 = svg1
//       .append("g")
//       .attr("transform", "translate(" + 55 + "," + 0 + ")");
//     const path = g2
//       .append("path")
//       .datum(script.allData)
//       .attr("fill", "none")
//       .attr("stroke", "#79BAC5")
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-linecap", "round")
//       .attr("stroke-width", 1)
//       .attr("d", line);

//     const tooltip = select("body")
//       .append("div")
//       .attr("class", "d3-tooltip")
//       .style("position", "absolute")
//       .style("z-index", "10")
//       .style("visibility", "hidden")
//       .style("padding", "15px")
//       .style("background", "#56ecb2")
//       .style("border-radius", "5px")
//       .style("color", "#fff")
//       .text("a simple tooltip");
//     // console.log(script.count);
//     // rect.exit().remove();
//     // svg.selectAll("rect > *").remove();

//     // console.log(chartcontainer)
//     // chartcontainer.scrollLeft;

//   }

// }

class D3BarChart {
  async myData(user, max_val, allBarData, xScaleDomain, barColor) {
    // console.log("usserr", user)
    script.barData = [];
    script.allData = user;
    // script.marks_data = user.count;
    script.max = max_val;
    allBarData.forEach((element) => {
      script.barData.push(element);
    });
    document.getElementById("barchartGraph").innerHTML = "";

    //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
    this.makegraph(xScaleDomain, barColor);
  }

  makegraph(xScaleDomain, barColor) {
    // console.log("users",script.max)

    // console.log("lennn", len)
    const rectWidth = 50;
    const svgHeight = 250,
      barWidth = 20;

    let len = script.allData.length * rectWidth;
    let margin = { top: 5, right: 10, bottom: 35, left: 15 },
      height = svgHeight - margin.bottom,
      width = len;
    // For making the svg
    const svg1 = select("#barchartGraph")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", len + 50);
    // .style("background-color", "red");

    //SCALES START

    // let var1 = script.allData.map((d) => d.x_axis)
    // console.log("vaaarrr1",var1)
    let xScale = scaleBand()
      .domain(xScaleDomain) //variable1??
      .range([0, len]);
    // .padding(0),

    // variable2??
    const yScale = scaleLinear()
      .domain([0, script.max])
      .range([0, svgHeight - margin.bottom - margin.top]);
    const yScale1 = scaleLinear()
      .domain([0, script.max])
      .range([svgHeight - margin.bottom, 5]);

    const x_axis = axisBottom(xScale).tickSize(-height),
      xAxisTranslate = svgHeight - margin.bottom + 5;

    const y_axis = axisLeft(yScale1)
      .tickSize(-width)
      // .ticks(script.max <= 10 ? script.max
      //   : script.max <= 29 ? (script.max + 5) / 5
      //     : script.max <= 25 || ?);
      .ticks(script.max >= 350 ? script.max / 70 : 5);

    const g = svg1
      .append("g")
      .attr("transform", "translate(" + 30 + "," + xAxisTranslate + ")");
    // .attr("transform","translate(150,150)");
    g.append("g")
      .attr("class", "bar-x-axis")
      .call(x_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      // .attr("transform", "rotate(-30)");
      .attr("transform", "rotate(-15)");

    svg1
      .append("g")
      .attr("class", "bar-x-axis")
      .attr("transform", "translate(30,0)")
      .call(y_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .attr("dx", "-.8em")
      .attr("dy", ".15em");

    //  const xGridLine = axisBottom()
    //   .scale(xScale)
    //   .tickSize(svgHeight-25, 0, 0)
    //   .tickFormat("");

    //    svg1
    //   .append("g")
    //   .classed("gridLine", true)
    //   .attr("transform", "translate(15,0)")
    //   .style("color", "#F0F0F0")
    //   .attr("opacity", "0.5")
    //   .call(xGridLine);

    //SCALES END
    const t = select("svg1").transition().duration(2000);

    const g1 = svg1
      .append("g")
      .attr("transform", "translate(" + 25 + "," + 0 + ")");

    const rect = g1
      .selectAll("rect")
      .data(script.barData, (d) => d)
      .join(
        (enter) => {
          const rect = enter
            .append("rect")
            .attr("width", rectWidth - barWidth)
            .attr("stroke-width", 2)
            // .attr("stroke", "#7E857E")
            .attr("stroke", "#88888E")

            .attr("fill", barColor)
            // overwrite the default so the animation looks better:
            .attr("x", (d, i) => i * rectWidth)
            .attr("y", function (p) {
              return height;
            })

            .attr("height", function (d) {
              // return yScale(d);
              return 0;
            })
            .attr("transform", "translate(" + margin.left + "," + 0 + ")")
            //mose over start
            .on("mouseover", function (barData, i) {
              tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
                .html(`${i}`)
                .style("visibility", "visible");
              select(this).attr("fill", "#666666");


              //tryyyy
              /*
                 svg1
                    .append("circle")
                    .attr("cx", (d) => xScale(d) + 20)
                    .attr("cy", (d) =>
                      yScale1(d)
                    )
                    .attr("r", 4)
                    .attr("fill", "#3379B3")
                    .attr("stroke-width", function() {
                      return 2;
                    })
                    .attr("stroke", "white");
                  tooltip.style("left", i.pageX + "px");
                  tooltip.style("top", i.pageY - 87 + "px");
                  tooltip.style("display", "inline-block");
                    */
              //end
            })
            .on("mousemove", function () {
              tooltip;
              // tooltip.html(``).style("visibility", "hidden");
            })
            .on("mouseout", function () {
              tooltip.html(``).style("visibility", "hidden");
              select(this).attr("fill", barColor);
              tooltip.style("display", "none");
            });

          // .attr("transform", "translate(25," + 0 + ")");

          return rect;
        },
        (update) => update,
        (exit) => {
          exit
            .transition(t)
            .attr("y", function (p) {
              return svgHeight - margin.bottom - yScale(p);
            })
            .attr("height", 0)
            .remove();
        }
      )
      // animate enter + update selection
      .transition()
      .duration(2000)
      .delay((d, i) => i * 10)
      .attr("x", (d, i) => i * rectWidth)
      .attr("y", function (p) {
        return height - yScale(p);
      })
      .attr("height", function (d) {
        return yScale(d);
      })
      .attr("width", rectWidth - barWidth);

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

    // rect.exit().remove();
    // svg.selectAll("rect > *").remove();

    // //Line chart

    function linechart1() {
      var x = xScale,
        y = yScale1,
        line = d3Line
          .line()
          .x(function (d) {
            // console.log("linexxx", x(d.x_axis))
            return x(d.x_axis);
          })
          .y(function (d) {
            // console.log("lineyyy", y(d.count))
            return y(d.count);
          });
      // .curve(curveBasis);

      const g2 = svg1
        .append("g")
        .attr("transform", "translate(" + 55 + "," + 0 + ")");
      const path = g2
        .append("path")
        .datum(script.allData)
        .attr("fill", "none")
        .attr("stroke", "#79BAC5")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1)
        .attr("d", line);
    }

    function linechart2() {
      var x = xScale,
        y = scaleLinear()
          .domain([0, script.max])
          .range([svgHeight - margin.bottom, 5]),
        line2 = d3Line
          .line()
          .x(function (d) {
            return x(d.x_axis);
          })
          // .y(function (d) {

          //   return y(d.count) ;
          // });
          .y(function (d) {
            return y(d.count);
          });
      //   function (d) {
      //   return yScale(d);
      // }
      // .curve(curveBasis);

      const g3 = svg1
        .append("g")
        .attr("transform", "translate(" + 55 + "," + 0 + ")");
      const path = g3
        .append("path")
        .datum(script.allData)
        .attr("fill", "none")
        .attr("stroke", "#79BAC5")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1)
        .attr("d", line2);
    }

    this.makegraph.linechart1 = linechart1;
    this.makegraph.linechart2 = linechart2;
  }
}

//GRAPH 3
class piePlot {
  pieGraph(id) {
    // console.log("pieee", id);
    const svgHeight = 250,
      radius = Math.min(script.svgWidth / 4, svgHeight) / 2;
    const start_point = script.svgWidth / 9;
    // console.log("pie data", script.pie_data);

    const svg = select(id)
      .append("svg")
      // .append("svg")
      .attr("viewBox", `0 0 ${script.svgWidth / 4} ${svgHeight}`)
      // .attr("width", script.svgWidth)
      .attr("height", svgHeight);
    // .style("background-color", "black");

    const g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + start_point + "," + svgHeight / 2 + ")"
      );
    // .attr("transform", `translate(${script.svgWidth / 4},${svgHeight / 2})`);
    // console.log("widthhh", script.svgWidth)
    // var color = scaleOrdinal(d3.schemeCategory10);
    let colorScale = scaleOrdinal()
      .domain(script.pie_data.map((d) => d.platform))
      .range(["#FFC145", "#33A02C", "#3379B3"]);

    const pies = d3Line.pie().value(function (d) {
      // console.log(d.percentage);

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
      .attr("stdDeviation", 1)
      .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", -2)
      .attr("dy", -2)
      .attr("result", "offsetBlur");

    // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    const path = d3Line
      .arc()
      .outerRadius(radius - 5)
      .innerRadius(60);
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
      });
    // .on("mouseover", function (d, i) {
    //   // console.log("doneeee");
    //   tooltip
    //     .html(`Percentage: ${d.data.percentage}`)
    //     .style("visibility", "visible");
    //   // console.log("percent is", d);
    //   select(this).attr("fill", "#F70D1A");
    // })

    // .on("mousemove", function () {
    //   tooltip
    //     .style("top", event.pageY - 10 + "px")
    //     .style("left", event.pageX + 10 + "px");
    // })
    // .on("mouseout", function () {
    //   tooltip.html(``).style("visibility", "hidden");
    //   select(this).attr("fill", function (d) {
    //     return colorScale(d.data.percentage);
    //   });
    // });

    let sum = 0;
    script.pie_data.forEach((x) => {
      sum += x.percentage;
    });

    // console.log("summis", sum);
    // console.log(total);
    svg
      .append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      // .attr("style", "font-family:Poppins")
      .style("font-family", "Poppins")
      .style("font-weight", "500")

      .attr("font-size", "18")
      .attr("fill", "#696969")
      .attr("transform", "translate(" + start_point + "," + (radius - 10) + ")")
      .text("Total Tests");

    svg
      .append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      // .attr("style", "font-family:Poppins")
      .style("font-family", "Poppins")
      .style("font-weight", "700")
      .attr("font-size", "20")
      .attr("fill", "#696969")
      .attr("transform", "translate(" + start_point + "," + (radius + 15) + ")")
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
      const { xValue, yValue, margin, width, height, data, widthvalue } = props;
      const innerWidth = script.svgWidth - margin.left - margin.right;
      const innerHeight = 340 - margin.top - margin.bottom;
      // console.log("llllll",data.groupsData)
      // const xScale = scaleBand().domain(data.map((d) => d.name)).range([0, innerWidth])
      // //to check the x scale original
      // const xScale = scaleLinear()
      //   .domain(extent(data.groupsData, xValue)) //????
      //   // .domain([0, 8])
      //   .range([0, script.svgWidth])
      //   .nice();
      const xScale = scaleLinear()
        .domain([0, 8])
        // .range([0, script.svgWidth])
        .range([innerHeight, 0])
        .nice();

      const xScale1 = scaleLinear()
        .domain([0, 8])
        .range([0, script.svgWidth])
        .nice();

      const yScale = scaleBand()
        .domain(data.groupsData.map((d) => d.groupName))
        .range([innerHeight, 0]);
      // .range([0, innerWidth]);

      const yScale2 = scaleLinear()
          .domain([0, data.groupsData.length])
          // .range([innerHeight, 0]),
          .range([0, innerWidth]),
        yScale1 = scaleLinear().domain([0, 8]).range([0, 340]).nice(),
        y_axis = axisLeft().scale(yScale1);

      const x_axis = axisBottom(xScale),
        xAxisTranslate = 350;

      const xGridLine = axisBottom(xScale1)
        .scale(xScale1)
        .tickSize(340, 0, 0)
        .tickFormat("");

      var yGridLine = axisLeft(yScale1)
        .scale(yScale1)

        // .tickPadding(5)
        .tickSize(-script.svgWidth)

        .tickFormat("");

      let g4 = svg_4
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");

      svg_4
        .append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0)");

      svg_4
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(20," + xAxisTranslate + ")");
      // .call(x_axis)

      svg_4
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(0,0)")
        .style("color", "grey")
        .attr("opacity", "0.5")
        .call(yGridLine);

      svg_4
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(0,0)")
        .style("color", "grey")
        .attr("opacity", "0.5")
        .call(xGridLine);

      // console.log("each radiussss ",circleRadius )
      const rects = svg_4.append("g").selectAll("rect").data(data.groupsData);
      rects
        .enter()
        .append("rect")
        .attr("x", innerWidth)
        .attr("y", innerHeight)
        .attr("width", function (d) {
          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage < 0.2) {
            return 8 * Math.exp(d.repeatingPercentage);
          } else if (d.repeatingPercentage < 0.5) {
            return 10 * Math.exp(d.repeatingPercentage);
          } else {
            return d.repeatingPercentage * 15;
          }

          // return 15 * d.repeatingPercentage;
          // return xScale3(x(d));
        })
        .attr("height", function (d) {
          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage < 0.2) {
            return 5 * Math.exp(d.repeatingPercentage);
          } else if (d.repeatingPercentage < 0.5) {
            return 7 * Math.exp(d.repeatingPercentage);
          } else {
            return d.repeatingPercentage * 10;
          }
        })
        .attr("fill", function (d) {
          return d.numberOfCandidates >= 50 ? "#308D85" : "#E74B1D";
          // return d.active ? "#E74B1D" : "#308D85"; // false
        })
        .attr("opacity", 0.7)

        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

      svg_4
        .selectAll("rect")
        // .style("padding", "50px")
        .transition()
        .duration(2000)
        .delay((d, i) => i * 5)
        // .attr("y", (d) => yScale(yValue(d)) )
        // .attr("x", (d) => xScale1(xValue(d)))
        .attr("y", (d) => yScale(yValue(d)))
        .attr("x", (d, i) =>
          yScale2(
            Math.floor(Math.random() * data.groupsData.length)
            // console.log(Math.floor(Math.random() * data.groupsData.length))
          )
        );
    };

    const svg_4 = select("#rect_scatter")
      .append("svg")
      // .attr("viewBox", `0 0 ${script.svgWidth} 350`)
      .attr("viewBox", `0 0 ${innerWidth} ${innerHeight}`);

    // .style("background-color", "red")

    //  const height =  +svg.attr('height');

    function render() {
      svg_4.call(scatterPlots, {
        xValue: function (d) {
          return d.repeatingPercentage;
        },
        yValue: function (d) {
          return d.groupName;
        },
        widthvalue: function (d) {
          return d.repeatingPercentage;
        },

        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        // width,
        // height,
        data,
      });

      // console.log("render", data);
    }

    var Tooltip = select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    let mouseover = function (d, datapoints) {
      // console.log(datapoints.numberOfTests)
      
      
      Tooltip.style("opacity", 1)
        .style("visibility", "visible")
        .html(

          `<div class="scatter-main">
          <div class="scatter2-header">Recruitment Group</div> 
          <div id='tipDiv'></div>
     <div class="scatterbody2-content"> 
     <div class="d-flex ">
     <div style="width:5%"><img src='https://raw.githubusercontent.com/sandeepss2020/vue-d3-charts/master/Group%2056416.svg'></img></div>
     <div  style="width:85%">
     <div class="scatter-texthead">Tagged Tests</div>
     <div class="scatter-textbody">  Lorem ipsum dolor sit amet consectetur adipisicing </div>
     </div>
     <div style="width:10%" class="scatter-testnum">${datapoints.numberOfTests} </div>
     </div>
    <div>`
        )
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY + "px");
      select(this)
        // .attr("width", function (d) {
        //   return 15 * d.repeatingPercentage;
        // })
        // .attr("height", function (d) {
        //   return 10 * d.repeatingPercentage;
        // })
        .style("stroke", function (d) {
          return d.repeatingPercentage <= 0.5 ? "red" : "blue";
        })
        .style("opacity", 0.54);
    };
    let mousemove = function (d, data) {
      Tooltip.html(
        "Number Of candidates are :  " +
          data.numberOfCandidates +
          ",," +
          data.repeatingPercentage
      )
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + 0 + "px");
    };
    let mouseleave = function (d) {
      Tooltip.style("opacity", 0);
      select(this)
        .attr("width", function (d) {
          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage < 0.2) {
            return 8 * Math.exp(d.repeatingPercentage);
          } else if (d.repeatingPercentage < 0.5) {
            return 10 * Math.exp(d.repeatingPercentage);
          } else {
            return d.repeatingPercentage * 15;
          }
        })
        .attr("height", function (d) {
          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage < 0.2) {
            return 5 * Math.exp(d.repeatingPercentage);
          } else if (d.repeatingPercentage < 0.5) {
            return 7 * Math.exp(d.repeatingPercentage);
          } else {
            return d.repeatingPercentage * 10;
          }
        })
        .style("stroke", "none")
        .style("opacity", 0.8);
      Tooltip.style("display", "none");
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

    // const response3 = await fetch(
    //   "https://run.mocky.io/v3/35effb46-6d36-4026-9695-e573f6c90248"
    // );
    // data = await response3.json();
    // data = data.slice(0, 100);
    render();
  }
}

// class scatterplot_rect {
//   async scatterGraph(data) {
//     data = data.groupsData
//     const margin = { top: 20, right: 20, bottom: 20, left: 50 };

//     const width = script.svgWidth - margin.left - margin.right;
//     const height = 340  ;
//     makeGraph();

//     function makeGraph() {
//       const svg_4 = select("#rect_scatter")
//         .append("svg")
//         .attr("preserveAspectRatio", "xMinYMin meet")
//         .attr("viewBox", `0 0 ${width} ${height}`)
//         .style("background-color", "black")
//       .append("g")
//         .attr("transform", "translate(0 , 0)");

//         // const g4 = svg_4.append("g")
//         // .attr("transform", "translate(0 , 0)");

//       var radiusScale1 = d3
//         .scaleLinear()
//         .domain(
//           extent(data, function (d) {
//                 // console.log("rects", d.repeatingPercentage)

//             return d.repeatingPercentage;
//           })
//         )
//         .range([0, 50]);

//       const xScale1 = scaleLinear().domain([0, data.length]).range([50, width]);
//             const yScale1 = scaleLinear().domain([0, height + 100]).range([0, height]);

//       var forceXCombine = d3.forceX(width/5).strength(0.05);
//       var forceCollide = d3.forceCollide(function (d) {
//          if (d.repeatingPercentage < 0.2) {
//             return radiusScale1(d.repeatingPercentage) + 6;
//           } else if(d.repeatingPercentage < 0.5) {
//             return radiusScale1(d.repeatingPercentage) + 4;
//         }
//          else {
//            return radiusScale1(d.repeatingPercentage) + 3;
//         }
//         // return radiusScale1(d.repeatingPercentage) + 10;
//         // add mpg
//       });
//       var simulation = d3
//         .forceSimulation()
//         .force("x", forceXCombine)
//         .force("y", d3.forceY(height / 2).strength(0.05))
//         .force("collide", forceCollide);

//       // const rects = svg.append("g").selectAll("rect").data(data.groupsData);
//       var rects = svg_4.
//         selectAll(".artist")
//         .data(data)
//         .enter()
//         .append("rect")
//         .attr("class", "artist")
//         .attr("x", width)
//         .attr("y", height)
//         .attr("width", function (d) {
//           if (d.repeatingPercentage < 0.5) {
//             return radiusScale1(d.repeatingPercentage * 6);
//           } else {
//             return radiusScale1(d.repeatingPercentage * 2);
//           }
//         })
//         .attr("height", function (d) {
//           if (d.repeatingPercentage < 0.5) {
//             return radiusScale1(d.repeatingPercentage * 4);
//           } else {
//             return radiusScale1(d.repeatingPercentage);
//           }

//         })
//         .attr("fill", function (d) {
//           return d.numberOfCandidates >= 50 ? "#308D85" : "#E74B1D";
//           // return d.active ? "#E74B1D" : "#308D85"; // false
//         })
//         .attr("opacity", 0.7);

//       simulation.nodes(data).on("tick", ticked);

//       function ticked() {
//         rects
//           .attr("x", function (d) {
//             // console.log(d)
//             return xScale1(d.x);
//             // return(d.x);
//           })
//           .attr("y", function (d) {
//             return yScale1( d.y);
//           })
//       }
//     }
//   }
// }

// const xScale = scaleBand().domain(data.map((d) => d.name)).range([0, innerWidth])
//     const xScale = scaleLinear()
//       .domain(extent(data.groupsData, xValue)) //????
//       // .domain([0, 8])
//       .range([0, script.svgWidth])
//       .nice();

//     const xScale1 = scaleLinear()
//       .domain([0, 8])
//       .range([0, script.svgWidth])
//       .nice();

//     const yScale = scaleBand()
//         .domain(data.groupsData.map((d) => d.groupName))
//         .range([innerHeight, 0]),
//       yScale1 = scaleLinear().domain([0, 8]).range([0, 340]).nice(),
//       y_axis = axisLeft().scale(yScale1);
//     // const yScale = scaleLinear();Q
//     // yScale.domain(extent(data, yValue));
//     // yScale.range([innerHeight, 0]);
//     // yScale.nice();

//     const x_axis = axisBottom(xScale),
//       xAxisTranslate = 350;

//     const xGridLine = axisBottom(xScale1)
//       .scale(xScale1)
//       .tickSize(340, 0, 0)
//       .tickFormat("");

//     var yGridLine = axisLeft(yScale1)
//       .scale(yScale1)

//       // .tickPadding(5)
//       .tickSize(-script.svgWidth)

//       .tickFormat("");

//     let g4 = svg_4
//       .append("g")
//       .attr("transform", "translate(" + 0 + "," + 0 + ")");

//     svg_4
//       .append("g")
//       .attr("class", "y axis")
//       .attr("transform", "translate(0,0)");
//     // .call(y_axis)

//     // svg_1.select(".x.axis").call(x_axis);
//     //   svg_1.select(".x.axis").remove();

//     svg_4
//       .append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(20," + xAxisTranslate + ")");
//     // .call(x_axis)

//     svg_4
//       .append("g")
//       .classed("gridLine", true)
//       .attr("transform", "translate(0,0)")
//       .style("color", "grey")
//       .attr("opacity", "0.5")
//       .call(yGridLine);

//     svg_4
//       .append("g")
//       .classed("gridLine", true)
//       .attr("transform", "translate(0,0)")
//       .style("color", "grey")
//       .attr("opacity", "0.5")
//       .call(xGridLine);

//     // console.log("each radiussss ",circleRadius )

//       .on("mouseover", mouseover)
//       .on("mousemove", mousemove)
//       .on("mouseleave", mouseleave);

//     svg_4
//       .selectAll("rect")
//       // .style("padding", "50px")
//       .transition()
//       .duration(2000)
//       .delay((d, i) => i * 10)
//       .attr("y", (d) => yScale(yValue(d)))
//       .attr("x", (d) => xScale1(xValue(d)));

//   var Tooltip = select("body")
//     .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "white")
//     .style("border", "solid")
//     .style("border-width", "2px")
//     .style("border-radius", "5px")
//     .style("padding", "5px");

//   // Three function that change the tooltip when user hover / move / leave a cell
//   let mouseover = function (d) {
//     Tooltip.style("opacity", 1)
//       .style("visibility", "visible")
//       .html("Number Of candidates are :  " + d.numberOfCandidates)
//       .style("left", event.pageX + 70 + "px")
//       .style("top", event.pageY + "px");
//     select(this)
//       .attr("width", function (d) {
//         return 15 * d.repeatingPercentage;
//       })
//       .attr("height", function (d) {
//         return 10 * d.repeatingPercentage;
//       })
//       .style("stroke", function (d) {
//         return d.repeatingPercentage <= 0.5 ? "red" : "blue";
//       })
//       .style("opacity", 0.54);
//   };
//   let mousemove = function (d) {
//     Tooltip.html("Number Of candidates are :  " + d.numberOfCandidates)
//       .style("left", event.pageX + 70 + "px")
//       .style("top", event.pageY + "px");
//   };
//   let mouseleave = function (d) {
//     Tooltip.style("opacity", 0);
//     select(this)
//       .attr("width", function (d) {
//         return 15 * d.repeatingPercentage;
//       })
//       .attr("height", function (d) {
//         return 10 * d.repeatingPercentage;
//       })
//       .style("stroke", "none")
//       .style("opacity", 0.8);
//   };
//   /*
//   // create a tooltip
// var Tooltip = select("#rect_scatter")
//   .append("div")
//   .style("opacity", 0)
//   .attr("class", "tooltip")
//   .style("background-color", "white")
//   .style("border", "solid")
//   .style("border-width", "2px")
//   .style("border-radius", "5px")
//   .style("padding", "5px")

// // Three function that change the tooltip when user hover / move / leave a cell
// let mouseover = function(d) {
//   Tooltip
//     .style("opacity", 1).style("visibility", "visible").html("The exact value of<br>this cell is: " + d.horsepower)
//     .style("left", (event.pageX + 70) + "px")
//           .style("top", (event.pageY) + "px")
//   select(this)
//     .attr('r', function (circleRadius) {
//         // console.log("i values", circleRadius.cylinders)
// return 7*(Math.exp(circleRadius.horsepower /100));
//       })
//     .style("stroke", function (circleRadius) { return circleRadius.horsepower <= 100 ? 'red' : 'blue' })
//     .style("opacity", 0.54)
// };
// let mousemove = function(d) {
//   Tooltip
//     .html("Thess exact value of<br>this cell is: " + d.horsepower)
//     .style("left", (event.pageX + 70) + "px")
//           .style("top", (event.pageY) + "px")
// }
// let mouseleave = function(d) {
//   Tooltip
//     .style("opacity", 0)
//   select(this)
//     .attr('r', function (circleRadius) {
//         // console.log("i values", circleRadius.cylinders)
// return 5*(Math.exp(circleRadius.horsepower /100));
//       })
//     .style("stroke", "none")
//     .style("opacity", 0.8)
// }

// */

//   // const response3 = await fetch(
//   //   "https://run.mocky.io/v3/35effb46-6d36-4026-9695-e573f6c90248"
//   // );
//   // data = await response3.json();
//   // data = data.slice(0, 100);
//   render();
// }
// }
// // GRAPH 5

class treeGraph {
  async dendoGram(classes) {
    // console.log(classes);
    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "black");

    // console.log("svgwidth is", script.svgWidth)
    const diameter = script.svgWidth,
      radius = diameter / 3 + 30,
      innerRadius = radius / 2;

    // console.log("Radius", radius, "Inner radiusss" , innerRadius)
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
      .select("#dendogram")
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
      .style("stroke-width", "5px")

      .style("fill", "#FFE5B4")
      .style("opacity", 0.1)
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

    // console.log("root size", root);
    cluster(root);

    // console.log("leaves", root.leaves());
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

    // console.log("root", node);
    node
      .enter()
      .append("a")
      .attr("class", "node")
      // .attr("dy", "0.31em")
      .append("text")
      .attr("class", "node")
      // .attr("dy", "0.31em")
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
        if (d.data.parentTag.length > 8) {
          return d.data.parentTag.substring(0, 5) + "...";
        } else {
          return d.data.parentTag;
        }
        // return d.data.parentTag;
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

      function find(parentTag, data) {
        let node = map[parentTag],
          i;
        if (!node) {
          node = map[parentTag] = data || { name: parentTag, children: [] };
          if (parentTag.length) {
            // console.log("okkk222",find(parentTag.substring(0, (i = parentTag.lastIndexOf("#")))))
            // node.parent = find(parentTag.substring(0, (i = parentTag.lastIndexOf("."))));
            node.parent = find(
              parentTag.substring(0, (i = parentTag.lastIndexOf("#")))
            );
            node.parent.children.push(node);
            node.key = parentTag.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach(function (d) {
        // console.log("name" , d.parentTag ,"and", d)
        find(d.parentTag, d);
      });

      return d3.hierarchy(map[""]);
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
      // console.log("nodesss2",nodes)

      let map = {},
        importss = [];

      // Compute a map from name to node.
      nodes.forEach(function (d) {
        map[d.data.parentTag] = d;
        // console.log("mapssdd",map)
      });

      // console.log("i2",map)
      // For each import, construct a link from the source to target node.
      nodes.forEach(function (d) {
        // console.log("kyaa yaar 2", d.data.imports)
        if (d.data.imports)
          d.data.imports.forEach(function (i, j) {
            // console.log("i",i)
            // console.log("hmmm",j , map[i])
            if (typeof map[i] === "undefined") {
              // console.log("haan g")
              return;
            } else {
              // for (let k = 0; k <= d.data.imports.length; k++) {
              // console.log("mappp",j, map[d.data.parentTag], "andd", map[i],"or",i)
              // console.log("break", d.data.imports.length)
              importss.push(map[d.data.parentTag].path(map[i]));
              // console.log("last i 2", importss)
            }
          });
      });

      return importss;
    }
  }
}

class reclinechart {
  //   async mygraph1(data) {

  //     // console.log("data is" , data)

  //     // this.dataForLineGraph = Object.keys(res.data.data);
  //     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  //     // const chartContainer = this.$refs.linechartContainer;
  //     const chartWidth = 400;
  //     const chartHeight = 150;
  //     const width = chartWidth - margin.left - margin.right;
  //     const height = chartHeight - margin.top - margin.bottom;
  //     if (this.lineGraphCreated === true) {
  //       d3.select("#recgraph1")
  //         .selectAll("g")
  //         .remove();
  //     }
  //     const svg = d3
  //       .select("#recgraph1")
  //       .append("svg")
  //       .attr("width", chartWidth)
  //       .attr("height", chartHeight)
  //       // .style("background-color", "black");

  //     const graph = svg
  //       .append("g")
  //       .attr("width", width)
  //       .attr("height", height)
  //       .attr("transform", `translate(${margin.left},${margin.top})`);

  //     // for y data
  //     const reverseData = data.map((d) => d.testName);
  //      const max = Math.max(...data.map((o) => o.totalCandidates));
  //     const xScale = d3
  //       .scaleLinear()
  //       // .padding(0.25)
  //       .domain([0, max])
  //       .range([0, width]);

  //     const xScale1 = d3
  //       .scaleLinear()
  //       // .padding(0.25)
  //       .domain([0, max])
  //       .range([width,0]);

  //     const yScale = d3.scaleBand().domain(reverseData).range([height,0]);
  //         // const yScale1 = d3.scaleBand().domain(reverseData).range([height,0]);

  //     const xAxisGroup = graph
  //       .append("g")
  //       .attr("transform", `translate(0,${height})`);
  //     const yAxisGroup = graph.append("g");

  //     const xAxis = d3.axisBottom(xScale).tickSize(-height);
  //     const yAxis = d3
  //       .axisLeft(yScale)
  //       .ticks(4)
  //       .tickSize(-width);
  //     xAxisGroup
  //       .call(xAxis)
  //       .style("color", "#A3A3A3")
  //       .selectAll("text")
  //       .attr("transform", "translate(0,10)");
  //     yAxisGroup.call(yAxis) .style("color", "#A3A3A3");

  //     const circles = graph.selectAll("circle").data(data);

  //     const gradient = svg
  //       .append("defs")
  //       .append("linearGradient")
  //       .attr("id", "bar-gradient")
  //       .attr("x1", "0%")
  //       .attr("y1", "0%")
  //       .attr("x2", "0%")
  //       .attr("y2", "100%");

  //     gradient
  //       .append("stop")
  //       .attr("offset", "0%")
  //       .attr("stop-color", "#ffffff");

  //     gradient
  //       .append("stop")
  //       .attr("offset", "100%")
  //       .attr("stop-color", "#97d9e1");

  //     var div = d3
  //       .select("body")
  //       .append("div")
  //       .attr("class", "toolTip")
  //       .classed("toolTipForBarGraph", true);
  //     circles
  //       .enter()
  //       .append("circle")
  //       .attr("r", 5)
  //       .attr("cx", (data) => xScale(data.totalCandidates))
  //       .attr("cy", (data) => yScale(data.testName)+10)
  //       .attr("fill", "#265B86")
  //       .attr("stroke-width", function () {
  //         return 2;
  //       })
  //       // .attr("stroke", "#3379B3")
  //       .attr("stroke", "white")
  //       .style("filter", "url(#drop-shadow)")
  //       .on("click", function (e, d) {
  //         // console.log(e,d)
  //         // graph
  //         //   .append("rect")
  //         //   .attr("x", () => xScale(d.totalCandidates)-20)
  //         //   .attr("y", () => yScale(d.testName) + 20)
  //         //   .attr("width", 40)
  //         //   .attr("height", () => height - yScale(d.testName) - 20)
  //         //   .attr("fill", "url(#bar-gradient)");

  //         // div.style("left", e.pageX - 90 + "px");
  //         // div.style("top", e.pageY - 130 + "px");
  //         // div.style("display", "inline-block");
  // //         div.html(
  // //           `<div class="groupNameLine">
  // //             <div class="mr-3">
  // //            Total Evaluated Candidates
  // // </div>
  // // <div>${d.totalEvaluated}</div>
  // //             </div>
  // //             <div class="countDivLine">
  // //            <div class="countDivData">
  // //             <div class="colorlineLine"></div>
  // //            <div class="graphFonts" >
  // //             <div class="d-flex align-items-center justify-content-between p-2">
  // //           <div>  Total Candidates</div>
  // // <div>
  // // ${d.totalCandidates}
  // //             </div>
  // //            </div>

  // //             <div class="d-flex align-items-center justify-content-between p-2">
  // //           <div>  Total Tests</div>

  // //            <div> ${d.totalTests}</div>
  // //             </div>
  // //            </div>
  // //            </div>
  // //             </div>
  // //             `
  // //         );
  //       })
  //       .on("mouseout", function () {

  //         // graph.select("rect").remove();
  //         // div.style("display", "none");
  //       });

  //     var defs = svg.append("defs");
  //      var filter = defs
  //       .append("filter")
  //       .attr("id", "drop-shadow")
  //       .attr("height", "130%");

  //      filter
  //       .append("feGaussianBlur")
  //       .attr("in", "SourceAlpha")
  //       .attr("stdDeviation", 0)
  //       .attr("result", "blur");
  //      filter
  //       .append("feOffset")
  //       .attr("in", "blur")
  //       .attr("dx", 0)
  //       .attr("dy", 0)
  //       .attr("result", "offsetBlur");
  //      var feMerge = filter.append("feMerge");

  //     feMerge.append("feMergeNode").attr("in", "offsetBlur");
  //     feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  //     //end
  //     const line = d3
  //       .line()
  //       .x((d) => xScale(d.totalCandidates))
  //       .y((d) => yScale(d.testName));
  //         // .curve(d3.curveCardinal);
  //    const g4 = svg
  //         .append("g")
  //         .attr("transform", "translate(" + 50 + "," + 30 + ")");
  //       g4
  //         .append("path")
  //         .datum(data)
  //         .attr("fill", "none")
  //         .attr("stroke", "#3379B3")
  //         .attr("d", line);

  //     this.lineGraphCreated = true;
  //   }

  async mygraph1(data) {
    data = data[3];
    console.log("data is", data);
    //  console.log("chhhk dddd",typeof(data))

    // this.dataForLineGraph = Object.keys(res.data.data);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    // const chartContainer = this.$refs.linechartContainer;
    const chartWidth = 400;
    const chartHeight = 150;
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;
    if (this.lineGraphCreated === true) {
      d3.select("#recgraph1").selectAll("g").remove();
    }
    const svg = d3
      .select("#recgraph1")
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);
    // .style("background-color", "black");

    const graph = svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // for y data
    //  const reverseData = data.map((d) => d.testName);
    const reverseData = data.progress;
    const name = reverseData.map((d) => d.level);
    //  let reverseData = []
    //  for (let i = 0; i < chk.length; i++)
    //  {
    //    for (let j = 0; j < chk[i].length;j++)
    //         reverseData.push(chk[i][j].Level)
    //    }
    // const chks = chk.map((d)=>d)

    console.log("reverse", reverseData);
    console.log("nameee", name);

    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;
    console.log("chhhk", max);
    const xScale = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([0, width]);
    const xScale1 = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([width, 0]);

    const yScale = d3.scaleBand().domain(name).range([height, 0]);
    const xAxisGroup = graph
      .append("g")
      .attr("transform", `translate(0,${height})`);
    const yAxisGroup = graph.append("g");

    const xAxis = d3.axisBottom(xScale).tickSize(-height).ticks(max);
    const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
    xAxisGroup
      .call(xAxis)
      .style("color", "#A3A3A3")
      .selectAll("text")
      .attr("transform", "translate(0,10)");
    yAxisGroup.call(yAxis).style("color", "#A3A3A3");

    const circles = graph.selectAll("circle").data(reverseData);

    circles
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (data, i) => xScale(i))
      .attr("cy", (reverseData) => yScale(reverseData.level) + 10)
      .attr("fill", "#265B86")
      .attr("stroke-width", function () {
        return 2;
      })
      // .attr("stroke", "#3379B3")
      .attr("stroke", "white")
      .style("filter", "url(#drop-shadow)")
      .on("mouseover", function (e, d) {})
      .on("mouseout", function () {});

    var defs = svg.append("defs");
    var filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 0)
      .attr("result", "blur");
    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    //end
    const line = d3
      .line()
      .x((data, i) => xScale(i))
      .y((reverseData) => yScale(reverseData.level) + 10);
    // .curve(d3.curveCardinal);

    graph
      .append("path")
      .data([reverseData])
      .attr("fill", "none")
      .attr("stroke", "#3379B3")
      .attr("d", line);

    this.lineGraphCreated = true;
  }

  async mygraph2(data) {
    data = data[0];
    console.log("data is", data);
    //  console.log("chhhk dddd",typeof(data))

    // this.dataForLineGraph = Object.keys(res.data.data);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    // const chartContainer = this.$refs.linechartContainer;
    const chartWidth = 400;
    const chartHeight = 150;
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;
    if (this.lineGraphCreated === true) {
      d3.select("#recgraph2").selectAll("g").remove();
    }
    const svg = d3
      .select("#recgraph2")
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);
    // .style("background-color", "black");

    const graph = svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // for y data
    //  const reverseData = data.map((d) => d.testName);
    const reverseData = data.progress;
    const name = reverseData.map((d) => d.level);
    //  let reverseData = []
    //  for (let i = 0; i < chk.length; i++)
    //  {
    //    for (let j = 0; j < chk[i].length;j++)
    //         reverseData.push(chk[i][j].Level)
    //    }
    // const chks = chk.map((d)=>d)

    console.log("reverse", reverseData);
    console.log("nameee", name);

    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;
    console.log("chhhk", max);
    const xScale = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([0, width]);
    const xScale1 = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([width, 0]);

    const yScale = d3.scaleBand().domain(name).range([height, 0]);
    const xAxisGroup = graph
      .append("g")
      .attr("transform", `translate(0,${height})`);
    const yAxisGroup = graph.append("g");

    const xAxis = d3.axisBottom(xScale).tickSize(-height).ticks(max);
    const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
    xAxisGroup
      .call(xAxis)
      .style("color", "#A3A3A3")
      .selectAll("text")
      .attr("transform", "translate(0,10)");
    yAxisGroup.call(yAxis).style("color", "#A3A3A3");

    const circles = graph.selectAll("circle").data(reverseData);

    circles
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (data, i) => xScale(i))
      .attr("cy", (reverseData) => yScale(reverseData.level) + 50)
      .attr("fill", "#265B86")
      .attr("stroke-width", function () {
        return 2;
      })
      // .attr("stroke", "#3379B3")
      .attr("stroke", "white")
      .style("filter", "url(#drop-shadow)")
      .on("mouseover", function (e, d) {})
      .on("mouseout", function () {});

    var defs = svg.append("defs");
    var filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 0)
      .attr("result", "blur");
    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    //end
    const line = d3
      .line()
      .x((data, i) => xScale(i))
      .y((reverseData) => yScale(reverseData.level) + 10);
    // .curve(d3.curveCardinal);

    graph
      .append("path")
      .data([reverseData])
      .attr("fill", "none")
      .attr("stroke", "#3379B3")
      .attr("d", line);

    this.lineGraphCreated = true;
  }

  async mygraph3(data) {
    data = data[1];
    console.log("data is", data);
    //  console.log("chhhk dddd",typeof(data))

    // this.dataForLineGraph = Object.keys(res.data.data);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    // const chartContainer = this.$refs.linechartContainer;
    const chartWidth = 400;
    const chartHeight = 150;
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;
    if (this.lineGraphCreated === true) {
      d3.select("#recgraph3").selectAll("g").remove();
    }
    const svg = d3
      .select("#recgraph3")
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);
    // .style("background-color", "black");

    const graph = svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // for y data
    //  const reverseData = data.map((d) => d.testName);
    const reverseData = data.progress;
    const name = reverseData.map((d) => d.level);
    //  let reverseData = []
    //  for (let i = 0; i < chk.length; i++)
    //  {
    //    for (let j = 0; j < chk[i].length;j++)
    //         reverseData.push(chk[i][j].Level)
    //    }
    // const chks = chk.map((d)=>d)

    console.log("reverse", reverseData);
    console.log("nameee", name);

    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;
    console.log("chhhk", max);
    const xScale = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([0, width]);
    const xScale1 = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([width, 0]);

    const yScale = d3.scaleBand().domain(name).range([height, 0]);
    const xAxisGroup = graph
      .append("g")
      .attr("transform", `translate(0,${height})`);
    const yAxisGroup = graph.append("g");

    const xAxis = d3.axisBottom(xScale).tickSize(-height).ticks(max);
    const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
    xAxisGroup
      .call(xAxis)
      .style("color", "#A3A3A3")
      .selectAll("text")
      .attr("transform", "translate(0,10)");
    yAxisGroup.call(yAxis).style("color", "#A3A3A3");

    const circles = graph.selectAll("circle").data(reverseData);

    circles
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (data, i) => xScale(i))
      .attr("cy", (reverseData) => yScale(reverseData.level) + 10)
      .attr("fill", "#265B86")
      .attr("stroke-width", function () {
        return 2;
      })
      // .attr("stroke", "#3379B3")
      .attr("stroke", "white")
      .style("filter", "url(#drop-shadow)")
      .on("mouseover", function (e, d) {})
      .on("mouseout", function () {});

    var defs = svg.append("defs");
    var filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 0)
      .attr("result", "blur");
    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    //end
    const line = d3
      .line()
      .x((data, i) => xScale(i))
      .y((reverseData) => yScale(reverseData.level) + 10);
    // .curve(d3.curveCardinal);

    graph
      .append("path")
      .data([reverseData])
      .attr("fill", "none")
      .attr("stroke", "#3379B3")
      .attr("d", line);

    this.lineGraphCreated = true;
  }

  async mygraph4(data) {
    data = data[2];
    console.log("data is", data);
    //  console.log("chhhk dddd",typeof(data))

    // this.dataForLineGraph = Object.keys(res.data.data);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    // const chartContainer = this.$refs.linechartContainer;
    const chartWidth = 400;
    const chartHeight = 150;
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;
    if (this.lineGraphCreated === true) {
      d3.select("#recgraph4").selectAll("g").remove();
    }
    const svg = d3
      .select("#recgraph4")
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);
    // .style("background-color", "black");

    const graph = svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // for y data
    //  const reverseData = data.map((d) => d.testName);
    const reverseData = data.progress;
    const name = reverseData.map((d) => d.level);
    //  let reverseData = []
    //  for (let i = 0; i < chk.length; i++)
    //  {
    //    for (let j = 0; j < chk[i].length;j++)
    //         reverseData.push(chk[i][j].Level)
    //    }
    // const chks = chk.map((d)=>d)

    console.log("reverse", reverseData);
    console.log("nameee", name);

    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;
    console.log("chhhk", max);
    const xScale = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([0, width]);

    const xScale1 = d3
      .scaleLinear()
      // .padding(0.25)
      .domain([0, max])
      .range([width, 0]);

    const yScale = d3.scaleBand().domain(name).range([height, 0]);
    const xAxisGroup = graph
      .append("g")
      .attr("transform", `translate(0,${height})`);
    const yAxisGroup = graph.append("g");

    const xAxis = d3.axisBottom(xScale).tickSize(-height);
    const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
    xAxisGroup
      .call(xAxis)
      .style("color", "#A3A3A3")
      .selectAll("text")
      .attr("transform", "translate(0,10)");
    yAxisGroup.call(yAxis).style("color", "#A3A3A3");

    const circles = graph.selectAll("circle").data(reverseData);

    circles
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (data, i) => xScale(i))
      .attr("cy", (reverseData) => yScale(reverseData.level) + 10)
      .attr("fill", "#265B86")
      .attr("stroke-width", function () {
        return 2;
      })
      // .attr("stroke", "#3379B3")
      .attr("stroke", "white")
      .style("filter", "url(#drop-shadow)")
      .on("mouseover", function (e, d) {})
      .on("mouseout", function () {});

    var defs = svg.append("defs");
    var filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 0)
      .attr("result", "blur");
    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    //end
    const line = d3
      .line()
      .x((data, i) => xScale(i))
      .y((reverseData) => yScale(reverseData.level) + 10);
    // .curve(d3.curveCardinal);

    graph
      .append("path")
      .data([reverseData])
      .attr("fill", "none")
      .attr("stroke", "#3379B3")
      .attr("d", line);

    this.lineGraphCreated = true;
  }
}

// class reclinechart {
//   //   async mygraph1(data) {

//   //     // console.log("data is" , data)

//   //     // this.dataForLineGraph = Object.keys(res.data.data);
//   //     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//   //     // const chartContainer = this.$refs.linechartContainer;
//   //     const chartWidth = 400;
//   //     const chartHeight = 150;
//   //     const width = chartWidth - margin.left - margin.right;
//   //     const height = chartHeight - margin.top - margin.bottom;
//   //     if (this.lineGraphCreated === true) {
//   //       d3.select("#recgraph1")
//   //         .selectAll("g")
//   //         .remove();
//   //     }
//   //     const svg = d3
//   //       .select("#recgraph1")
//   //       .append("svg")
//   //       .attr("width", chartWidth)
//   //       .attr("height", chartHeight)
//   //       // .style("background-color", "black");

//   //     const graph = svg
//   //       .append("g")
//   //       .attr("width", width)
//   //       .attr("height", height)
//   //       .attr("transform", `translate(${margin.left},${margin.top})`);

//   //     // for y data
//   //     const reverseData = data.map((d) => d.testName);
//   //      const max = Math.max(...data.map((o) => o.totalCandidates));
//   //     const xScale = d3
//   //       .scaleLinear()
//   //       // .padding(0.25)
//   //       .domain([0, max])
//   //       .range([0, width]);

//   //     const xScale1 = d3
//   //       .scaleLinear()
//   //       // .padding(0.25)
//   //       .domain([0, max])
//   //       .range([width,0]);

//   //     const yScale = d3.scaleBand().domain(reverseData).range([height,0]);
//   //         // const yScale1 = d3.scaleBand().domain(reverseData).range([height,0]);

//   //     const xAxisGroup = graph
//   //       .append("g")
//   //       .attr("transform", `translate(0,${height})`);
//   //     const yAxisGroup = graph.append("g");

//   //     const xAxis = d3.axisBottom(xScale).tickSize(-height);
//   //     const yAxis = d3
//   //       .axisLeft(yScale)
//   //       .ticks(4)
//   //       .tickSize(-width);
//   //     xAxisGroup
//   //       .call(xAxis)
//   //       .style("color", "#A3A3A3")
//   //       .selectAll("text")
//   //       .attr("transform", "translate(0,10)");
//   //     yAxisGroup.call(yAxis) .style("color", "#A3A3A3");

//   //     const circles = graph.selectAll("circle").data(data);

//   //     const gradient = svg
//   //       .append("defs")
//   //       .append("linearGradient")
//   //       .attr("id", "bar-gradient")
//   //       .attr("x1", "0%")
//   //       .attr("y1", "0%")
//   //       .attr("x2", "0%")
//   //       .attr("y2", "100%");

//   //     gradient
//   //       .append("stop")
//   //       .attr("offset", "0%")
//   //       .attr("stop-color", "#ffffff");

//   //     gradient
//   //       .append("stop")
//   //       .attr("offset", "100%")
//   //       .attr("stop-color", "#97d9e1");

//   //     var div = d3
//   //       .select("body")
//   //       .append("div")
//   //       .attr("class", "toolTip")
//   //       .classed("toolTipForBarGraph", true);
//   //     circles
//   //       .enter()
//   //       .append("circle")
//   //       .attr("r", 5)
//   //       .attr("cx", (data) => xScale(data.totalCandidates))
//   //       .attr("cy", (data) => yScale(data.testName)+10)
//   //       .attr("fill", "#265B86")
//   //       .attr("stroke-width", function () {
//   //         return 2;
//   //       })
//   //       // .attr("stroke", "#3379B3")
//   //       .attr("stroke", "white")
//   //       .style("filter", "url(#drop-shadow)")
//   //       .on("click", function (e, d) {
//   //         // console.log(e,d)
//   //         // graph
//   //         //   .append("rect")
//   //         //   .attr("x", () => xScale(d.totalCandidates)-20)
//   //         //   .attr("y", () => yScale(d.testName) + 20)
//   //         //   .attr("width", 40)
//   //         //   .attr("height", () => height - yScale(d.testName) - 20)
//   //         //   .attr("fill", "url(#bar-gradient)");

//   //         // div.style("left", e.pageX - 90 + "px");
//   //         // div.style("top", e.pageY - 130 + "px");
//   //         // div.style("display", "inline-block");
//   // //         div.html(
//   // //           `<div class="groupNameLine">
//   // //             <div class="mr-3">
//   // //            Total Evaluated Candidates
//   // // </div>
//   // // <div>${d.totalEvaluated}</div>
//   // //             </div>
//   // //             <div class="countDivLine">
//   // //            <div class="countDivData">
//   // //             <div class="colorlineLine"></div>
//   // //            <div class="graphFonts" >
//   // //             <div class="d-flex align-items-center justify-content-between p-2">
//   // //           <div>  Total Candidates</div>
//   // // <div>
//   // // ${d.totalCandidates}
//   // //             </div>
//   // //            </div>

//   // //             <div class="d-flex align-items-center justify-content-between p-2">
//   // //           <div>  Total Tests</div>

//   // //            <div> ${d.totalTests}</div>
//   // //             </div>
//   // //            </div>
//   // //            </div>
//   // //             </div>
//   // //             `
//   // //         );
//   //       })
//   //       .on("mouseout", function () {

//   //         // graph.select("rect").remove();
//   //         // div.style("display", "none");
//   //       });

//   //     var defs = svg.append("defs");
//   //      var filter = defs
//   //       .append("filter")
//   //       .attr("id", "drop-shadow")
//   //       .attr("height", "130%");

//   //      filter
//   //       .append("feGaussianBlur")
//   //       .attr("in", "SourceAlpha")
//   //       .attr("stdDeviation", 0)
//   //       .attr("result", "blur");
//   //      filter
//   //       .append("feOffset")
//   //       .attr("in", "blur")
//   //       .attr("dx", 0)
//   //       .attr("dy", 0)
//   //       .attr("result", "offsetBlur");
//   //      var feMerge = filter.append("feMerge");

//   //     feMerge.append("feMergeNode").attr("in", "offsetBlur");
//   //     feMerge.append("feMergeNode").attr("in", "SourceGraphic");

//   //     //end
//   //     const line = d3
//   //       .line()
//   //       .x((d) => xScale(d.totalCandidates))
//   //       .y((d) => yScale(d.testName));
//   //         // .curve(d3.curveCardinal);
//   //    const g4 = svg
//   //         .append("g")
//   //         .attr("transform", "translate(" + 50 + "," + 30 + ")");
//   //       g4
//   //         .append("path")
//   //         .datum(data)
//   //         .attr("fill", "none")
//   //         .attr("stroke", "#3379B3")
//   //         .attr("d", line);

//   //     this.lineGraphCreated = true;
//   //   }

//   async mygraph1(data) {
//     data = data[3];
//     console.log("data is", data);
//     //  console.log("chhhk dddd",typeof(data))

//     // this.dataForLineGraph = Object.keys(res.data.data);
//     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     // const chartContainer = this.$refs.linechartContainer;
//     const chartWidth = 400;
//     const chartHeight = 150;
//     const width = chartWidth - margin.left - margin.right;
//     const height = chartHeight - margin.top - margin.bottom;
//     if (this.lineGraphCreated === true) {
//       d3.select("#recgraph1").selectAll("g").remove();
//     }
//     const svg = d3
//       .select("#recgraph1")
//       .append("svg")
//       .attr("width", chartWidth)
//       .attr("height", chartHeight);
//     // .style("background-color", "black");

//     const graph = svg
//       .append("g")
//       .attr("width", width)
//       .attr("height", height)
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // for y data
//     //  const reverseData = data.map((d) => d.testName);
//     const reverseData = data.progress;
//     const name = reverseData.map((d) => d.level);
//     //  let reverseData = []
//     //  for (let i = 0; i < chk.length; i++)
//     //  {
//     //    for (let j = 0; j < chk[i].length;j++)
//     //         reverseData.push(chk[i][j].Level)
//     //    }
//     // const chks = chk.map((d)=>d)

//     console.log("reverse", reverseData);
//     console.log("nameee", name);

//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
//     console.log("chhhk", max);
//     const xScale = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([0, width]);
//     const xScale1 = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([width, 0]);

//     const yScale = d3.scaleBand().domain(name).range([height, 0]);
//     const xAxisGroup = graph
//       .append("g")
//       .attr("transform", `translate(0,${height})`);
//     const yAxisGroup = graph.append("g");

//     const xAxis = d3.axisBottom(xScale).tickSize(-height).ticks(max);
//     const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
//     xAxisGroup
//       .call(xAxis)
//       .style("color", "#A3A3A3")
//       .selectAll("text")
//       .attr("transform", "translate(0,10)");
//     yAxisGroup.call(yAxis).style("color", "#A3A3A3");

//     const circles = graph.selectAll("circle").data(reverseData);

//     circles
//       .enter()
//       .append("circle")
//       .attr("r", 5)
//       .attr("cx", (data, i) => xScale(i))
//       .attr("cy", (reverseData) => yScale(reverseData.level) + 10)
//       .attr("fill", "#265B86")
//       .attr("stroke-width", function () {
//         return 2;
//       })
//       // .attr("stroke", "#3379B3")
//       .attr("stroke", "white")
//       .style("filter", "url(#drop-shadow)")
//       .on("mouseover", function (e, d) {})
//       .on("mouseout", function () {});

//     var defs = svg.append("defs");
//     var filter = defs
//       .append("filter")
//       .attr("id", "drop-shadow")
//       .attr("height", "130%");

//     filter
//       .append("feGaussianBlur")
//       .attr("in", "SourceAlpha")
//       .attr("stdDeviation", 0)
//       .attr("result", "blur");
//     filter
//       .append("feOffset")
//       .attr("in", "blur")
//       .attr("dx", 0)
//       .attr("dy", 0)
//       .attr("result", "offsetBlur");
//     var feMerge = filter.append("feMerge");

//     feMerge.append("feMergeNode").attr("in", "offsetBlur");
//     feMerge.append("feMergeNode").attr("in", "SourceGraphic");

//     //end
//     const line = d3
//       .line()
//       .x((data, i) => xScale(i))
//       .y((reverseData) => yScale(reverseData.level) + 10);
//     // .curve(d3.curveCardinal);

//     graph
//       .append("path")
//       .data([reverseData])
//       .attr("fill", "none")
//       .attr("stroke", "#3379B3")
//       .attr("d", line);

//     this.lineGraphCreated = true;
//   }

//   async mygraph2(data) {
//     data = data[0];
//     console.log("data is", data);
//     //  console.log("chhhk dddd",typeof(data))

//     // this.dataForLineGraph = Object.keys(res.data.data);
//     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     // const chartContainer = this.$refs.linechartContainer;
//     const chartWidth = 400;
//     const chartHeight = 150;
//     const width = chartWidth - margin.left - margin.right;
//     const height = chartHeight - margin.top - margin.bottom;
//     if (this.lineGraphCreated === true) {
//       d3.select("#recgraph2").selectAll("g").remove();
//     }
//     const svg = d3
//       .select("#recgraph2")
//       .append("svg")
//       .attr("width", chartWidth)
//       .attr("height", chartHeight);
//     // .style("background-color", "black");

//     const graph = svg
//       .append("g")
//       .attr("width", width)
//       .attr("height", height)
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // for y data
//     //  const reverseData = data.map((d) => d.testName);
//     const reverseData = data.progress;
//     const name = reverseData.map((d) => d.level);
//     //  let reverseData = []
//     //  for (let i = 0; i < chk.length; i++)
//     //  {
//     //    for (let j = 0; j < chk[i].length;j++)
//     //         reverseData.push(chk[i][j].Level)
//     //    }
//     // const chks = chk.map((d)=>d)

//     console.log("reverse", reverseData);
//     console.log("nameee", name);

//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
//     console.log("chhhk", max);
//     const xScale = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([0, width]);
//     const xScale1 = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([width, 0]);

//     const yScale = d3.scaleBand().domain(name).range([height, 0]);
//     const xAxisGroup = graph
//       .append("g")
//       .attr("transform", `translate(0,${height})`);
//     const yAxisGroup = graph.append("g");

//     const xAxis = d3.axisBottom(xScale).tickSize(-height).ticks(max);
//     const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
//     xAxisGroup
//       .call(xAxis)
//       .style("color", "#A3A3A3")
//       .selectAll("text")
//       .attr("transform", "translate(0,10)");
//     yAxisGroup.call(yAxis).style("color", "#A3A3A3");

//     const circles = graph.selectAll("circle").data(reverseData);

//     circles
//       .enter()
//       .append("circle")
//       .attr("r", 5)
//       .attr("cx", (data, i) => xScale(i))
//       .attr("cy", (reverseData) => yScale(reverseData.level) + 50)
//       .attr("fill", "#265B86")
//       .attr("stroke-width", function () {
//         return 2;
//       })
//       // .attr("stroke", "#3379B3")
//       .attr("stroke", "white")
//       .style("filter", "url(#drop-shadow)")
//       .on("mouseover", function (e, d) {})
//       .on("mouseout", function () {});

//     var defs = svg.append("defs");
//     var filter = defs
//       .append("filter")
//       .attr("id", "drop-shadow")
//       .attr("height", "130%");

//     filter
//       .append("feGaussianBlur")
//       .attr("in", "SourceAlpha")
//       .attr("stdDeviation", 0)
//       .attr("result", "blur");
//     filter
//       .append("feOffset")
//       .attr("in", "blur")
//       .attr("dx", 0)
//       .attr("dy", 0)
//       .attr("result", "offsetBlur");
//     var feMerge = filter.append("feMerge");

//     feMerge.append("feMergeNode").attr("in", "offsetBlur");
//     feMerge.append("feMergeNode").attr("in", "SourceGraphic");

//     //end
//     const line = d3
//       .line()
//       .x((data, i) => xScale(i))
//       .y((reverseData) => yScale(reverseData.level) + 10);
//     // .curve(d3.curveCardinal);

//     graph
//       .append("path")
//       .data([reverseData])
//       .attr("fill", "none")
//       .attr("stroke", "#3379B3")
//       .attr("d", line);

//     this.lineGraphCreated = true;
//   }

//   async mygraph3(data) {
//     data = data[1];
//     console.log("data is", data);
//     //  console.log("chhhk dddd",typeof(data))

//     // this.dataForLineGraph = Object.keys(res.data.data);
//     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     // const chartContainer = this.$refs.linechartContainer;
//     const chartWidth = 400;
//     const chartHeight = 150;
//     const width = chartWidth - margin.left - margin.right;
//     const height = chartHeight - margin.top - margin.bottom;
//     if (this.lineGraphCreated === true) {
//       d3.select("#recgraph3").selectAll("g").remove();
//     }
//     const svg = d3
//       .select("#recgraph3")
//       .append("svg")
//       .attr("width", chartWidth)
//       .attr("height", chartHeight);
//     // .style("background-color", "black");

//     const graph = svg
//       .append("g")
//       .attr("width", width)
//       .attr("height", height)
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // for y data
//     //  const reverseData = data.map((d) => d.testName);
//     const reverseData = data.progress;
//     const name = reverseData.map((d) => d.level);
//     //  let reverseData = []
//     //  for (let i = 0; i < chk.length; i++)
//     //  {
//     //    for (let j = 0; j < chk[i].length;j++)
//     //         reverseData.push(chk[i][j].Level)
//     //    }
//     // const chks = chk.map((d)=>d)

//     console.log("reverse", reverseData);
//     console.log("nameee", name);

//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
//     console.log("chhhk", max);
//     const xScale = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([0, width]);
//     const xScale1 = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([width, 0]);

//     const yScale = d3.scaleBand().domain(name).range([height, 0]);
//     const xAxisGroup = graph
//       .append("g")
//       .attr("transform", `translate(0,${height})`);
//     const yAxisGroup = graph.append("g");

//     const xAxis = d3.axisBottom(xScale).tickSize(-height).ticks(max);
//     const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
//     xAxisGroup
//       .call(xAxis)
//       .style("color", "#A3A3A3")
//       .selectAll("text")
//       .attr("transform", "translate(0,10)");
//     yAxisGroup.call(yAxis).style("color", "#A3A3A3");

//     const circles = graph.selectAll("circle").data(reverseData);

//     circles
//       .enter()
//       .append("circle")
//       .attr("r", 5)
//       .attr("cx", (data, i) => xScale(i))
//       .attr("cy", (reverseData) => yScale(reverseData.level) + 10)
//       .attr("fill", "#265B86")
//       .attr("stroke-width", function () {
//         return 2;
//       })
//       // .attr("stroke", "#3379B3")
//       .attr("stroke", "white")
//       .style("filter", "url(#drop-shadow)")
//       .on("mouseover", function (e, d) {})
//       .on("mouseout", function () {});

//     var defs = svg.append("defs");
//     var filter = defs
//       .append("filter")
//       .attr("id", "drop-shadow")
//       .attr("height", "130%");

//     filter
//       .append("feGaussianBlur")
//       .attr("in", "SourceAlpha")
//       .attr("stdDeviation", 0)
//       .attr("result", "blur");
//     filter
//       .append("feOffset")
//       .attr("in", "blur")
//       .attr("dx", 0)
//       .attr("dy", 0)
//       .attr("result", "offsetBlur");
//     var feMerge = filter.append("feMerge");

//     feMerge.append("feMergeNode").attr("in", "offsetBlur");
//     feMerge.append("feMergeNode").attr("in", "SourceGraphic");

//     //end
//     const line = d3
//       .line()
//       .x((data, i) => xScale(i))
//       .y((reverseData) => yScale(reverseData.level) + 10);
//     // .curve(d3.curveCardinal);

//     graph
//       .append("path")
//       .data([reverseData])
//       .attr("fill", "none")
//       .attr("stroke", "#3379B3")
//       .attr("d", line);

//     this.lineGraphCreated = true;
//   }

//   async mygraph4(data) {
//     data = data[2];
//     console.log("data is", data);
//     //  console.log("chhhk dddd",typeof(data))

//     // this.dataForLineGraph = Object.keys(res.data.data);
//     const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//     // const chartContainer = this.$refs.linechartContainer;
//     const chartWidth = 400;
//     const chartHeight = 150;
//     const width = chartWidth - margin.left - margin.right;
//     const height = chartHeight - margin.top - margin.bottom;
//     if (this.lineGraphCreated === true) {
//       d3.select("#recgraph4").selectAll("g").remove();
//     }
//     const svg = d3
//       .select("#recgraph4")
//       .append("svg")
//       .attr("width", chartWidth)
//       .attr("height", chartHeight);
//     // .style("background-color", "black");

//     const graph = svg
//       .append("g")
//       .attr("width", width)
//       .attr("height", height)
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // for y data
//     //  const reverseData = data.map((d) => d.testName);
//     const reverseData = data.progress;
//     const name = reverseData.map((d) => d.level);
//     //  let reverseData = []
//     //  for (let i = 0; i < chk.length; i++)
//     //  {
//     //    for (let j = 0; j < chk[i].length;j++)
//     //         reverseData.push(chk[i][j].Level)
//     //    }
//     // const chks = chk.map((d)=>d)

//     console.log("reverse", reverseData);
//     console.log("nameee", name);

//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
//     console.log("chhhk", max);
//     const xScale = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([0, width]);

//     const xScale1 = d3
//       .scaleLinear()
//       // .padding(0.25)
//       .domain([0, max])
//       .range([width, 0]);

//     const yScale = d3.scaleBand().domain(name).range([height, 0]);
//     const xAxisGroup = graph
//       .append("g")
//       .attr("transform", `translate(0,${height})`);
//     const yAxisGroup = graph.append("g");

//     const xAxis = d3.axisBottom(xScale).tickSize(-height);
//     const yAxis = d3.axisLeft(yScale).ticks(4).tickSize(-width);
//     xAxisGroup
//       .call(xAxis)
//       .style("color", "#A3A3A3")
//       .selectAll("text")
//       .attr("transform", "translate(0,10)");
//     yAxisGroup.call(yAxis).style("color", "#A3A3A3");

//     const circles = graph.selectAll("circle").data(reverseData);

//     circles
//       .enter()
//       .append("circle")
//       .attr("r", 5)
//       .attr("cx", (data, i) => xScale(i))
//       .attr("cy", (reverseData) => yScale(reverseData.level) + 10)
//       .attr("fill", "#265B86")
//       .attr("stroke-width", function () {
//         return 2;
//       })
//       // .attr("stroke", "#3379B3")
//       .attr("stroke", "white")
//       .style("filter", "url(#drop-shadow)")
//       .on("mouseover", function (e, d) {})
//       .on("mouseout", function () {});

//     var defs = svg.append("defs");
//     var filter = defs
//       .append("filter")
//       .attr("id", "drop-shadow")
//       .attr("height", "130%");

//     filter
//       .append("feGaussianBlur")
//       .attr("in", "SourceAlpha")
//       .attr("stdDeviation", 0)
//       .attr("result", "blur");
//     filter
//       .append("feOffset")
//       .attr("in", "blur")
//       .attr("dx", 0)
//       .attr("dy", 0)
//       .attr("result", "offsetBlur");
//     var feMerge = filter.append("feMerge");

//     feMerge.append("feMergeNode").attr("in", "offsetBlur");
//     feMerge.append("feMergeNode").attr("in", "SourceGraphic");

//     //end
//     const line = d3
//       .line()
//       .x((data, i) => xScale(i))
//       .y((reverseData) => yScale(reverseData.level) + 10);
//     // .curve(d3.curveCardinal);

//     graph
//       .append("path")
//       .data([reverseData])
//       .attr("fill", "none")
//       .attr("stroke", "#3379B3")
//       .attr("d", line);

//     this.lineGraphCreated = true;
//   }
// }
//Recruitment Graphsssss
class DensityChart {
  // // Original data
  //   async createDensity(datass) {

  //     const lineChartData = [
  //     {
  //       currency: "USD",
  //       // values: [
  //       //   {
  //       //     date: "2018/01/01",
  //       //     close: 230
  //       //   },
  //       //   {
  //       //     date: "2018/02/01",
  //       //     close: 269
  //       //   },
  //       //   {
  //       //     date: "2018/03/01",
  //       //     close: 234
  //       //   },
  //       //   {
  //       //     date: "2018/04/01",
  //       //     close: 282
  //       //   },
  //       //   {
  //       //     date: "2018/05/01",
  //       //     close: 231
  //       //   },
  //       //   {
  //       //     date: "2018/06/01",
  //       //     close: 240
  //       //   },
  //       //   {
  //       //     date: "2018/07/01",
  //       //     close: 213
  //       //   },
  //       //   {
  //       //     date: "2018/08/01",
  //       //     close: 320
  //       //   },
  //       //   {
  //       //     date: "2018/09/01",
  //       //     close: 253
  //       //   },
  //       //   {
  //       //     date: "2018/10/01",
  //       //     close: 264
  //       //   },
  //       //   {
  //       //     date: "2018/11/01",
  //       //     close: 272
  //       //   },
  //       //   {
  //       //     date: "2018/12/01",
  //       //     close: 290
  //       //   }
  //       // ]
  //             values: [
  //         {
  //           date: "Jan",
  //           close: 230
  //         },
  //         {
  //           date: "Feb",
  //           close: 269
  //         },
  //         {
  //           date: "March",
  //           close: 234
  //         },
  //         {
  //           date: "Apr",
  //           close: 282
  //         },
  //         {
  //           date: "May",
  //           close: 231
  //         },
  //         {
  //           date: "June",
  //           close: 240
  //         },
  //         {
  //           date: "jul",
  //           close: 213
  //         },
  //         {
  //           date: "AUg",
  //           close: 320
  //         },
  //         {
  //           date: "Sep",
  //           close: 253
  //         },
  //         {
  //           date: "Oct",
  //           close: 264
  //         },
  //         {
  //           date: "Nov",
  //           close: 272
  //         },
  //         {
  //           date: "DEC",
  //           close: 290
  //         }
  //       ]
  //     }
  //   ];

  //     const Data2 = datass;
  //     let lineChartData2=[]
  //     lineChartData2[0] = { ...Data2[0] };
  //     console.log("objjj", lineChartData2);
  //     console.log("11", lineChartData, "222", lineChartData2);
  //   const margin = {
  //     top: 20,
  //     bottom: 20,
  //     left: 20,
  //     right: 20
  //   };

  //     const svgWidth = 600;
  //     const svgHeight = 300;

  //   const width = svgWidth - margin.left - margin.right;
  //   const height = svgHeight - margin.top - margin.bottom;

  //     const svg = d3.select('#density_graph')
  //       .append('svg')
  //       .attr('width', svgWidth)
  //       .attr('height', svgHeight)
  //       .append('g')
  //       // .attr('transform', `translate(${margin.left}, ${margin.top})`);

  //       .attr("transform", "translate(5," + 5 + ")");
  //       // .style("background-color", "black");

  //     const g = svg
  //     .append('g')
  //       // .attr('transform', `translate(${margin.left}, ${margin.top})`);

  //       .attr("transform", "translate(25," + 0 + ")")

  //   // svg.append('defs');

  //   // const parseTime = d3.timeParse('%Y/%m/%d');

  //   const parsedData = lineChartData.map(company => ({
  //     ticker: company.ticker,
  //     values: company.values.map(val => ({
  //       close: val.close,
  //       // date: parseTime(val.date)
  //       date: val.date

  //     }))
  //   }));

  //       const parsedData2 = lineChartData2.map(company => ({
  //     ticker: company.ticker,
  //     values: company.data.map(val => ({
  //       close: val.value,
  //       // date: parseTime(val.date)
  //       date: val.date

  //     }))
  //       }));

  //     let xScaleDomain2 = parsedData[0].values.map((d) => d.date);
  //     let xScaleDomain3 = parsedData2[0].values.map((d) => d.date);

  //     console.log("dataaa1 ",parsedData);
  //     console.log("data2", parsedData2);

  //   const xScale = scaleBand()
  //     .domain(xScaleDomain2)
  //     .range([0, svgWidth]);

  //       const xScale2 = scaleBand()
  //     .domain(xScaleDomain3)
  //       .range([0, svgWidth]);

  //     const max2 = Math.max(...parsedData[0].values.map((o) => o.close));
  //         const max3 = Math.max(...parsedData2[0].values.map((o) => o.close));

  //   const yScale = d3.scaleLinear()
  //         .domain([0,max2])
  //       .range([height, 0]);

  //       const yScale2 = d3.scaleLinear()
  //         .domain([0,max3])
  //     .range([height, 0]);

  //   //LINE 1 STARTS
  //   const line1= d3.line()
  //     .x(d => xScale(d.date))
  //     .y(d => yScale(d.close))
  //       .curve(d3.curveCatmullRom.alpha(0.5));

  //     g.selectAll('.line')
  //       .data(parsedData)
  //       .enter()
  //       .append('path')
  //       .attr('d', d => {
  //         const lineValues = line1(d.values).slice(1);
  //         const splitedValues = lineValues.split(',');

  //         return `M0,${height},${lineValues},l0,${height - splitedValues[splitedValues.length - 1]}`
  //       })
  //       .style('fill', '#E31A1C')
  //     .style('opacity',0.2)

  //   g.selectAll('.line')
  //     .data(parsedData)
  //     .enter()
  //     .append('path')
  //       .attr('d', d => line1(d.values))
  //       .attr('stroke-width', '1')
  //       .style('fill', 'none')
  //       .style('filter', 'url(#glow)')
  //       .attr('stroke', '#E31A1C');

  // //LINE 1 ENDS

  //     //LINE 2 STARTS
  //   const line2= d3.line()
  //     .x(d => xScale2(d.date))
  //     .y(d => yScale2(d.close))
  //     .curve(d3.curveCatmullRom.alpha(0.5));

  //   g.selectAll('.line')
  //     .data(parsedData2)
  //     .enter()
  //     .append('path')
  //       .attr('d', d => {
  //         const lineValues2 = line2(d.values).slice(1);
  //         const splitedValues2 = lineValues2.split(',');

  //         return `M0,${height},${lineValues2},l0,${height - splitedValues2[splitedValues2.length - 1]}`
  //       })
  //       .style('fill', '#fcc885')
  //     .style('opacity',0.3)

  //   g.selectAll('.line')
  //     .data(parsedData2)
  //     .enter()
  //     .append('path')
  //       .attr('d', d => line2(d.values))
  //       .attr('stroke-width', '1')
  //       .style('fill', 'none')
  //       // .style('filter', 'url(#glow)')
  //       .attr('stroke', '#FF7F00');

  //     //LINE2 ENDS

  //     const tick1 = svg.append('g')
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(d3.axisBottom(xScale)
  //         .ticks(12));

  //      tick1
  //     .selectAll('line')
  //       .attr('stroke', `5, 5`)
  //       .attr('stroke', '#ccc')
  //       .attr('y2', `-${height}px`)

  //      const tick2 =  g.append('g')
  //       .attr("transform", "translate(0," + 0 + ")")
  //       .call(d3.axisLeft(yScale)
  //         .ticks(5));
  //     tick2
  //     .selectAll('line')
  //       .attr('stroke', `5, 5`)
  //       .attr('stroke', '#ccc')
  //       .attr('x2', `${svgWidth-50}px`)

  //  svg.select('.domain')
  //     .attr('stroke', '#ddd')

  //   }

  async createDensity(datass) {
    const Data2 = datass;
    let lineChartData1 = [],
      lineChartData2 = [],
      lineChartData3 = [];

    lineChartData1[0] = { ...Data2[0] };
    lineChartData2[0] = { ...Data2[1] };
    lineChartData3[0] = { ...Data2[2] };
    console.log("objjj", lineChartData2);
    // console.log("11", lineChartData, "222", lineChartData2);

    const margin = {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    };

    const svgWidth = 600;
    const svgHeight = 300;

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select("#density_graph")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    // .style("background-color", "red");

    // .append('g')
    // .attr("transform", "translate(5," + 5 + ")")

    const g = svg
      .append("g")
      // .attr('transform', `translate(${margin.left}, ${margin.top})`);

      .attr("transform", "translate(" + 25 + "," + margin.bottom + ")");

    const xAxisTranslate = svgHeight - margin.bottom;

    const g1 = svg
      .append("g")
      .attr("transform", "translate(" + 25 + "," + xAxisTranslate + ")");

    const parsedData1 = lineChartData1.map((company) => ({
      ticker: company.ticker,
      values: company.data.map((val) => ({
        close: val.value,
        // date: parseTime(val.date)
        date: val.date,
      })),
    }));

    const parsedData2 = lineChartData2.map((company) => ({
      ticker: company.ticker,
      values: company.data.map((val) => ({
        close: val.value,
        // date: parseTime(val.date)
        date: val.date,
      })),
    }));

    const parsedData3 = lineChartData3.map((company) => ({
      ticker: company.ticker,
      values: company.data.map((val) => ({
        close: val.value,
        // date: parseTime(val.date)
        date: val.date,
      })),
    }));

    let xScaleDomain1 = parsedData1[0].values.map((d) => d.date),
      xScaleDomain2 = parsedData2[0].values.map((d) => d.date),
      xScaleDomain3 = parsedData3[0].values.map((d) => d.date);

    // console.log("dataaa1 ",parsedData1);
    // console.log("data2", parsedData2);

    const xScale = scaleBand()
      .domain(xScaleDomain1)
      .range([0, svgWidth + 50]);

    const xScale1 = scaleBand().domain(xScaleDomain1).range([0, svgWidth]);

    const xScale2 = scaleBand().domain(xScaleDomain2).range([0, svgWidth]);

    const xScale3 = scaleBand().domain(xScaleDomain3).range([0, svgWidth]);

    const max1 = Math.max(...parsedData1[0].values.map((o) => o.close));
    const max2 = Math.max(...parsedData2[0].values.map((o) => o.close));
    const max3 = Math.max(...parsedData3[0].values.map((o) => o.close));

    const yScale1 = d3
      .scaleLinear()
      .domain([0, max1])
      .range([svgHeight - margin.bottom, 5]);

    const yScale2 = d3.scaleLinear().domain([0, max2]).range([height, 0]);

    const yScale3 = d3.scaleLinear().domain([0, max3]).range([height, 0]);

    const x_axis = axisBottom(xScale1).tickSize(-height - 15);
    const y_axis = axisLeft(yScale1)
      .tickSize(-width + 2)
      // .ticks(script.max <= 10 ? script.max
      //   : script.max <= 29 ? (script.max + 5) / 5
      //     : script.max <= 25 || ?);
      .ticks(7);

    //LINE 1 STARTS
    const line1 = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale1(d.close))
      .curve(d3.curveCatmullRom.alpha(0.5));

    g.selectAll(".line")
      .data(parsedData1)
      .enter()
      .append("path")
      .attr("d", (d) => {
        const lineValues1 = line1(d.values).slice(1);
        const splitedValues1 = lineValues1.split(",");

        return `M0,${height},${lineValues1},l0,${
          height - splitedValues1[splitedValues1.length - 1]
        }`;
      })
      // .style('fill', '#E31A1C')
      .style("fill", "#e2f7cf")

      .style("opacity", 0.2);

    g.selectAll(".line")
      .data(parsedData1)
      .enter()
      .append("path")
      .attr("d", (d) => line1(d.values))
      .attr("stroke-width", "1")
      .style("fill", "none")
      .style("filter", "url(#glow)")
      .attr("stroke", "#6ED810");

    //LINE 1 ENDS

    //LINE 2 STARTS
    const line2 = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale2(d.close))
      .curve(d3.curveCatmullRom.alpha(0.5));

    g.selectAll(".line")
      .data(parsedData2)
      .enter()
      .append("path")
      .attr("d", (d) => {
        const lineValues2 = line2(d.values).slice(1);
        const splitedValues2 = lineValues2.split(",");

        return `M0,${height},${lineValues2},l0,${
          height - splitedValues2[splitedValues2.length - 1]
        }`;
      })
      .style("fill", "#fcc885")
      .style("opacity", 0.3);

    g.selectAll(".line")
      .data(parsedData2)
      .enter()
      .append("path")
      .attr("d", (d) => line2(d.values))
      .attr("stroke-width", "1")
      .style("fill", "none")
      // .style('filter', 'url(#glow)')
      .attr("stroke", "#FF7F00");

    //LINE2 ENDS

    //LINE3 STARTS

    const line3 = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale3(d.close))
      .curve(d3.curveCatmullRom.alpha(0.5));

    g.selectAll(".line")
      .data(parsedData3)
      .enter()
      .append("path")
      .attr("d", (d) => {
        const lineValues2 = line3(d.values).slice(1);
        const splitedValues2 = lineValues2.split(",");

        return `M0,${height},${lineValues2},l0,${
          height - splitedValues2[splitedValues2.length - 1]
        }`;
      })
      .style("fill", "#E31A1C")
      .style("opacity", 0.3);

    g.selectAll(".line")
      .data(parsedData3)
      .enter()
      .append("path")
      .attr("d", (d) => line3(d.values))
      .attr("stroke-width", "1")
      .style("fill", "none")
      .style("filter", "url(#glow)")
      .attr("stroke", "#E31A1C");

    //LINE3 ENDS

    g1.append("g")
      .attr("class", "bar-x-axis")
      .call(x_axis)
      .style("color", "#A3A3A3")
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      // .attr("transform", "rotate(-30)");
      .attr("transform", "rotate(-10)");

    svg
      .append("g")
      .attr("class", "bar-x-axis")
      .attr("transform", "translate(25,0)")
      .call(y_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .attr("dx", "-.8em")
      .attr("dy", ".15em");

    //  const tick2 =  g.append('g')
    //   .attr("transform", "translate(0," + 0 + ")")
    //   .call(d3.axisLeft(yScale1)
    //     .ticks(5));
    // tick2
    // .selectAll('line')
    //   .attr('stroke', `5, 5`)
    //   .attr('stroke', '#ccc')
    //   .attr('x2', `${svgWidth}px`)

    svg.select(".domain").attr("stroke", "#ddd");
  }
}
// eslint-disable-next-line no-redeclare
export {
  D3BarChart,
  scatterplot,
  scatterplot_rect,
  piePlot,
  treeGraph,
  reclinechart,
  DensityChart,
};
// treeGraph1
