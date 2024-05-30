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
};
let script = {
  name: "BarCharts",
  allData: [],
  barData: [],
  svgWidth: window.innerWidth,
  max: 0,
  count: 0,
  // pie_data: [
  //   { platform: "Android", percentage: 40.11 },
  //   { platform: "Windows", percentage: 36.69 },
  //   { platform: "iOS", percentage: 13.06 },
  // ],
};




//ASSESSMENTS
//GRAPH 1
class scatterplot {
  async scatterGraph(data) {
    if (document.getElementById("graph1").innerHTML != "") {
      document.getElementById("graph1").innerHTML = "";
    }

    // let data = data.slice(50)


    let datapoints = data.topicData;
    let aboveZero = 0;
    for (let i in datapoints) {
      if (datapoints[i].uniqueTotalCandidates > 0) {
        aboveZero++
      }
    }
    let width = 300;
    // let count = 0,
    //   countneg = 0;
    // for (let i = 0; i < data.topicData.length; i++) {
    //   if (data.topicData[i].uniqueTotalCandidates > 0) {
    //     count++;
    //   } else {
    //     countneg++;
    //   }
    // }
    // if (aboveZero <= 15) {
    //   let height = 180;
    //   makescattergraph(height);
    // }
    // else if (aboveZero <= 80) {
    //   let height = 280;
    //   makescattergraph(height);
    // } else if (aboveZero <= 160) {
    //   let height = 450;
    //   makescattergraph(height);
    // } else if (aboveZero <= 250) {
    //   let height = 650;
    //   makescattergraph(height);
    // }
    //  else {
    //   let height = 250;
    //   makescattergraph(height)
    // }

    //  var width = 650,


    //For Widthhhh...
    if (window.innerWidth >= 3000) {
      width = window.innerWidth - 1700

    }
    else if (window.innerWidth >= 2500) {
      width = window.innerWidth - 1250


    }
    else if (window.innerWidth >= 2000) {
      width = window.innerWidth - 1100


    }
    else if (window.innerWidth >= 1900) {
      width = window.innerWidth - 950

    }
    else if (window.innerWidth >= 1600) {
      width = window.innerWidth - 820

    }
    else if (window.innerWidth >= 1500) {
      width = window.innerWidth - 750

    }
    else if (window.innerWidth >= 1200) {
      width = window.innerWidth - 580

    }
    else {
      width = window.innerWidth - 200

    }



    // let height = (Math.max(...datapoints.map(o => o.uniqueTotalCandidates))) * 3.5;
    let height = 250
    makescattergraph(height)


    function makescattergraph(height) {
      var svg = d3
        .select("#graph1")
        .classed("svg-container", true)
        .append("svg")
        // .attr("height", height)
        // .attr("width", width)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .classed("svg-content-responsive", true)
        // .attr("height",height)
        // .attr("width",width)

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
        // .scaleSequentialSqrt()        
        .domain(
          extent(datapoints, function (d) {
            return d.uniqueTotalCandidates;
          })
        )
        .range([0, 30]);



      var forceXCombine = d3.forceX(width / 2.1).strength(0.01);
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

          return d.uniqueTotalCandidates > 0 ? radiusScale(d.uniqueTotalCandidates) : radiusScale(d.uniqueTotalCandidates + 1);
          // return radiusScale(d.uniqueTotalCandidates);
          // add mpg
        })
        .attr("fill", function (d) {
          return d.active ? "#8676FF" : "#BCCBB1";
        });
      //
      simulation.nodes(datapoints).on("tick", ticked);

      // let maxScale = Math.max(...datapoints.map((t) => t.x));


      const xScale = scaleLinear().domain([0, 300]).range([10, width / 1.4]);

      function ticked() {
        circles
          .attr("cx", function (d, i) {
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
        Tooltip.style("opacity", 1)
          .style("visibility", "visible")
          .html(

            `<div class="scatter-main">
          <div class="scatter-header">${datapoints.topicName}</div> 
          <div id='tipDiv'></div>
     <div class="scatterbody-content"> 
     <div class="d-flex ">
     <div style="width:5%"></div>
     <div  style="width:85%">
     <div class="scatter-texthead">Tests</div>
     <div class="scatter-textbody">  Lorem ipsum dolor sit amet consectetur adipisicing </div>
     </div>
     <div style="width:10%" class="scatter-testnum">${datapoints.uniqueTotalCandidates} </div>
     </div>
    <div>`
          )
          .style("left", d.pageX + 20 + "px")
          .style("top", d.pageY + "px");
        select(this)
          .attr("r", function (d) {
            return d.uniqueTotalCandidates > 0 ? radiusScale(d.uniqueTotalCandidates) : radiusScale(d.uniqueTotalCandidates + 1);

            // return (radiusScale(d.uniqueTotalCandidates) + 5);
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
            return d.uniqueTotalCandidates > 0 ? radiusScale(d.uniqueTotalCandidates) : radiusScale(d.uniqueTotalCandidates + 1);

            // return radiusScale(d.uniqueTotalCandidates);
            // add mpg
          })
          .style("stroke", "none")
          .style("opacity", 0.8);
        Tooltip.style("display", "none");
      };


    }
  }
}


// class scatterplotZoom {

//   theZoom(newData) {
//     var data = newData;
//     // async function thedata(){
//     // const response3 = await fetch(
//     //     "https://run.mocky.io/v3/ca3afa37-0f36-4c9f-ac20-8002c9dd50aa"
//     // );
//     // data = await response3.json();

//     // }

//     // thedata();

//     let width;
//     setTimeout(() => {



//       if (window.innerWidth >= 3000) {
//         width = window.innerWidth - 1700

//       }
//       else if (window.innerWidth >= 2500) {
//         width = window.innerWidth - 1250


//       }
//       else if (window.innerWidth >= 2000) {
//         width = window.innerWidth - 1100


//       }
//       else if (window.innerWidth >= 1900) {
//         width = window.innerWidth - 950

//       }
//       else if (window.innerWidth >= 1600) {
//         width = window.innerWidth - 820

//       }
//       else if (window.innerWidth >= 1500) {
//         width = window.innerWidth - 750

//       }
//       else if (window.innerWidth >= 1200) {
//         width = window.innerWidth - 580

//       }
//       else {
//         width = window.innerWidth - 200

//       }
//       // set the dimensions and margins of the graph
//       var margin = { top: 10, right: 30, bottom: 30, left: 60 },
//         width = width - margin.left - margin.right,
//         height = 300 - margin.top - margin.bottom;

//       // append the SVG object to the body of the page
//       var SVG = d3.select("#graph1")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         // .style("background-color", "black")
//         .append("g")
//         .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")")



//       const max1 = Math.max(...data.map((o) => o.numberOfActiveTest));
//       const max2 = Math.max(...data.map((o) => o.totalNumberOfTopics));

//       // Add X axis
//       var x = d3.scaleLinear()
//         .domain([0, 25])
//         .range([0, (width - 50)]);


//       // var x = d3.scaleBand()
//       // .domain(data.map((d) => d.topicName))
//       // .range([0, width]);

//       // Add Y axis
//       var y = d3.scaleLinear()
//         .domain([0, max1])
//         .range([(height - 50), 5]);


//       // Add a clipPath: everything out of this area won't be drawn.
//       var clip = SVG.append("defs").append("SVG:clipPath")
//         .attr("id", "clip")
//         .append("SVG:rect")
//         .attr("width", width)
//         .attr("height", height)
//         .attr("x", 0)
//         .attr("y", 0);

//       // Create the scatter variable: where both the circles and the brush take place
//       var scatter = SVG.append('g')
//       // .attr("clip-path", "url(#clip)");

//       var radiusScale = d3
//       .scaleSqrt()
//       // .scaleSequentialSqrt()        
//       .domain(
//         extent(data, function (d) {
//           return d.uniqueTotalCandidates;
//         })
//       )
//       .range([0, 30]);


//       // Add circles
//       scatter
//         .selectAll("circle")
//         .data(data)
//         .enter()
//         .append("circle")
//         .attr("cx", function (d) {
//           return x(d.totalNumberOfTopics);
//         })
//         .attr("cy", function (d) { return y(d.numberOfActiveTest); })
//         // .attr("r", 8)
//         .attr("r", function (d) {
//           return d.uniqueTotalCandidates > 0 ? radiusScale(d.uniqueTotalCandidates) : radiusScale(d.uniqueTotalCandidates + 1);

//         })
//         .style("fill", "#61a3a9")
//         .style("opacity", 0.5)

//       // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
//       var zoom = d3.zoom()
//         .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
//         .extent([[0, 0], [width, height]])
//         .on("zoom", updateChart);

//       // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
//       SVG.append("rect")
//         .attr("width", width)
//         .attr("height", height)
//         .style("fill", "none")
//         .style("pointer-events", "all")
//         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
//         .call(zoom);
//       // now the user can zoom and it will trigger the function called updateChart

//       // A function that updates the chart when the user zoom and thus new boundaries are available
//       function updateChart(e) {

//         // recover the new scale
//         var newX = e.transform.rescaleX(x);
//         var newY = e.transform.rescaleY(y);



//         // update circle position
//         scatter
//           .selectAll("circle")
//           .attr('cx', function (d) { return newX(d.totalNumberOfTopics) })
//           .attr('cy', function (d) { return newY(d.numberOfActiveTest) });
//       }

//       // })




//     }, 1000);



//   }

// }



// class scatterplotZoom {



//   theZoom(newData) {


//     if (document.getElementById("graph1").innerHTML != "") {
//       document.getElementById("graph1").innerHTML = "";
//     }

//     var data = newData;
//     let width;


//     setTimeout(() => {

//       if (window.innerWidth >= 3000) {
//         width = window.innerWidth - 1700

//       }
//       else if (window.innerWidth >= 2500) {
//         width = window.innerWidth - 1250


//       }
//       else if (window.innerWidth >= 2000) {
//         width = window.innerWidth - 1100


//       }
//       else if (window.innerWidth >= 1900) {
//         width = window.innerWidth - 950

//       }
//       else if (window.innerWidth >= 1600) {
//         width = window.innerWidth - 820

//       }
//       else if (window.innerWidth >= 1500) {
//         width = window.innerWidth - 750

//       }
//       else if (window.innerWidth >= 1200) {
//         width = window.innerWidth - 580

//       }
//       else {
//         width = window.innerWidth - 200

//       }
//       // set the dimensions and margins of the graph
//       var margin = { top: 10, right: 0, bottom: 30, left: 30 },
//         width = width - margin.left - margin.right,
//         height = 300 - margin.top - margin.bottom;
//       const startPoint = 50;
//       const svgWidth = width + 100;
//       const svgHeight = height + margin.top + margin.bottom;

//       var zoom = d3
//         .zoom()
//         .on("zoom", zoomed);

//       var SVG = d3
//         .select("#graph1")
//         .classed("svg-container", true)
//         .append("svg")
//         // .attr("width", width + margin.left + margin.right)
//         // .attr("height", height + margin.top + margin.bottom)
//         .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
//         .attr("preserveAspectRatio", "xMinYMin meet")
//         .classed("svg-content-responsive", true)
//         .call(zoom);
//       // .style("background-color", "red");

//       SVG = SVG.append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


//       var ctrl, key;

//       // Attach the resize event listener
//       document.body.addEventListener("keydown", function (ev) {
//         ev = ev || window.event;
//         key = ev.which || ev.code;
//         ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
//         window.addEventListener("resize", resize);

//         // }
//       }, false);

//       function resize() {

//         if (ctrl && key === 109 && window.innerWidth > 1900) {

//           var containerWidth = parseInt(d3.select("#graph1").style("width"));
//           var containerHeight = parseInt(d3.select("#graph1").style("height"));

//           SVG.attr("viewBox", "0 0 " + svgWidth * containerWidth / (svgWidth) + " " + svgHeight * containerHeight / svgHeight);
//         }
//         else if (window.innerWidth > 1700) {

//           SVG.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
//           if (window.innerHeight > 950) {
//             SVG.attr("viewBox", `0 0 ${svgWidth} ${svgHeight + 50}`);
//           }

//         }
//         else {

//           SVG.attr("viewBox", `0 0 ${svgWidth + 20} ${svgHeight + 50}`)

//         }
//       }




//       const max1 = Math.max(...data.map((o) => o.valueTemp));
//       const max2 = Math.max(...data.map((o) => o.totalNumberOfTest));
//       // const max2 = Math.max(...data.map((o) => o.valueTempSecond));
//       var x0 = [0, max1];
//       var y0 = [0, max2];

//       // Add X axis

//       var x = d3
//         .scaleLinear()
//         .domain(x0)
//         // .range([startPoint, (width - (margin.left + margin.right))]);
//         .range([startPoint, (width - (margin.left + margin.right))]);

//       var y = d3
//         .scaleLinear()
//         .domain([0, max2])
//         .range([(height - (margin.top + margin.bottom)), startPoint]);


//       var newX = x;
//       var newY = y;

//       var brush = d3
//         .brush()
//         .extent([[0, 0], [width, height]])
//         .on("end", brushended),
//         idleTimeout,
//         idleDelay = 350;

//       // Add X axis
//       var xAxis = SVG.append("g")
//         .attr("class", "x axis")
//         .attr("id", "axis--x")
//         .attr("transform", "translate(0," + height + ")")
//       // .call(d3.axisBottom(x));

//       // Add Y axis
//       var yAxis = SVG.append("g")
//         .attr("class", "y axis")
//         .attr("id", "axis--y")
//       // .call(d3.axisLeft(y));


//       // Add a clipPath: everything out of this area won't be drawn.
//       var clip = SVG.append("defs")
//         .append("SVG:clipPath")
//         .attr("id", "clip")
//         .append("SVG:rect")
//         .attr("width", (width + startPoint))
//         .attr("height", height)
//         .attr("x", 0)
//         .attr("y", 0);

//       // Create the scatter variable: where both the circles and the brush take place
//       var scatter = SVG.append("g").attr("clip-path", "url(#clip)");
//       // .attr("clip-path", "url(#clip)");



//       function updateChart(newX, newY) {
//         var t = SVG.transition().duration(750);

//         // update axes with these new boundaries
//         xAxis.transition(t).call(d3.axisBottom(newX));
//         yAxis.transition(t).call(d3.axisLeft(newY));

//         // update circle position
//         scatter
//           .selectAll("circle")
//           .transition(t)
//           .attr("cx", function (d) {

//             return newX(d.valueTemp);
//           })
//           .attr("cy", function (d) {
//             return newY(d.totalNumberOfTest);
//             // return newY(d.valueTempSecond);
//           });
//       }

//       // now the user can zoom and it will trigger the function called updateChart
//       // A function that updates the chart when the user zoom and thus new boundaries are available
//       function zoomed(e) {
//         // recover the new scale
//         newX = e.transform.rescaleX(x);
//         newY = e.transform.rescaleY(y);

//         // update circle position
//         scatter
//           .selectAll("circle")
//           .attr("cx", function (d) {

//             return newX(d.valueTemp);
//           })
//           .attr("cy", function (d) {
//             return newY(d.totalNumberOfTest);
//             // return newY(d.valueTempSecond);
//           });
//       }

//       function idled() {
//         idleTimeout = null;
//       }

//       function brushended(e) {
//         var s = e.selection;

//         if (!s) {
//           if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
//           newX = x.domain(x0);
//           newY = y.domain(y0);
//         } else {
//           newX = x.domain([s[0][0], s[1][0]].map(newX.invert));
//           newY = y.domain([s[1][1], s[0][1]].map(newY.invert));

//           SVG.select(".brush").call(brush.move, null);
//         }
//         updateChart(newX, newY);
//       }

//       function start_brush_tool() {
//         SVG.append("g")
//           .attr("class", "brush")
//           .call(brush);
//       }

//       function end_brush_tool() {
//         SVG.selectAll("g.brush").remove();
//       }

//       /*

//       var tooltip = d3
//         .select("#graph1")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("opacity", 0);

//       // tooltip mouseover event handler
//       var tipMouseover = function (d, data) {
//         //var color = colorScale(d.manufacturer);
//         var html =
//           "Number Of Topics " +
//           "<b>" +
//           data.totalNumberOfTopics +
//           "</b>" +
//           "<br>" +
//           "Active Tests " +
//           "<b>" +
//           data.numberOfActiveTest +
//           "</b>";

//         tooltip
//           .html(html)
//           .style("left", d.pageX + 15 + "px")
//           .style("top", d.pageY - 28 + "px")
//           .transition()
//           .duration(200) // ms
//           .style("opacity", 0.9); // started as 0!
//       };
//       // tooltip mouseout event handler
//       var tipMouseout = function (d) {
//         tooltip
//           .transition()
//           .duration(300) // ms
//           .style("opacity", 0); // don't care about position!
//       };

//       */

//       var Tooltip = select("#scatter1Scroll")
//         .append("div")
//         .style("opacity", 0)
//         .attr("class", "tooltip")
//         .style("background-color", "white")
//         // .style("border", "solid")
//         // .style("border-width", "2px")
//         .style("border-radius", "5px")
//         .style("padding", "5px");

//       let tipMouseover = function (d, datapoints) {
//         Tooltip.style("opacity", 1)
//           .style("visibility", "visible")
//           .html(

//             `<div class="scatter-main">
//               <div class="scatter-header">${datapoints.topicName}</div> 
//               <div class="scatterbody-content"> 
//                 <div class="d-flex ">
//                   <div style="width:5%">

//                   </div>
//                   <div  style="width:75%">
//                   <div class="scatter-texthead d-flex align-items-start">Tests</div>
//                 </div>
//                 <div style="width:20%" class="scatter-testnum">${datapoints.totalNumberOfTest} </div>
//               </div>

//               <div class="mt-2"> 
//                 <div class="d-flex ">
//                   <div style="width:5%"></div>
//                   <div  style="width:75%">
//                   <div class="scatter-texthead  d-flex align-items-start">Candidates</div>

//                 </div>
//                 <div style="width:20%" class="scatter-testnum">${datapoints.uniqueTotalCandidates} </div>
//               </div>

//               <div class="mt-2"> 
//                 <div class="d-flex ">
//                   <div style="width:5%"></div>
//                   <div  style="width:75%">
//                   <div class="scatter-texthead  d-flex align-items-start">Currently Taking Test</div>

//                 </div>
//                 <div style="width:20%" class="scatter-testnum">${datapoints.submitted} </div>
//               </div>
//             </div>`
//           )
//           .style("left", d.pageX - 170 + "px")
//           .style("top", d.pageY - 280 + "px");
//         select(this)
//           .attr("r", function (d) {
//             return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);

//             // return (radiusScale(d.uniqueTotalCandidates) + 5);
//             // add mpg
//           })
//           .style("stroke", function (d) {
//             return d.active ? "#bcb4fe" : "#D0DFC5";
//           })
//           .style("stroke-width", 5)

//           .style("opacity", 0.5);
//         Tooltip.style("display", "block");
//       };

//       let tipMouseout = function (d) {
//         Tooltip.style("opacity", 0);
//         select(this)
//           .attr("r", function (d) {
//             return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);

//             // return radiusScale(d.uniqueTotalCandidates);
//             // add mpg
//           })
//           .style("stroke", "none")
//           .style("opacity", 0.7);
//         Tooltip.style("display", "none");
//       };

//       var radiusScale = d3
//         .scaleSqrt()
//         // .scaleSequentialSqrt()        
//         .domain(
//           extent(data, function (d) {
//             return d.totalNumberOfTest;
//           })
//         )
//         .range([0, startPoint]);


//       scatter
//         .selectAll("circle")
//         .data(data)
//         .enter()
//         .append("circle")
//         .attr("class", "pointer")
//         .attr("cx", function (d) {

//           return x(d.valueTemp);
//         })
//         .attr("cy", function (d) {

//           return y(d.totalNumberOfTest);
//           // return y(d.valueTempSecond);
//         })
//         // .attr("r", 8)
//         .attr("r", function (d) {
//           return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);
//         })
//         // .style("fill", "#61a3a9")
//         .attr("fill", function (d) {
//           return d.active ? "#8676FF" : "#BCCBB1";
//         })
//         .style("opacity", 0.7)
//         .on("mouseover", tipMouseover)

//         .on("mousemove", function (event) {
//           Tooltip
//             // .style('left', `${event.pageX}px`)
//             // .style('top', `${event.pageY}px`);
//             .style("left", event.pageX - 170 + "px")
//             .style("top", event.pageY - 280 + "px")

//         })
//         .on("mouseout", tipMouseout);
//       ;


//     }, 1000);



//   }

// }

var QuesData =
{
  name: [],
  age: 18,
  dept: "CSE",
  score: 90
};


class scatterplotZoom {
  constructor() {
    // this.mchkkk = [];
    // this.SVG = ""
    // this.onlytagName = this.onlytagName.bind(this); 
    this.scatter = null;
  }
  theZoom(newData) {


    if (document.getElementById("graph1").innerHTML != "") {
      document.getElementById("graph1").innerHTML = "";
    }

    let data = newData;
    let width;


    setTimeout(() => {

      if (window.innerWidth >= 3000) {
        width = window.innerWidth - 1700

      }
      else if (window.innerWidth >= 2500) {
        width = window.innerWidth - 1250


      }
      else if (window.innerWidth >= 2000) {
        width = window.innerWidth - 1100


      }
      else if (window.innerWidth >= 1900) {
        width = window.innerWidth - 950

      }
      else if (window.innerWidth >= 1600) {
        width = window.innerWidth - 820

      }
      else if (window.innerWidth >= 1500) {
        width = window.innerWidth - 750

      }
      else if (window.innerWidth >= 1200) {
        width = window.innerWidth - 580

      }
      else {
        width = window.innerWidth - 200

      }
      // set the dimensions and margins of the graph
      let margin = { top: 10, right: 0, bottom: 30, left: 30 };
      width = width - margin.left - margin.right;
      let height = 300 - margin.top - margin.bottom;
      const startPoint = 50;
      const svgWidth = width + 100;
      const svgHeight = height + margin.top + margin.bottom;

      let zoom = d3
        .zoom()
        .on("zoom", zoomed);

      let SVG = d3
        .select("#graph1")
        .classed("svg-container", true)
        .append("svg")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .classed("svg-content-responsive", true)
        .call(zoom)
      // .style("background-color", "red");

      SVG = SVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


      let ctrl, key;

      // Attach the resize event listener
      document.body.addEventListener("keydown", function (ev) {
        ev = ev || window.event;
        key = ev.which || ev.code;
        ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
        window.addEventListener("resize", resize);

        // }
      }, false);

      function resize() {

        if (ctrl && key === 109 && window.innerWidth > 1900) {

          let containerWidth = parseInt(d3.select("#graph1").style("width"));
          let containerHeight = parseInt(d3.select("#graph1").style("height"));

          SVG.attr("viewBox", "0 0 " + svgWidth * containerWidth / (svgWidth) + " " + svgHeight * containerHeight / svgHeight);
        }
        else if (window.innerWidth > 1700) {

          SVG.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
          if (window.innerHeight > 950) {
            SVG.attr("viewBox", `0 0 ${svgWidth} ${svgHeight + 50}`);
          }

        }
        else {

          SVG.attr("viewBox", `0 0 ${svgWidth + 20} ${svgHeight + 50}`)

        }
      }

      const max1 = Math.max(...data.map((o) => o.valueTemp));
      const max2 = Math.max(...data.map((o) => o.valueTempRandom));
      // const max2 = Math.max(...data.map((o) => o.valueTempSecond));
      let x0 = [0, max1];
      let y0 = [0, max2];

      // Add X axis

      let x = d3
        .scaleLinear()
        .domain(x0)
        // .range([startPoint, (width - (margin.left + margin.right))]);
        .range([startPoint, (width - (margin.left + margin.right))]);

      let y = d3
        .scaleLinear()
        .domain([0, max2])
        .range([(height - (margin.top + margin.bottom)), startPoint]);


      let newX = x;
      let newY = y;

      let brush = d3
        .brush()
        .extent([[0, 0], [width, height]])
        .on("end", brushended),
        idleTimeout,
        idleDelay = 350;

      // Add X axis
      let xAxis = SVG.append("g")
        .attr("class", "x axis")
        .attr("id", "axis--x")
        .attr("transform", "translate(0," + height + ")")
      // .call(d3.axisBottom(x));

      // Add Y axis
      let yAxis = SVG.append("g")
        .attr("class", "y axis")
        .attr("id", "axis--y")
      // .call(d3.axisLeft(y));


      // Add a clipPath: everything out of this area won't be drawn.
      let clip = SVG.append("defs")
        .append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", (width + startPoint))
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

      // Create the scatter letiable: where both the circles and the brush take place
      let scatter = SVG.append("g").attr("clip-path", "url(#clip)");
      this.scatter = scatter;
      // .attr("clip-path", "url(#clip)");



      function updateChart(newX, newY) {
        let t = SVG.transition().duration(750);

        // update axes with these new boundaries
        xAxis.transition(t).call(d3.axisBottom(newX));
        yAxis.transition(t).call(d3.axisLeft(newY));

        // update circle position
        scatter
          .selectAll("circle")
          .transition(t)
          .attr("cx", function (d) {

            return newX(d.valueTemp);
          })
          .attr("cy", function (d) {
            return newY(d.valueTempRandom);
            // return newY(d.valueTempSecond);
          });
      }

      // now the user can zoom and it will trigger the function called updateChart
      // A function that updates the chart when the user zoom and thus new boundaries are available
      function zoomed(e) {
        // recover the new scale
        newX = e.transform.rescaleX(x);
        newY = e.transform.rescaleY(y);

        // update circle position
        scatter
          .selectAll("circle")
          .attr("cx", function (d) {

            return newX(d.valueTemp);
          })
          .attr("cy", function (d) {
            return newY(d.valueTempRandom);
            // return newY(d.valueTempSecond);
          });
      }

      function idled() {
        idleTimeout = null;
      }

      function brushended(e) {
        let s = e.selection;

        if (!s) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
          newX = x.domain(x0);
          newY = y.domain(y0);
        } else {
          newX = x.domain([s[0][0], s[1][0]].map(newX.invert));
          newY = y.domain([s[1][1], s[0][1]].map(newY.invert));

          SVG.select(".brush").call(brush.move, null);
        }
        updateChart(newX, newY);
      }

      function start_brush_tool() {
        SVG.append("g")
          .attr("class", "brush")
          .call(brush);
      }

      function end_brush_tool() {
        SVG.selectAll("g.brush").remove();
      }

      let Tooltip = select("#scatter1Scroll")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        // .style("border", "solid")
        // .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

      let tipMouseover = function (d, datapoints) {
        Tooltip.style("opacity", 1)
          .style("visibility", "visible")
          .html(

            `<div class="scatter-main">
              <div class="scatter-header">${datapoints.topicName}</div> 
              <div class="scatterbody-content"> 
                <div class="d-flex ">
                  <div style="width:5%">
                 
                  </div>
                  <div  style="width:75%">
                    <div class="scatter-texthead d-flex align-items-start">Tests</div>
                  </div>
                  <div style="width:20%" class="scatter-testnum">${datapoints.totalNumberOfTest} </div>
                </div>
              
                <div class="mt-2"> 
                  <div class="d-flex ">
                    <div style="width:5%"></div>
                    <div  style="width:75%">
                    <div class="scatter-texthead  d-flex align-items-start">Candidates</div>
                  
                  </div>
                  <div style="width:20%" class="scatter-testnum">${datapoints.uniqueTotalCandidates} </div>
                </div>

                <div class="mt-2"> 
                  <div class="d-flex ">
                    <div style="width:5%"></div>
                    <div  style="width:75%">
                    <div class="scatter-texthead  d-flex align-items-start">Currently Taking Test</div>
                    
                  </div>
                  <div style="width:20%" class="scatter-testnum">${datapoints.submitted} </div>
                </div>
              </div>
            </div>`
          )
          .style("left", d.pageX - 170 + "px")
        const tooltipHeight = Tooltip.node().getBoundingClientRect().height;
        const tooltipBottomPosition = d.pageY + 200 + tooltipHeight;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;
        if (tooltipBottomPosition < screenHeight) {

          Tooltip.style("top", d.pageY - 150 - tooltipHeight + "px");
        } else {

          Tooltip.style("top", d.pageY - 460 + "px");
        }
        select(this)
          .attr("r", function (d) {
            return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);

            // return (radiusScale(d.uniqueTotalCandidates) + 5);
            // add mpg
          })
          .style("stroke", function (d) {
            return d.active ? "#bcb4fe" : "#D0DFC5";
          })
          .style("stroke-width", 5)

          .style("opacity", 0.5);
        Tooltip.style("display", "block");
      };

      let tipMouseout = function (d) {
        Tooltip.style("opacity", 0);
        select(this)
          .attr("r", function (d) {
            return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);

            // return radiusScale(d.uniqueTotalCandidates);
            // add mpg
          })
          .style("fill", function (d) {
            return d.active ? "#8676FF" : "#BCCBB1";
          })
          .style("stroke", "none")
          .style("opacity", 0.7);
        Tooltip.style("display", "none");
      };

      let radiusScale = d3
        .scaleSqrt()
        // .scaleSequentialSqrt()        
        // .domain(
        //   extent(data, function (d) {

        //     // return d.numberOfActiveTest;
        //     return d.totalNumberOfTest;
        //   })
        // )
        .domain([0, d3.max(data, function (d) { return d.totalNumberOfTest; })])

        .range([0, startPoint]);


      scatter
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "pointer")
        .attr("cx", function (d) {

          return x(d.valueTemp);
        })
        .attr("cy", function (d) {

          return y(d.valueTempRandom);
          // return y(d.valueTempSecond);
        })
        // .attr("r", 8)
        .attr("r", function (d) {
          return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);
        })
        // .style("fill", "#61a3a9")
        .attr("fill", function (d) {
          return d.active ? "#8676FF" : "#BCCBB1";
        })
        .style("opacity", 0.7)
        .attr("id", function (d, i) {
          // Assign a unique ID to each circle based on its index
          return "circle" + i;
        })
        .on("mouseover", tipMouseover)

        .on("mousemove", function (event) {
          Tooltip
            .style("left", event.pageX - 170 + "px")
          const tooltipHeight = Tooltip.node().getBoundingClientRect().height;
          const tooltipBottomPosition = event.pageY + 200 + tooltipHeight;
          const screenHeight = window.innerHeight || document.documentElement.clientHeight;
          if (tooltipBottomPosition < screenHeight) {

            Tooltip.style("top", event.pageY - 150 - tooltipHeight + "px");
          } else {

            Tooltip.style("top", event.pageY - 460 + "px");
          }
        })
        .on("mouseout", tipMouseout);


      // this.toolTip = Tooltip;
      // this.otherMouseover("d",data[0])

    }, 100);
    return data;

  }


  otherMouseover(d, datapoints, num, data) {

    let id = '#circle' + num
    let Tooltip = select("#scatter1Scroll")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      // .style("border", "solid")
      // .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");


    let radiusScale = d3
      .scaleSqrt()
      // .scaleSequentialSqrt()        
      // .domain(
      //   extent(data, function (d) {

      //     // return d.numberOfActiveTest;
      //     return d.totalNumberOfTest;
      //   })
      // )
      .domain([0, d3.max(data, function (d) { return d.totalNumberOfTest; })])

      .range([0, 50]);

    this.scatter.select(id)
      .attr("r", function (d) {
        return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);
        // return 8
        // return (radiusScale(d.uniqueTotalCandidates) + 5);
        // add mpg
      })
      .style("stroke", function (d) {
        return d.active ? "#bcb4fe" : "#D0DFC5";
      })
      .style("fill", function (d) {
        return d.active ? "red" : "green";
      })
      .style("stroke-width", 5)

      .style("opacity", 0.5);
    // Tooltip.style("display", "block");
  };

  tipMouseoutZoom(data) {

    let radiusScale = d3
      .scaleSqrt()
      // .scaleSequentialSqrt()        
      // .domain(
      //   extent(data, function (d) {

      //     // return d.numberOfActiveTest;
      //     return d.totalNumberOfTest;
      //   })
      // )
      .domain([0, d3.max(data, function (d) { return d.totalNumberOfTest; })])

      .range([0, 50]);

    this.scatter.selectAll("circle")
      .attr("r", function (d) {
        return d.totalNumberOfTest > 0 ? radiusScale(d.totalNumberOfTest) : radiusScale(d.totalNumberOfTest + 1);

        // return radiusScale(d.uniqueTotalCandidates);
        // add mpg
      })
      .style("fill", function (d) {
        return d.active ? "#8676FF" : "#BCCBB1";
      })
      .style("stroke", "none")
      .style("opacity", 0.7);
  };
}


// /*
//  For Test Stats

class testBarChart {
  async myDataTest(user, max_val, allBarData, xScaleDomain) {
    script.barData = [];
    script.allData = [];
    script.allData = user;

    script.max = max_val > 0 ? max_val : 1;
    allBarData.forEach((element) => {
      script.barData.push(element);
    });
    document.getElementById("testGraph").innerHTML = "";

    //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
    this.testGraphHorizontal(xScaleDomain, user);
  }

  testGraphHorizontal(xScaleDomain, user) {
    let circleNumber = user;
    let heightOfScreen =
      window.innerHeight
      || document.documentElement.clientHeight ||
      document.body.clientHeight;

    let len;
    let svgHeight;
    const rectWidth = 50;
    const barWidth = 12;

    if (heightOfScreen > 1000) {
      svgHeight = 400;
      len = 2 * (script.allData.length * rectWidth);
    }


    //Normal Screen
    // else if (heightOfScreen > 900) {
    //   svgHeight = 300;
    //   len = 3.5* (script.allData.length * rectWidth);
    // }

    // for 110 and 125
    else if (heightOfScreen >= 700) {
      svgHeight = 300;
      len = 3.5 * (script.allData.length * rectWidth);
    }

    //for 150
    else if (heightOfScreen >= 600) {
      svgHeight = 200;
      len = 2.3 * (script.allData.length * rectWidth);
    }

    else if (heightOfScreen >= 500) {
      svgHeight = 210;
      len = 1.8 * (script.allData.length * rectWidth);
    }
    else {
      svgHeight = 200;
      len = 1.5 * (script.allData.length * rectWidth);
    }
    // svgHeight = (heightOfScreen >= 1800) ? 800 : (heightOfScreen >= 1400) ? 600 :  (heightOfScreen >= 800) ? 220: 200;

    // len = 2.8 * (script.allData.length * rectWidth);
    // }


    let margin = { top: 10, right: 35, bottom: 45, left: 35 },


      height = svgHeight - margin.bottom,
      width = len + (2 * rectWidth);
    const leftExtra = 12;
    const topExtra = 5;


    // For making the svg
    const svg1 = select("#testGraph")
      .classed("svg-container", true)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
    // .style("background-color", "red");

    //SCALES START
    const req_g = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

    if (script.max % 5 !== 0) {
      script.max = script.max + (5 - (script.max % 5));
    }

    let xScale = scaleLinear()
      .domain([0, script.max])
      .range([0, len]);

    const yScale = d3.scalePoint()
      .domain(xScaleDomain)
      .range([margin.left, (svgHeight - margin.bottom - topExtra)]);

    const xScale1 = scaleLinear()
      .domain([0, script.max])
      .range([0, len])
      .nice();

    const x_axis = axisBottom(xScale)
      .tickSize(0)
      .ticks(script.max < 5 ? script.max : 5),
      xAxisTranslate = svgHeight - (margin.top + topExtra + 5);

    const y_axis = axisLeft(yScale)
      // .tickSize(-(len))
      .tickSize(0)
      .tickFormat(function (d) {
        if (d.length > 10) {
          return d.slice(0, 9) + "..";
        } else {
          return d;
        }
      });


    const xScale4Axes = scaleLinear()
      .domain([0, script.max])
      .range([(-margin.left + leftExtra + 11), len])

    const yScale4Axes = d3.scalePoint()
      .domain(xScaleDomain)
      .range([(5), svgHeight - (margin.bottom - 15)]);


    const xAxis = axisBottom(xScale4Axes)
      .tickFormat("")
      .tickSize(0)

    const yAxis = axisLeft(yScale4Axes)
      .tickFormat("")
      .tickSize(0)

    const g = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left + margin.bottom + leftExtra) + "," + xAxisTranslate + ")");
    // .attr("transform","translate(150,150)");
    g.append("g")
      .attr("class", "bar-x-axis")
      .call(x_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Poppins")
      .style("font-weight", "500")
      .style("font-size", "12px")
      .attr("transform", function (d) {
        return ("translate(" + 0 + "," + topExtra + ")")
      });
    g.select("path,line").remove();
    // g.select('.domain').attr('stroke-width', 0);

    req_g
      .append("g")
      .attr("class", "bar-x-axis")
      .attr("transform", "translate(" + (margin.left + 10) + "," + 0 + ")")
      // .attr("transform", "translate(5,0)")
      .call(y_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Poppins")
      .style("font-weight", "500")
      .style("font-size", "13px")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(" + (5) + "," + (-topExtra) + ")");
    // d3.select(".domain").remove();
    d3.select("path,line").remove();


    g.append("g")
      .attr("class", "bar-x-axis")
      .call(xAxis)
    // .style("color", "#A3A3A3")


    req_g
      .append("g")
      .attr("class", "bar-x-axis")
      .attr("transform", "translate(" + (margin.left + 10) + "," + 0 + ")")
      // .attr("transform", "translate(5,0)")
      .call(yAxis)
    // .style("color", "#A3A3A3")


    //SCALES END


    const t = select("svg1").transition().duration(2000);

    const g1 = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left + margin.bottom + leftExtra) + "," + (-margin.top - topExtra) + ")");

    const color = d3.scaleOrdinal().range(["#4EF085", "#FFA031", "#BF9BED", "#D66E6E", "#FF8686"]);

    const rect = g1
      .selectAll("rect")
      .data(script.allData, (d) => d)
      .join(
        (enter) => {
          const rect = enter
            .append("rect")
            .attr("class", "testBar")
            .attr("fill", "#1DD1A1")
            .attr("x", (d, i) => i * rectWidth)
            .attr("y", function (p) {
              return (height);
            })
            .attr("height", rectWidth - barWidth)

            .attr("width", function (d) {
              return 0;
            })
            .attr("transform", "translate(" + 0 + "," + 0 + ")")
            //mose over start
            .on("mouseover", function (event, d) {
              g1
                .append("circle")
                .attr("transform", "translate(" + topExtra + "," + 0 + ")")
                .attr("cy", () => yScale(d.testName) + ((rectWidth - barWidth) / 2))
                .attr("cx", () => {

                  return (xScale(d.candidateCount))
                }

                )
                .attr("r", 8)
                // .attr("fill", "#3379B3")
                .attr("fill", function (data, i) {
                  return color(d.id);
                })
                .attr("stroke-width", function () {
                  return 4;
                })
                .attr("stroke", "white");
              tooltip
                .style("top", event.pageY - 15 + "px")
                .style("left", event.pageX + 15 + "px")
                // .html(`${d.count}`)
                .html(
                  `<div class="countDiv">
                  <div class="DisplayTestName">${d.testName} ${d.candidateCount}
                  </div>
                  </div>`
                )


                .style("visibility", "visible")
                .style("display", "inline-block");
              select(this).attr("fill", function (data, i) {
                return color(d.id);
              })
            })
            .on("mousemove", function (event) {
              tooltip
                .style("top", event.pageY - 25 + "px")
                .style("left", event.pageX + 15 + "px")
            })

            .on("mouseout", function (d) {
              tooltip.html(``).style("visibility", "hidden");
              select(this).attr("fill", "#1DD1A1");
              tooltip.style("display", "none");
              g1.select("circle").remove();
              tooltip.style("display", "none");
              d3.selectAll(".d3-tooltip").style("display", "none");;
            });

          return rect;
        },
        (update) => update,
        (exit) => {
          exit
            .transition(t)
            .attr("x", function (p) {
              return svgHeight - margin.bottom - xScale(p);
            })
            .attr("height", 0)
            .remove();
        }
      )
      .transition()
      .duration(2000)
      .delay((d, i) => i * 10)
      .attr("y", function (d, i) {

        return yScale(d.testName)
      })
      .attr("x", function (p) {
        return (xScale(0));
      })
      .attr("width", function (d) {
        return (d.candidateCount == 0 ? xScale(0.4) : xScale(d.candidateCount));
      })
      .attr("height", rectWidth - barWidth);


    const g2_diffColor = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left + margin.bottom + 5) + "," + (-margin.top - topExtra) + ")");

    g2_diffColor.selectAll("topicBar")
      .data(script.allData, (d) => d)
      .enter()
      .append("rect")
      .attr("y", function (d, i) {
        return yScale(d.testName)
      })
      .attr("x", function (p) {
        return (xScale(0));
      })
      .attr("width", function (d) {
        return 4;
      })
      .attr("height", rectWidth - barWidth)
      .attr("fill", function (data, i,) {
        return color(data.id);
      });

    const tooltip = select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")

  }
}
// */


// /*

// For Topic Stats
class topicBarChart {
  async myData(user, max_val, allBarData, xScaleDomain) {
    script.barData = [];
    script.allData = [];
    script.allData = user;
    script.max = max_val;
    allBarData.forEach((element) => {
      script.barData.push(element);
    });
    document.getElementById("topicGraph").innerHTML = "";

    //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
    this.makegraph(xScaleDomain, user);
  }

  makegraph(xScaleDomain, user) {
    let circleNumber = user
    let heightOfScreen =
      window.innerHeight
      || document.documentElement.clientHeight ||
      document.body.clientHeight;

    let len;
    let svgHeight;
    const rectWidth = 50;
    const barWidth = -20;
    if (heightOfScreen > 1000) {
      svgHeight = 400;
      len = 4 * (script.allData.length * rectWidth);
    }


    //Normal Screen
    // else if (heightOfScreen > 900) {
    //   svgHeight = 300;
    //   len = 3.5* (script.allData.length * rectWidth);
    // }

    // for 110 and 125
    else if (heightOfScreen >= 700) {
      svgHeight = 300;
      len = 3.5 * (script.allData.length * rectWidth);
    }

    //for 150
    else if (heightOfScreen >= 600) {
      svgHeight = 200;
      len = 2.3 * (script.allData.length * rectWidth);
    }

    else if (heightOfScreen >= 500) {
      svgHeight = 210;
      len = 1.8 * (script.allData.length * rectWidth);
    }
    else {
      svgHeight = 200;
      len = 1.5 * (script.allData.length * rectWidth);
    }
    // svgHeight = (heightOfScreen >= 1800) ? 800 : (heightOfScreen >= 1400) ? 600 :  (heightOfScreen >= 800) ? 220: 200;

    // len = 2.8 * (script.allData.length * rectWidth);
    // }


    // let margin = { top: 10, right: 35, bottom: 45, left: 40 },
    let margin = { top: 10, right: 35, bottom: 45, left: 30 },

      height = svgHeight - margin.bottom,
      width = len + (4 * rectWidth);
    const extra = 1;

    // For making the svg
    const svg1 = select("#topicGraph")
      .classed("svg-container", true)
      .append("svg")
      // .attr("height", (svgHeight))
      // .attr("width", width)
      .attr("viewBox", `0 0 ${width} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
    // .classed("svg-content-responsive", true)
    // .style("background-color", "red");

    //SCALES START
    const req_g = svg1
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (script.max % 5 !== 0) {
      script.max = script.max + (5 - (script.max % 5));
    }

    let xScale = d3.scalePoint()
      .domain(xScaleDomain) //variable1??
      .range([40, len]);

    let xScale1 = d3.scaleLinear()
      .domain([0, 5]) //variable1??
      .range([0, len]);

    const yScale = scaleLinear()
      .domain([0, script.max])
      .range([0, svgHeight - margin.bottom - extra]);

    const yScale1 = scaleLinear()
      .domain([0, script.max])
      .range([height, 0])
      .nice();

    const x_axis = axisBottom(xScale).tickSize(-height).tickFormat(function (d) {
      // Replace long names with shortened versions
      if (d.length > 20) {
        return d.slice(0, 20) + "..";
      } else {
        return d;
      }
    }),
      xAxisTranslate = svgHeight - margin.bottom + margin.top;

    const y_axis = axisLeft(yScale1)
      .tickSize(-(len + 150))
      .ticks(script.max < 5 ? script.max : 5);

    const g = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left + margin.right + 10) + "," + xAxisTranslate + ")");
    // .attr("transform","translate(150,150)");
    g.append("g")
      .attr("class", "bar-x-axis")
      .call(x_axis)
      .selectAll("text")
      // .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Poppins")
      .style("font-weight", "500")
      .style("font-size", "12px")
      // .attr("dx", "-.8em")
      // .attr("dy", ".15em")
      // .attr("transform", "rotate(-30)");
      .attr("transform", function (d) {
        return ("translate(" + 0 + "," + 5 + ")")
      });
    // d3.selectAll("path,line").remove();
    g.select('.domain').attr('stroke-width', 0);

    req_g
      .append("g")
      .attr("class", "bar-x-axis")
      .attr("transform", "translate(5,0)")
      .call(y_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(" + 0 + "," + extra + ")");
    d3.select(".domain").remove();
    d3.select("path,line").remove();

    // req_g.select('.domain').attr('stroke-width', 0);
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
      .attr("transform", "translate(" + 35 + "," + margin.top + ")");

    const color = d3.scaleOrdinal().range(["#4EF085", "#FFA031", "#BF9BED", "#D66E6E", "#FF8686"]);
    // const deepColors = d3.scaleOrdinal().range(["#12B449", "#CD6E00", "#8D69BB", "#A43C3C", "#CD5454" ]);

    const rect = g1
      .selectAll("rect")
      .data(script.allData, (d) => d)
      .join(
        (enter) => {
          const rect = enter
            .append("rect")
            .attr("class", "topicBar")
            .attr("width", rectWidth - barWidth)
            .attr("fill", function (d, i) {
              return color(i);
            })
            .attr("x", (d, i) => i * rectWidth)
            .attr("y", function (p) {
              return height;
            })

            .attr("height", function (d) {
              return 0;
            })
            .attr("transform", "translate(" + 5 + "," + 0 + ")")
            //mose over start
            .on("mouseover", function (event, d) {
              g1
                .append("circle")
                .attr("transform", "translate(" + 5 + "," + 0 + ")")
                .attr("cx", () => xScale(d.topicName) + ((rectWidth - barWidth) / 2))
                .attr("cy", () => {

                  return (height - yScale(d.candidateCount))
                }

                )
                .attr("r", 12)
                // .attr("fill", "#3379B3")
                .attr("fill", function (data, i) {
                  return color(d.id);
                })
                .attr("stroke-width", function () {
                  return 6;
                })
                .attr("stroke", "white");
              tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
                // .html(`${d.count}`)
                .html(
                  `<div class="countDiv">
                <div class="DisplayTopicName">${d.topicName}
                </div>
                </div>`
                )


                .style("visibility", "visible")
                .style("display", "inline-block");
              select(this).attr("fill", function (data, i) {
                return color(d.id);
              })
            })
            .on("mousemove", function (event) {
              tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
            })

            .on("mouseout", function (d) {
              tooltip.html(``).style("visibility", "hidden");
              select(this).attr("fill", function (data, i) {
                return color(data.id);
              });
              tooltip.style("display", "none");
              g1.select("circle").remove();
              tooltip.style("display", "none");
              d3.selectAll(".d3-tooltip").style("display", "none");;
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
      .attr("x", function (d, i) {
        return xScale(d.topicName)
      })
      .attr("y", function (p) {
        return height - yScale(p.candidateCount);
      })
      .attr("height", function (d) {
        return yScale(d.candidateCount);
      })
      .attr("width", rectWidth - barWidth);


    g1.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', (width - 50))
      .attr('height', height)
      .attr('stroke', '#EEF0F3')
      .attr('fill', 'none');

    const tooltip = select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
    // .style("padding", "10px");
    // .style("background", "#56ecb2")
    // .style("border-radius", "5px")
    // .style("color", "#fff")
    // .text("a simple tooltip");



    function linechart1() {
      let x = xScale,
        y = scaleLinear()
          .domain([0, script.max])
          .range([(height + extra), 0]),


        line = d3Line
          .line()
          .x(function (d) {
            return x(d.topicName);
          })
          .y(function (d) {
            return y(d.candidateCount);
          });
      // .curve(curveBasis);

      const g2 = svg1
        .append("g")
        .attr("transform", "translate(" + (margin.left + margin.right + 10) + "," + margin.top + ")");
      const path = g2
        .append("path")
        .datum(script.allData)
        .attr("fill", "none")
        .attr("stroke", "#D4D4D4")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);
    }

    this.makegraph.linechart1 = linechart1;

  }
}

// */


// /*
//For Active Progress
class gradientChart {
  // async createDensity(id, datass) {
  //   var svgWidth;
  //   var svgHeight = 270;
  //   if (document.getElementById(id).innerHTML != "") {
  //     document.getElementById(id).innerHTML = "";
  //   }
  //   const Data2 = datass;
  //   let lineChartData1 = Data2

  //   // lineChartData1 = { ...Data2 };



  //   const margin = {
  //     top: 25,
  //     bottom: 25,
  //     left: 25,
  //     right: 20,
  //   };


  //   // var widthss = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  //   if (window.innerWidth >= 1700) {
  //     svgWidth = window.innerWidth - 900
  //     // svgHeight = 250
  //   }
  //   else if (window.innerWidth >= 1500) {
  //     svgWidth = window.innerWidth - 800
  //   }
  //   else if (window.innerWidth >= 1300) {
  //     svgWidth = window.innerWidth - 700;
  //   }
  //   else if (window.innerWidth >= 1100) {
  //     svgWidth = window.innerWidth - 400;
  //   }




  //   const width1 = svgWidth - margin.left - margin.right;
  //   const height1 = svgHeight - margin.top - margin.bottom;

  //   const createGradient = select => {
  //     const gradient = select
  //       .select('defs')
  //         .append('linearGradient')
  //           .attr('id', 'gradient')
  //           .attr('x1', '0%')
  //           .attr('y1', '100%')
  //           .attr('x2', '0%')
  //           .attr('y2', '0%');

  //     gradient
  //       .append('stop')
  //         .attr('offset', '0%')
  //         .attr('style', 'stop-color:#F4BE37;stop-opacity:0.03');

  //     gradient
  //       .append('stop')
  //         .attr('offset', '100%')
  //         .attr('style', 'stop-color:#F8DD9C;stop-opacity:.2');
  //   }


  //   const createGlowFilter = select => {
  //     const filter = select
  //       .select('defs')
  //         .append('filter')
  //           .attr('id', 'glow')

  //     filter
  //       .append('feGaussianBlur')
  //         .attr('stdDeviation', '4')
  //         .attr('result', 'coloredBlur');

  //     const femerge = filter
  //       .append('feMerge');

  //     femerge
  //       .append('feMergeNode')
  //       .attr('in', 'coloredBlur');
  //     femerge
  //       .append('feMergeNode')
  //       .attr('in', 'SourceGraphic');
  //   }

  //   // /*original
  //   const svg = d3
  //     .select("#topicGraph")
  //     .classed("svg-container", true)
  //     .append("svg")
  //     .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)

  //     .attr("preserveAspectRatio", "xMinYMin meet")
  //     // .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
  //     .classed("svg-content-responsive", true);

  //     svg.append('defs');
  //     svg.call(createGradient);
  //     // svg.call(createGlowFilter);

  //   var ctrl, key;

  //   // Attach the resize event listener
  //   document.body.addEventListener("keydown", function (ev) {
  //     ev = ev || window.ev;
  //     key = ev.which || ev.code;
  //     ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
  //     window.addEventListener("resize", resize);

  //     // }
  //   }, false);

  //   function resize() {

  //     if (ctrl && key === 109 && window.innerWidth > 1900) {

  //       var containerWidth = parseInt(d3.select("#topicGraph").style("width"));
  //       var containerHeight = parseInt(d3.select("#topicGraph").style("height"));

  //       svg.attr("viewBox", "0 0 " + svgWidth * containerWidth / (svgWidth - 100) + " " + svgHeight * containerHeight / svgHeight);
  //     }
  //     else if (window.innerWidth > 1700) {

  //       svg.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
  //       if (window.innerHeight > 950) {
  //         svg.attr("viewBox", `0 0 ${svgWidth + 200} ${svgHeight + 50}`);
  //       }

  //     }
  //     else {

  //       svg.attr("viewBox", `0 0 ${svgWidth + 20} ${svgHeight + 50}`)

  //     }
  //   }


  //   const g = svg
  //     .append("g")
  //     // .attr('transform', `translate(${margin.left}, ${margin.top})`);

  //     .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

  //   const xAxisTranslate = svgHeight - margin.bottom;

  //   const g1 = svg
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")");

  //   const parsedData1 = lineChartData1.map((company) => ({

  //     ticker: company.ticker,
  //     values: lineChartData1.map((val) => ({
  //       close: val.close,
  //       // date: parseTime(val.date)
  //       date: val.date,
  //     })),
  //   }));      //GOOD


  //   let xScaleDomain1 = parsedData1[0].values.map((d) => d.date);

  //   const xScale = d3.scalePoint()
  //     .domain(xScaleDomain1)
  //     .range([0, width1]);

  //   const xScale1 = d3.scalePoint().domain(xScaleDomain1).range([0, width1 - 15]);


  //   const xScale11 = scaleLinear()
  //     .domain([1, 7])
  //     .range([0, width1])
  //     .nice();


  //   const max1 = Math.max(...parsedData1[0].values.map((o) => o.close));

  //   let largest = Math.max(max1);
  //   if (largest % 5 !== 0) {
  //     largest = largest + (5 - (largest % 5));
  //     if (largest % 10 !== 0) {
  //       largest = largest + (largest % 10)
  //     }
  //   }
  //   // else{
  //   //   largest = largest + (5 - (largest % 5));

  //   // }


  //   const yScale_grid = d3
  //     .scaleLinear()
  //     // .domain( largest<=10?
  //     //   [0, 5]:largest<=20?[0, 4]:[0, 5]
  //     //   )
  //     .domain(largest <= 10 ?
  //       [0, 5] : largest <= 15 ? [0, 3] : largest <= 20 ? [0, 4] : [0, 5]
  //     )
  //     .range([height1, 0])
  //     .nice();

  //   const yScale = d3
  //     .scaleLinear()
  //     .domain([0, largest])
  //     .range([height1, 0]);
  //   // .domain([5, largest])
  //   // .range([height1, 5]);

  //   const yScale1 = d3
  //     .scaleLinear()
  //     .domain([0, largest])
  //     .range([(height1 - 8), 0]);

  //   // const yScale2 = d3.scaleLinear().domain([ 0,largest]).range([height1, -(margin.top-4)]);

  //   const x_axis = axisBottom(xScale1).tickSizeOuter(0)
  //     .tickSizeInner(0);

  //   const xGridLine = axisBottom(xScale11)
  //     .scale(xScale11)
  //     .tickSize(-height1)
  //     .ticks(7)
  //     .tickFormat("");


  //   svg
  //     .append("g")
  //     .classed("gridLine", true)
  //     .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")")
  //     .style("color", "#DCDCDC")
  //     .attr("opacity", "0.5")
  //     .call(xGridLine)




  //   const yGridLine = axisLeft(yScale_grid)
  //     .scale(yScale)
  //     .tickSize(-width1, 0, 0)
  //     .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
  //     .tickFormat("");


  //   g
  //     .append("g")
  //     .classed("gridLine", true)
  //     // .attr("transform", "translate(25,0)")
  //     .style("color", "#DCDCDC")
  //     .attr("opacity", "0.5")
  //     .call(yGridLine);

  //   const y_axis = axisLeft(yScale)
  //     // .tickSize(-width1)
  //     .scale(yScale)
  //     .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
  //     .tickSizeOuter(0)
  //     .tickSizeInner(0);

  //   g
  //     .append("g")
  //     .attr("class", "y axis")
  //     // .attr("transform", "translate(" + 25 + "," + 0 + ")")
  //     .style("color", "#A3A3A3")
  //     .call(y_axis);



  //   g.selectAll(".tick")
  //     .filter(function (d) { return d === 0; })
  //     .remove();

  //   g.selectAll('.domain').attr('stroke-width', 0);


  //   var x = xScale,
  //     y = yScale1;

  //   //LINE 1 STARTS
  //   const line1 = d3Line
  //     .line()
  //     // .interpolate("basis")
  //     .x(function (d) {
  //       return x(d.date)
  //     })
  //     .y(function (d) {
  //       return y(d.close)
  //     })
  //     // .curve(curveBasis);
  //     .curve(d3.curveCatmullRom.alpha(0.8));

  //   // /* cooment out
  //   g.selectAll(".line")
  //     .data(parsedData1)
  //     .enter()
  //     .append("path")
  //     .attr("d", (d) => {
  //       const lineValues1 = line1(d.values).slice(1);
  //       const splitedValues1 = lineValues1.split(",");

  //       return `M0,${height1},${lineValues1},l0,${height1 - splitedValues1[splitedValues1.length - 1]
  //         }`;
  //     })
  //     // .style('fill', '#E31A1C')
  //     // .style("fill", "#C3FDB8")
  //     .style('fill', 'url(#gradient)')

  //     .style("opacity", 0.4);


  //   // comment out end
  //   // */

  //   g.selectAll(".line")
  //     .data(parsedData1)
  //     .enter()
  //     .append("path")
  //     .attr("d", (d) => line1(d.values))
  //     .attr("stroke-width", "1")
  //     .style("fill", "none")
  //     .style("filter", "url(#glow)")
  //     .attr("stroke", "#F4BE37");







  //   //LINE 1 ENDS

  //   g1.append("g")
  //     .attr("class", "bar-x-axis")
  //     .call(x_axis)
  //     .style("color", "#A3A3A3")
  //     .selectAll("text")
  //     .text(function (d) {
  //       return d.split(',')[0]
  //     })
  //     // .style("text-anchor", "end")
  //     .style("color", "#A3A3A3")
  //     // .style("font", "Roboto")
  //     .attr("dx", ".8em")
  //     .attr("dy", ".15em")
  //     // .attr("transform", "rotate(-5)")
  //     .attr("transform", "translate(" + 0 + "," + 5 + ")")
  //     ;
  //   g1.select('.domain').attr('stroke-width', 0)

  // }

  async createDensity(id, datass) {
    let svgWidth;
    let svgHeight = 200;
    if (document.getElementById(id).innerHTML != "") {
      document.getElementById(id).innerHTML = "";
    }

    const margin = {
      top: 25,
      bottom: 40,
      left: 45,
      right: 20,
    };


    // var widthss = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (window.innerWidth >= 1700) {
      svgWidth = window.innerWidth - 1320
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1500) {
      svgWidth = window.innerWidth - 800
    }
    else if (window.innerWidth >= 1300) {
      svgWidth = window.innerWidth - 700;
    }
    else if (window.innerWidth >= 1100) {
      svgWidth = window.innerWidth - 400;
    }


    const width1 = svgWidth - margin.left - margin.right;
    const height1 = svgHeight - margin.top - margin.bottom;


    let data = datass.map(d => {
      d['date'] = new Date(d['date']);
      // d['date'] = (d['date']);
      // d['close'] = d['close'] > 0 ? d['close'] : 0.5
      return d
    });

    const getX = d => d["date"];
    const getY = d => d["close"];

    const x = d3.scaleTime()
      .range([0, width1])
      .domain([
        d3.min(data, getX),
        d3.max(data, getX)
      ]);

    let maxV = Math.max(...data.map(o => o.close));
    let minV = Math.min(...data.map(o => o.close));

    minV = minMax(minV)
    function minMax(vals) {
      if (vals % 5 !== 0) {
        vals = vals - (vals % 5);
      }
      return vals;
    }

    const y = d3.scaleLinear()
      .range([height1, 0])
      .domain([
        minV,
        maxV
      ])
      .nice();

    const valueLine = d3.area()
      .curve(d3.curveBasis)
      .curve(d3.curveCatmullRom.alpha(0.8))
      .x(d => x(getX(d)))
      .y0(height1)
      .y1(d => y(getY(d)));



    // Attach the resize event listener
    document.body.addEventListener("keydown", function (ev) {
      ev = ev || window.ev;
      key = ev.which || ev.code;
      ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
      window.addEventListener("resize", resize);

      // }
    }, false);

    function resize() {

      if (ctrl && key === 109 && window.innerWidth > 1900) {

        var containerWidth = parseInt(d3.select("#topicGraph").style("width"));
        var containerHeight = parseInt(d3.select("#topicGraph").style("height"));

        svg.attr("viewBox", "0 0 " + svgWidth * containerWidth / (svgWidth - 100) + " " + svgHeight * containerHeight / svgHeight);
      }
      else if (window.innerWidth > 1700) {

        svg.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
        if (window.innerHeight > 950) {
          svg.attr("viewBox", `0 0 ${svgWidth + 200} ${svgHeight + 50}`);
        }

      }
      else {

        svg.attr("viewBox", `0 0 ${svgWidth + 20} ${svgHeight + 50}`)

      }
    }


    // /*original
    const svg = d3
      .select("#progressGraph")
      .classed("svg-container", true)
      .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)

      .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
      .classed("svg-content-responsive", true)
    // .style('background-color',"red");


    const defs = svg.append('defs');

    const graphArea = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    var ctrl, key;

    const bgGradient = defs
      .append('linearGradient')
      .attr('id', 'bg-gradient')
      .attr('gradientTransform', 'rotate(90)');


    const x_text = d3.scaleTime()
      .range([15, width1])
      .domain([
        d3.min(data, getX),
        d3.max(data, getX)
      ]);
    const xAxis = d3.axisBottom(x_text).tickSize([0]).ticks(data.length).tickFormat(function (d) {
      // Replace long names with shortened versions
      // return d.getFullYear()
      let xVals = (`${d.toLocaleString('default', { weekday: 'long' }).slice(0, 3)} , ${d.getDate()}`)
      // if (xVals.length > 5) {
      //   return xVals.slice(0, 5) + "..";
      // } else {
      //   return xVals;
      // }
      return xVals;
    });
    const yAxis = d3.axisLeft(y).tickSize([0, 0]).tickSize(-(width1)).ticks(5);

    graphArea
      .append('g')
      .attr('class', 'Xaxis')
      .attr('transform', `translate(0, ${height1 + 8})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .style("font-weight", "300")
      .style("font-size", "8px");





    graphArea
      .append('g')
      .attr('class', 'Yaxis')
      .call(yAxis)
      .style("color", "#E3E3E3")
      .attr("opacity", 1)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .style("font-weight", "400")
      .style("font-size", "12px")
      .attr("transform", function (d) {
        return ("translate(" + (-10) + "," + 0 + ")")
      });
    d3.selectAll(".domain").remove();
    // d3.select("path,line").remove();


    const xAxisLine = d3.axisBottom(x).tickSize([0]).ticks(data.length).tickFormat("")


    graphArea
      .append('g')
      .attr('class', 'Xaxis')
      .attr('transform', `translate(0, ${height1 + 5})`)
      .call(xAxisLine)
      .style("color", "#E3E3E3");

    bgGradient
      .append('stop')
      .attr('stop-color', '#F4BE37')
      .attr("stop-opacity", 0.45)
      .attr('offset', '0%');
    bgGradient
      .append('stop')
      .attr('stop-color', '#F4BE37')
      .attr("stop-opacity", 0)
      .attr('offset', '100%');

    defs
      .append('clipPath')
      .attr('id', 'clip-line-path')
      .append('path')
      .attr('d', valueLine(data))
      .attr('class', 'value-line')
      .attr("fill", "none")
      .attr("stroke", "#F8DD9C")
      .attr("stroke-width", 1.5);

    const clipPath = graphArea
      .append('g')
      .attr('clip-path', `url(#clip-line-path)`);

    const line = d3.line().curve(d3.curveBasis).curve(d3.curveCatmullRom.alpha(0.8))
      .x(d => x(getX(d)))
      .y(d => y(getY(d)))

    graphArea
      .append('path')
      .attr("fill", "none")
      .attr('d', line(data))
      .attr("stroke", "#F4BE37")
      .attr("stroke-width", 1.5)

    clipPath
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width1)
      .attr('height', height1)
      .style('fill', 'url(#bg-gradient)');





  }
}

// */

// /*

// For Donut chart 
class donoutChart {
  async donutGraph(grpCount, individualCount, TotalCount) {
    if (document.getElementById('donutChart').innerHTML != "") {
      document.getElementById('donutChart').innerHTML = "";
    }
    var radius = 75;
    var radius2 = 65;

    var dataset = {
      ages: [grpCount, individualCount],
    };        // for Orange Color Circle 
    var dataset2 = {
      ages: [grpCount, individualCount],
    };      // for Blue Color Circle 

    var color = d3.scaleOrdinal().range(["#FEC956", "none"]);
    const colors = d3.scaleOrdinal().range(["none", "#5782FF"]);



    var arc = d3Line.arc()
      .outerRadius(radius)
      .innerRadius(radius - 40);

    var arc2 = d3Line.arc()
      .outerRadius(radius2)
      .innerRadius(radius2 - 30);

    var pie = d3Line.pie()
      .sort(null)

    var pie2 = d3Line.pie()
      .sort(null)

    let svgWidth;
    let svgHeight = 200;
    // const svgHeight = 150;
    // radius = Math.min(script.svgWidth / 4, svgHeight) / 2;
    const start_point = script.svgWidth / 9;

    const margin = {
      top: 25,
      bottom: 40,
      left: 45,
      right: 20,
    };


    // var widthss = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (window.innerWidth >= 1700) {
      svgWidth = window.innerWidth - 1320
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1500) {
      svgWidth = window.innerWidth - 800
    }
    else if (window.innerWidth >= 1300) {
      svgWidth = window.innerWidth - 700;
    }
    else if (window.innerWidth >= 1100) {
      svgWidth = window.innerWidth - 400;
    }



    // Attach the resize event listener
    document.body.addEventListener("keydown", function (ev) {
      ev = ev || window.ev;
      key = ev.which || ev.code;
      ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
      window.addEventListener("resize", resize);

      // }
    }, false);


    const width1 = svgWidth - margin.left - margin.right;
    const height1 = svgHeight - margin.top - margin.bottom;



    var svg = d3.select("#donutChart").append("svg")
      .classed("svg-container", true)
      // .attr("width", radius * 2)
      // .attr("height", radius * 3)
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      // .style("background-color", "black")
      .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
      .classed("svg-content-responsive", true)
      .attr("class", "outerPie")
      .append("g")
      .attr("transform", "translate(" + radius * 3 + "," + radius + ")");

    var svg2 = d3.select(".outerPie").append("svg")
      .classed("svg-container", true)
      // .attr("width", radius * 2)
      // .attr("height", radius * 3)
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
      .classed("svg-content-responsive", true)
      .attr("class", "innerPie")
      .append("g")
      .attr("transform", "translate(" + radius * 3 + "," + radius + ")");

    var circle = d3.select('.innerPie').append("svg")
      .attr("class", "circle")
      .append('circle')
      .attr('cx', radius * 3)
      .attr('cy', radius)
      .attr('r', 30)
      .attr('stroke', '#E5E4E2')
      .attr('fill', 'none');




    svg2
      .append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      // .attr("style", "font-family:Poppins")
      .style("font-family", "Poppins")
      .style("font-weight", "500")

      .attr("font-size", "15px")
      .attr("fill", "#454459")

      .attr("transform", "translate(" + 0 + "," + (-5) + ")")
      // .text(` ${dataset.ages[0] + dataset.ages[1]} `);
      .text(` ${TotalCount} `);


    var text = d3.select('.circle').append("svg").append("svg:text")
      .attr("fill", "#454459")
      .style("font", "Roboto")
      .style("font-family", "Poppins")
      .style("font-weight", "400")
      .style("font-size", "13px")
      .attr("opacity", 0.7)
      .attr("x", radius * 2.8)
      .attr("y", radius + 15)

      .text("Total")


    svg2.selectAll('text')
      .style("color", "red");


    let div = d3.select("body").append("div").attr("class", "toolTipCircle");

    let path = svg.selectAll("path")
      .data(pie(dataset.ages))
      .enter().append("path")
      .attr("fill", function (d, i) { return color(i); })
      .attr("d", arc)
      .on("mousemove", function (event, d) {
        d3.select('.circle').append("svg").append("svg")
          .append("circle")
          .attr("transform", "translate(" + 0 + "," + 0 + ")")
          .attr("cy", () => event.pageY - 25)
          .attr("cx", () => {
            return (event.pageX + 10)
          }

          )
          .attr("r", 8)
          .attr("fill", "#3379B3")

          .attr("stroke-width", function () {
            return 4;
          })
          .attr("stroke", "white");
        div.style("left", event.pageX + 10 + "px");
        div.style("top", event.pageY - 25 + "px");
        div.style("display", "inline-block");
        div.html("Groups" + "<br>" + (d.data));
      })
      .on("mouseout", function (d) {
        div.style("display", "none");
      });

    let path2 = svg2.selectAll("path")
      .data(pie2(dataset2.ages))
      .enter().append("path")
      .attr("fill", function (d, i) { return colors(i); })
      .attr("d", arc2).on("mousemove", function (event, d) {
        div.style("left", event.pageX + 10 + "px");
        div.style("top", event.pageY - 25 + "px");
        div.style("display", "inline-block");
        div.html("Candidates" + "<br>" + (d.data));
      })
      .on("mouseout", function (d) {
        div.style("display", "none");
      });
  }



  // path.on("mouseout", function(d){
  //     div.style("display", "none");
  // });
}

// */


// /*

class multiBarChart {
  async multipleChart(myData) {
    if (document.getElementById('multiBarGraph').innerHTML != "") {
      document.getElementById('multiBarGraph').innerHTML = "";
    }

    let heightOfScreen =
      window.innerHeight
      || document.documentElement.clientHeight ||
      document.body.clientHeight;
    let len;
    let svgHeight;


    // var data = d3.csvParse('name,score1,score2,score3\njohn,100,80,70\njack,50,60,70\njill,120,130,140\njane,150,140,100\njohn,100,80,70\njack,50,60,70\njill,120,130,140\njane,150,140,100\njohn,100,80,70\njack,50,60,70\njill,120,130,140\njane,150,140,100\njohn,100,80,70\njack,50,60,70\njill,120,130,140\njane,150,140,100\njohn,100,80,70\njack,50,60,70\njill,120,130,140\njane,150,140,100\njohn,100,80,70\njack,190,180,170\n');
    let data = myData
    const barWidth = 40;
    const subWBaridth = 15;
    const rectWidth = barWidth;
    if (heightOfScreen > 1000) {
      svgHeight = 300;
      len = ((data.length * 3) * (rectWidth + 5));
    }


    //Normal Screen
    // else if (heightOfScreen > 900) {
    //   svgHeight = 300;
    //   len = 3.5* (script.allData.length * rectWidth);
    // }

    // for 110 and 125
    else if (heightOfScreen >= 700) {
      svgHeight = 300;
      len = ((data.length * 3) * (rectWidth + 13));
    }

    //for 150
    else if (heightOfScreen >= 600) {
      svgHeight = 200;
      len = 2.3 * (data.length * rectWidth);
    }

    else if (heightOfScreen >= 500) {
      svgHeight = 210;
      len = 1.8 * (data.length * rectWidth);
    }
    else {
      svgHeight = 200;
      len = 1.5 * (data.length * rectWidth);
    }

    // 1. Set canvas margins
    var margin = {
      top: 45,
      right: 50,
      bottom: 70,
      left: 70
    };
    // let width = len + (2 * rectWidth);
    var width = len + (rectWidth);
    var height = svgHeight - margin.top - margin.bottom;
    // var width = 1200 - margin.left - margin.right;
    // var height = 300 - margin.top - margin.bottom;

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // 2. Set x and y scales
    var xScale = d3.scaleBand().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    // 3. Create svg object
    var svg = d3.select('#multiBarGraph').append('svg')
      .attr('width', width + margin.left - 20)
      .attr('height', height + margin.top + margin.bottom)
      // .style("background-color", "red")
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)


    // var svg = d3.select('#topicGraph') .classed("svg-container", true)
    //       .append("svg")
    //       .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${svgHeight + margin.bottom + margin.top}`)
    //       .attr("preserveAspectRatio", "xMinYMin meet")
    //     .style("background-color", "red")
    //     .append('g')
    //     .attr('transform', `translate(${margin.left}, ${margin.top})`)



    // LOAD data - we are using csvParse because CodePen cannot load external files, normally we would fetch external file using .csv
    // 4. Fetch and handle data
    // d3.csv(DATA, function(data){
    // handle error
    // if(err) throw err;

    // parseInt data
    data.forEach(function (d) {
      d.score1 = parseInt(d.score1);
      d.score2 = parseInt(d.score2);
      d.score3 = parseInt(d.score3);
    });

    // Use JS to sort array by score
    // data = data.sort(function(a, b) {
    //   return a.score1 - b.score1
    // });

    const max1 = Math.max(...data.map((o) => o.score1))
    const max2 = Math.max(...data.map((o) => o.score2))
    const max3 = Math.max(...data.map((o) => o.score3))
    //scale axis based on data
    xScale.domain(data.map(d => d.name));

    yScale.domain([0, Math.max(max1, max2, max3)]);

    // yScale.domain([0, 200]);

    // Create new bar groups appending data and setting starting y index position (we use enter() join to create new 'g' for data point if non-existent)
    // var barWidth = (width / data.length) /3; // bar height equidistant across graph height


    var bar = svg.selectAll('.bar1')
      .data(data, d => d.score1)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${(i * 4) * barWidth + 5}, 0)`)
      .attr('class', 'bar1')

    var bar2 = svg.selectAll('.bar2')
      .data(data, d => d.score2)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${barWidth + (i * barWidth * 4) - 6},0)`)
      .attr('class', 'bar2');

    var bar3 = svg.selectAll('.bar3')
      .data(data, d => d.score3)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${(barWidth * 2) + (i * barWidth * 4) - 16},0)`)
      .attr('class', 'bar3');

    var bar4 = svg.selectAll('.bar4')
      .data(data, d => d.score1)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${(i * 4) * barWidth - 12}, -${40})`)
      .attr('class', 'bar4');


    // Append a graph to each bar 'g' setting the width and height


    const defs = svg.append('defs');

    const bgGradient = defs
      .append('linearGradient')
      .attr('id', 'bg-gradient')
      .attr('gradientTransform', 'rotate(90)');
    bgGradient
      .append('stop')
      .attr('stop-color', '#FDF9F0')
      .attr('offset', '0%');
    bgGradient
      .append('stop')
      .attr('stop-color', '#FFCF26')
      .attr('offset', '100%');


    const bgGradient2 = defs
      .append('linearGradient')
      .attr('id', 'bg-gradient2')
      .attr('gradientTransform', 'rotate(90)');
    bgGradient2
      .append('stop')
      .attr('stop-color', '#E9F2FF')
      .attr('offset', '0%');
    bgGradient2
      .append('stop')
      .attr('stop-color', '#49D3FF')
      .attr('offset', '100%');


    const bgGradient3 = defs
      .append('linearGradient')
      .attr('id', 'bg-gradient3')
      .attr('gradientTransform', 'rotate(90)');
    bgGradient3
      .append('stop')
      .attr('stop-color', '#E4FFF4')
      .attr('offset', '0%');
    bgGradient3
      .append('stop')
      .attr('stop-color', '#64E1A5')
      .attr('offset', '100%');

    bar.append('rect')
      .attr('y', function (d) {
        return yScale(d.score1)
      })
      .attr('width', barWidth - subWBaridth)
      .attr('height', d => height - yScale(d.score1))
      .style("bordeRadius", "5px")
      // .style('fill', color('score1'));
      .style("fill", "url(#bg-gradient)")
      .attr('rx', 3)
      .attr("stroke", "#FFD12C").attr("stroke-width", 0.5);

    bar2.append('rect')
      .attr('y', d => yScale(d.score2))
      .attr('width', barWidth - subWBaridth)
      .attr('height', d => height - yScale(d.score2))
      // .style('fill', color('score2'));
      .style("fill", "url(#bg-gradient2)")
      .attr('rx', 3)
      .attr("stroke", "#3379B3").attr("stroke-width", 0.5);

    bar3.append('rect')
      .attr('y', d => yScale(d.score3))
      .attr('width', barWidth - subWBaridth)
      .attr('height', d => height - yScale(d.score3))
      // .style('fill', color('score3'));
      .style("fill", "url(#bg-gradient3)")
      .attr('rx', 3)
      .attr("stroke", "#3EC584").attr("stroke-width", 0.5);


    bar4.append('rect')
      .attr('y', d => 0)
      .attr('width', 3 * barWidth)
      .attr('height', d => svgHeight - 30)
      // .style('fill', color('score3'))
      .style('fill', "none")
      .attr('rx', 20)
      .attr("stroke", "rgba(0, 0, 0, 0.25)").attr("stroke-width", 0.7);

    // Add text to each bar graph
    // text-anchor middle is the svg text equivalent to transform: translate(-50%, -50%) for regular CSS divs
    bar.append('text')
      .text(d => d.score1)
      .attr('text-anchor', 'middle')
      .attr('x', barWidth / 3)
      .attr('y', d => yScale(d.score1) - 5)
      .style("color", "#454459")
      .style("font-family", "Poppins")
      .style("font-size", "12px")
      .style("font-weight", "400")

    bar2.append('text')
      .text(d => d.score2)
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${barWidth / 3},${yScale(d.score2) - 5})`)
      .style("color", "#454459")
      .style("font-family", "Poppins")
      .style("font-size", "12px")
      .style("font-weight", "400")


    bar3.append('text')
      .text(d => d.score3)
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${barWidth / 3},${yScale(d.score3) - 5})`)
      .style("color", "#454459")
      .style("font-family", "Poppins")
      .style("font-size", "12px")
      .style("font-weight", "400")



    //For Total Text

    bar4.append('text')
      .text((d) => {
        return `Total : ${d.score1 + d.score2 + d.score3}`
      })
      .attr('text-anchor', 'middle')
      // .attr('transform', d => `translate(${barWidth *1.5},${yScale(height -(10))})`)
      .attr('transform', d => `translate(${barWidth * 1.5},${12})`)
      .style("color", "#6D6D6D")
      .style("font-family", "Montserrat")
      .style("font-size", "10px")
      .style("font-weight", "400")


    //For text of section

    bar4.append('text')
      .text((d) => {
        return `Section`
      })
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${barWidth * 1.5},${(height + margin.top + 10)})`)
      .style("color", "#454459")
      .style("font-family", "Poppins")
      .style("font-size", "12px")
      .style("font-weight", "400")

    bar4.append('text')
      .text((d, i) => {
        return `${i + 1}`
      })
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${barWidth * 1.5},${(height + margin.top + 25)})`)
      .style("color", "#454459")
      .style("font-family", "Poppins")
      .style("font-size", "12px")
      .style("font-weight", "400")


    // Add X axis at bottom of chart (we must do this at bottom after data has been appended to svg)
    // svg.append('g')
    //   .attr('transform', `translate(0, ${height})`)
    //   .call(d3.axisBottom(xScale).tickSize(0));

    // // Add y axis with label
    // svg.append('g')
    //   .call(d3.axisLeft(yScale));


    // const gs = svg
    // .append("g")
    // .attr("transform", "translate(" + margin.left + "," + 200 + ")");

    bar4
      .append("circle")
      .attr("class", "circle")
      .attr("fill", "#8D79F6")
      // .style("opacity", 2)
      .attr("stroke", "white")
      .style("stroke-width", 3)
      .attr("cx", function (d, i) {

        return xScale()
      })
      .attr("cy", function (d) {
        return yScale()
      })
      .attr("r", 8)
      .attr("transform", "translate(" + (margin.right + margin.left) / 2 + "," + (height + margin.bottom + 15) + ")");

    // Add chart title
    // svg.append('text')
    //   .text('Chart: Survey results')
    //   .style('font-size', '20px')
    //   .attr('transform', `translate(${0 - margin.left}, ${0 - (margin.top/2)})`);

    //   Add chart x axis label
    // svg.append('text')
    //   .text('Participants')
    //   .attr('text-anchor', 'middle')
    //   .attr('transform', `translate(${width/2}, ${height + (margin.bottom / 2)})`);

    // Add chart y axis label 
    // svg.append('text')
    //   .text('Points scored')
    //   .attr('transform', 'rotate(-90)')
    //   .attr('text-anchor', 'middle')
    //   .attr('x', 0 - (height / 2))
    //   .attr('y', 0 - (margin.left / 2))



  }
}


// */



//
class D3BarChart {
  async myData(user, max_val, allBarData, xScaleDomain, barColor) {
    script.barData = [];
    script.allData = user;
    script.max = max_val;
    allBarData.forEach((element) => {
      script.barData.push(element);
    });
    document.getElementById("barchartGraph").innerHTML = "";

    //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
    this.makegraph(xScaleDomain, barColor);
  }

  makegraph(xScaleDomain, barColor) {
    let heightOfScreen =
      window.innerHeight
      || document.documentElement.clientHeight ||
      document.body.clientHeight;

    let len;
    let svgHeight;
    const rectWidth = 50;
    const barWidth = 30;

    if (xScaleDomain.length <= 7) {
      if (heightOfScreen > 1000) {
        svgHeight = 220;
        len = 4 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen > 900) {
        svgHeight = 220;
        len = 3.5 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 700) {
        svgHeight = 200;
        len = 2.8 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 600) {
        svgHeight = 200;
        len = 2.3 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 500) {
        svgHeight = 210;
        len = 1.8 * (script.allData.length * rectWidth);
      }
      else {
        svgHeight = 200;
        len = 1.5 * (script.allData.length * rectWidth);
      }
      // svgHeight = (heightOfScreen >= 1800) ? 800 : (heightOfScreen >= 1400) ? 600 :  (heightOfScreen >= 800) ? 220: 200;

      // len = 2.8 * (script.allData.length * rectWidth);
    }

    else if (xScaleDomain.length <= 12) {
      if (heightOfScreen > 1000) {
        svgHeight = 220;
        len = 2.3 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen > 900) {
        svgHeight = 220;
        len = 2 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 800) {
        svgHeight = 220;
        len = 1.8 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 700) {
        svgHeight = 220;
        len = 1.5 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 600) {
        svgHeight = 220;
        len = 1.3 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 500) {
        svgHeight = 220;
        len = 1 * (script.allData.length * rectWidth);
      }
      else {
        svgHeight = 200;
        len = 1.5 * (script.allData.length * rectWidth);
      }
      // svgHeight = (heightOfScreen >= 1800) ? 800 : (heightOfScreen >= 1400) ? 600 :  (heightOfScreen >= 800) ? 220: 200;

      // len = 2.8 * (script.allData.length * rectWidth);
    }

    else {
      if (heightOfScreen > 800) {
        svgHeight = 220;
        len = 1.8 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 700) {
        svgHeight = 220;
        len = 1.6 * (script.allData.length * rectWidth);
      }
      else if (heightOfScreen >= 500) {
        svgHeight = 220;
        len = 1.3 * (script.allData.length * rectWidth);
      }
      else {
        svgHeight = 200;
        len = 1.5 * (script.allData.length * rectWidth);
      }
      // svgHeight = (heightOfScreen >= 1800) ? 800 : (heightOfScreen >= 1400) ? 600 : (heightOfScreen >= 1000) ? 250
      // : (heightOfScreen >= 900) ? 240 : (heightOfScreen >= 800) ? 220 : (heightOfScreen >= 700) ? 210 : (heightOfScreen >= 600) ? 200 : (heightOfScreen >= 500) ? 210 : 200;

      // len = (script.allData.length * rectWidth);
    }


    // let margin = { top: 10, right: 35, bottom: 45, left: 40 },
    let margin = { top: 10, right: 35, bottom: 45, left: 20 },

      height = svgHeight - margin.bottom,
      width = len + (2 * rectWidth);
    const extra = 1;

    // For making the svg
    const svg1 = select("#barchartGraph")
      // .classed("svg-container", true)
      .append("svg")
      .attr("height", (svgHeight))
      .attr("width", width)
      // .attr("viewBox", `0 0 ${width} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .classed("svg-content-responsive", true);
    // .style("background-color", "red");

    //SCALES START
    const req_g = svg1
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (script.max % 5 !== 0) {
      script.max = script.max + (5 - (script.max % 5));
    }

    let xScale = d3.scalePoint()
      .domain(xScaleDomain) //variable1??
      .range([0, len]);

    const yScale = scaleLinear()
      .domain([0, script.max])
      .range([0, svgHeight - margin.bottom - extra]);

    const yScale1 = scaleLinear()
      .domain([0, script.max])
      .range([height, 0])
      .nice();

    const x_axis = axisBottom(xScale).tickSize(-height).tickFormat(function (d) {
      // Replace long names with shortened versions
      if (d.length > 5) {
        return d.slice(0, 5) + "..";
      } else {
        return d;
      }
    }),
      xAxisTranslate = svgHeight - margin.bottom + margin.top;

    const y_axis = axisLeft(yScale1)
      .tickSize(-(len + 5))
      .ticks(script.max < 5 ? script.max : 5);

    const g = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left + margin.right) + "," + xAxisTranslate + ")");
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
      .attr("transform", function (d) {
        return d.length < 4 ?
          ("translate(" + 12 + "," + 5 + ")") : d.length < 7 ? ("translate(" + 17 + "," + 5 + ")") : ("translate(" + 25 + "," + 5 + ")")
      })
      ;
    g.select('.domain').attr('stroke-width', 0);

    req_g
      .append("g")
      .attr("class", "bar-x-axis")
      .attr("transform", "translate(30,0)")
      .call(y_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(" + 0 + "," + extra + ")")
      ;

    // req_g.select('.domain').attr('stroke-width', 0);
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
      .attr("transform", "translate(" + 25 + "," + margin.top + ")");

    const rect = g1
      .selectAll("rect")
      .data(script.allData, (d) => d)
      .join(
        (enter) => {
          const rect = enter
            .append("rect")
            .attr("width", rectWidth - barWidth)
            // .attr("stroke-width", 2)
            // .attr("stroke", "#7E857E")
            // .attr("stroke", "#88888E")

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
            .on("mouseover", function (event, d) {
              g1
                .append("circle")
                .attr("transform", "translate(" + margin.left + "," + 0 + ")")
                .attr("cx", () => xScale(d.x_axis) + ((rectWidth - barWidth) / 2))
                .attr("cy", () => {

                  return (height - yScale(d.count))
                }

                )
                .attr("r", 4)
                .attr("fill", "#3379B3")
                .attr("stroke-width", function () {
                  return 2;
                })
                .attr("stroke", "white");
              tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
                // .html(`${d.count}`)
                .html(
                  `<div class="countDiv">
                <div class="colorline"></div>
                <div class="countDivOne">${d.x_axis}
                </div>
                <div class="countDivTwo">
                ${d.count}
                </div>
                </div>`
                )


                .style("visibility", "visible")
                .style("display", "inline-block");
              select(this).attr("fill", function () {
                return barColor == "#E3607B" ? "#A7243F" : ("#346A97")
              });

            })
            .on("mousemove", function (event) {
              tooltip
                .style("top", event.pageY - 10 + "px")
                .style("left", event.pageX + 10 + "px")
            })

            .on("mouseout", function () {
              tooltip.html(``).style("visibility", "hidden");
              select(this).attr("fill", barColor);
              tooltip.style("display", "none");
              g1.select("circle").remove();
              tooltip.style("display", "none");
              d3.selectAll(".d3-tooltip").style("display", "none");;
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
      .attr("x", function (d, i) {
        return xScale(d.x_axis)
      })
      .attr("y", function (p) {
        return height - yScale(p.count);
      })
      .attr("height", function (d) {
        return yScale(d.count);
      })
      .attr("width", rectWidth - barWidth);

    const tooltip = select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
    // .style("padding", "10px");
    // .style("background", "#56ecb2")
    // .style("border-radius", "5px")
    // .style("color", "#fff")
    // .text("a simple tooltip");


    // //Line chart

    function linechart1() {
      var x = xScale,
        y = scaleLinear()
          .domain([0, script.max])
          .range([(height + extra), 0]),


        line = d3Line
          .line()
          .x(function (d) {
            return x(d.x_axis);
          })
          .y(function (d) {
            return y(d.count);
          });
      // .curve(curveBasis);

      const g2 = svg1
        .append("g")
        .attr("transform", "translate(" + (margin.left + margin.right) + "," + margin.top + ")");
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
          .range([(height + extra), 0]),
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
        .attr("transform", "translate(" + (margin.left + margin.right) + "," + margin.top + ")");
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
  pieGraph(id, id2, data) {
    if (document.getElementById(id2).innerHTML != "") {
      document.getElementById(id2).innerHTML = ""
    }
    let pie_data = data.pie_data
    const svgHeight = 250,
      radius = Math.min(script.svgWidth / 4, svgHeight) / 2;
    const start_point = script.svgWidth / 9;

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
    // var color = scaleOrdinal(d3.schemeCategory10);
    let colorScale = scaleOrdinal()
      // .domain(script.pie_data.map((d) => d.platform))
      .domain(pie_data.map((d) => d.testStatus))
      // .range(["#FFC145", "#33A02C", "#3379B3"]);
      // #FFC145 // yellow
      // #33A02C // Green
      .range(["#3379B3", "#FFC145", "#33A02C"]);


    const pies = d3Line.pie().value(function (d) {

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

    const arc = g
      .selectAll("arc")
      .data(pies(pie_data))
      .enter()
      .append("g")
      .style("filter", "url(#drop-shadow)");
    arc
      .append("path")
      .attr("d", path)

      .attr("fill", function (d) {
        return colorScale(d.data.testStatus);
      });
    // .on("mouseover", function (d, i) {
    //   tooltip
    //     .html(`Percentage: ${d.data.percentage}`)
    //     .style("visibility", "visible");
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

    // let sum = 0;
    // pie_data.forEach((x) => {
    //   sum += x.percentage;
    // });


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
      .text(` ${data.totalNumberOfTest} `);

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

//Graph4 Original
/*
class scatterplot_rect {
  async scatterGraph(data) {
    if (document.getElementById("rect_scatter").innerHTML != "") {
      document.getElementById("rect_scatter").innerHTML = "";
    }
    const scatterPlots = (selection, props) => {
      const { xValue, yValue, margin, width, height, data, widthvalue } = props;
      const innerWidth = script.svgWidth - margin.left - margin.right;
      const innerHeight = 340 - margin.top - margin.bottom;
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

      const rects = svg_4.append("g").selectAll("rect").data(data.groupsData);
      rects
        .enter()
        .append("rect")
        .attr("x", innerWidth)
        .attr("y", innerHeight)
        .attr("width", function (d) {

          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage > 0 && d.repeatingPercentage <= 20) {
            return 25 * Math.log10(d.repeatingPercentage);
          } else if (d.repeatingPercentage > 20 && d.repeatingPercentage <= 40) {
            return 40 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 40 && d.repeatingPercentage <= 60) {
            return 50 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 60 && d.repeatingPercentage <= 80) {
            return 60 * Math.log10(d.repeatingPercentage);
          } else {
            return 70 * Math.log10(d.repeatingPercentage);
          }

          // return 15 * d.repeatingPercentage;
          // return xScale3(x(d));
        })
        .attr("height", function (d) {
          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage > 0 && d.repeatingPercentage <= 20) {
            return 15 * Math.log10(d.repeatingPercentage);
          } else if (d.repeatingPercentage > 20 && d.repeatingPercentage <= 40) {
            return 30 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 40 && d.repeatingPercentage <= 60) {
            return 40 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 60 && d.repeatingPercentage <= 80) {
            return 50 * Math.log10(d.repeatingPercentage);
          } else {
            return 60 * Math.log10(d.repeatingPercentage);
          }
        })
        .attr("fill", function (d) {
          return d.numberOfCandidates >= 50 ? "#308D85" : "#E74B1D";
          // return d.active ? "#E74B1D" : "#308D85"; // false
        })
        .attr("opacity", 0.7)

        .on("mouseover", mouseover)

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

    }

    var Tooltip = select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
    // .style("background-color", "white")
    // .style("border-radius", "5px")
    // .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    let mouseover = function (d, datapoints) {



      Tooltip.style("opacity", 1)
        .style("display", "inline-block")
        .html(

          `<div class="scatter-main">
          <div class="scatter2-header">Recruitment Group</div> 
          <div id='tipDiv'></div>
     <div class="scatterbody2-content"> 
     <div class="d-flex ">
     <div style="width:5%"></div>
     <div  style="width:85%">
     <div class="scatter-texthead">Tagged Tests</div>
     <div class="scatter-textbody">  Lorem ipsum dolor sit amet consectetur adipisicing </div>
     </div>
     <div style="width:10%" class="scatter-testnum">${datapoints.numberOfTests} </div>
     </div>
    <div>`
        )
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY + -10 + "px");
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

    let mouseleave = function (d) {
      Tooltip.style("opacity", 0);
      select(this)
        .attr("width", function (d) {

          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage > 0 && d.repeatingPercentage <= 20) {
            return 25 * Math.log10(d.repeatingPercentage);
          } else if (d.repeatingPercentage > 20 && d.repeatingPercentage <= 40) {
            return 40 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 40 && d.repeatingPercentage <= 60) {
            return 50 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 60 && d.repeatingPercentage <= 80) {
            return 60 * Math.log10(d.repeatingPercentage);
          } else {
            return 70 * Math.log10(d.repeatingPercentage);
          }

          // return 15 * d.repeatingPercentage;
          // return xScale3(x(d));
        })
        .attr("height", function (d) {
          if (d.repeatingPercentage === 0) {
            return;
          } else if (d.repeatingPercentage > 0 && d.repeatingPercentage <= 20) {
            return 15 * Math.log10(d.repeatingPercentage);
          } else if (d.repeatingPercentage > 20 && d.repeatingPercentage <= 40) {
            return 30 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 40 && d.repeatingPercentage <= 60) {
            return 40 * Math.log10(d.repeatingPercentage);
          }
          else if (d.repeatingPercentage > 60 && d.repeatingPercentage <= 80) {
            return 50 * Math.log10(d.repeatingPercentage);
          } else {
            return 60 * Math.log10(d.repeatingPercentage);
          }
        })
        .style("stroke", "none")
        .style("opacity", 0.8);
      Tooltip.style("display", "none");
    };
    // /*
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
  return 5*(Math.exp(circleRadius.horsepower /100));
        })
      .style("stroke", "none")
      .style("opacity", 0.8)
  }
    
  // * /

    // const response3 = await fetch(
    //   "https://run.mocky.io/v3/35effb46-6d36-4026-9695-e573f6c90248"
    // );
    // data = await response3.json();
    // data = data.slice(0, 100);
    render();
  }
}
*/

//GRAPH 4
class scatterplot_rect {
  async scatterGraph(theData) {
    if (document.getElementById("rect_scatter").innerHTML != "") {
      document.getElementById("rect_scatter").innerHTML = "";
    }


    const rectFullData = theData.groupsData;
    let rectSvgWidth;
    setTimeout(() => {
      if (window.innerWidth >= 1900) {
        rectSvgWidth = window.innerWidth - 500

      }

      if (window.innerWidth >= 1700) {
        rectSvgWidth = window.innerWidth - 400

      }
      else if (window.innerWidth >= 1500) {
        rectSvgWidth = window.innerWidth - 400


      }
      else if (window.innerWidth >= 1300) {
        rectSvgWidth = window.innerWidth - 400


      }
      else if (window.innerWidth >= 1100) {
        rectSvgWidth = window.innerWidth - 300

      }
      else {
        rectSvgWidth = window.innerWidth - 200

      }
      // set the dimensions and margins of the graph
      let rectMargin = { top: 10, right: 30, bottom: 20, left: 60 };
      rectSvgWidth = rectSvgWidth - rectMargin.left - rectMargin.right;
      let RectScatterheight = 300 - rectMargin.top - rectMargin.bottom;

      const startPoint = 50;
      let svgWidth = rectSvgWidth + rectMargin.left + rectMargin.right;
      let svgHeight = RectScatterheight + rectMargin.top + rectMargin.bottom;;
      let rectZoom = d3
        .zoom()
        .on("zoom", zoomed);

      // append the SVG object to the body of the page
      let rectSVG = d3
        .select("#rect_scatter")
        .classed("svg-containerRect", true)
        .append("svg")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .classed("svg-content-responsive", true)
        .classed("zoom-in", true)
        .call(rectZoom);
      // .style("background-color", "pink");


      rectSVG = rectSVG.append("g")
        .attr("transform", "translate(" + rectMargin.left + "," + rectMargin.top + ")")


      let ctrl, key;

      // Attach the resize event listener
      document.body.addEventListener("keydown", function (ev) {
        ev = ev || window.event;
        key = ev.which || ev.code;
        ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
        window.addEventListener("resize", resize);

        // }
      }, false);

      function resize() {

        if (window.innerWidth >= 1700) {
          rectSvgWidth = window.innerWidth - 400

        }
        else if (window.innerWidth >= 1500) {
          rectSvgWidth = window.innerWidth - 400


        }
        else if (window.innerWidth >= 1300) {
          rectSvgWidth = window.innerWidth - 400


        }
        else if (window.innerWidth >= 1100) {
          rectSvgWidth = window.innerWidth - 300

        }
        else {
          rectSvgWidth = window.innerWidth - 200

        }

        svgWidth = rectSvgWidth + rectMargin.left + rectMargin.right;
        svgHeight = RectScatterheight + rectMargin.top + rectMargin.bottom;;
        if (ctrl && key === 109 && window.innerWidth > 1900) {
          let containerWidth = parseInt(d3.select("#rect_scatter").style("width"));
          let containerHeight = parseInt(d3.select("#rect_scatter").style("height"));

          rectSVG.attr("viewBox", "0 0 " + svgWidth * containerWidth / (svgWidth) + " " + svgHeight * containerHeight / svgHeight);
        }
        else if (window.innerWidth > 1700) {
          rectSVG.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
          if (window.innerHeight > 950) {
            rectSVG.attr("viewBox", `0 0 ${svgWidth} ${svgHeight + 50}`);
          }

        }
        else {
          rectSVG.attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        }

      }

      let max1 = Math.max(...rectFullData.map((o) => o.valueTemp));
      let max2 = Math.max(...rectFullData.map((o) => o.valueTempRandom));

      let x0rect = [0, max1];
      let y0 = [0, max2];

      // Add X axis
      let x_Rect = d3
        .scaleLinear()
        .domain(x0rect)
        // .range([startPoint, (width - (margin.left + margin.right))]);
        .range([startPoint, (rectSvgWidth - (rectMargin.left + rectMargin.right))]);

      const xScale1 = scaleLinear()
        .domain([0, 5])
        .range([0, (rectSvgWidth)])
        .nice();
      const xGridLine = axisBottom(xScale1)
        .scale(xScale1)
        .tickSize(RectScatterheight, 0, 0)
        .ticks(6)
        .tickFormat("");

      const yScale1 = scaleLinear().domain([0, 5]).range([0, RectScatterheight]).nice(),
        yGridLine = axisLeft(yScale1)
          .scale(yScale1)
          .tickSize((-rectSvgWidth), 0)
          .ticks(6)
          .tickFormat("");


      // var x = d3.scaleBand()
      // .domain(data.map((d) => d.topicName))
      // .range([0, width]);

      // Add Y axis
      let y = d3
        .scaleLinear()
        .domain([0, max2])
        .range([(RectScatterheight - (rectMargin.top + rectMargin.bottom)), startPoint]);
      let newX = x_Rect;
      let newY = y;

      let brush = d3
        .brush()
        .extent([[0, 0], [rectSvgWidth, RectScatterheight]])
        .on("end", brushended),
        idleTimeout,
        idleDelay = 350;

      // Add X axis
      let xAxis = rectSVG.append("g")
        .attr("class", "x axis")
        .attr("id", "axis--x")
        .attr("transform", "translate(0," + RectScatterheight + ")")
      // .call(d3.axisBottom(x));

      // Add Y axis
      let yAxis = rectSVG.append("g")
        .attr("class", "y axis")
        .attr("id", "axis--y")
      // .call(d3.axisLeft(y));


      rectSVG
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(0,0)")
        .style("color", "grey")
        .attr("opacity", "0.5")
        .call(xGridLine);
      rectSVG.select('.domain').attr('stroke-width', 0);
      rectSVG
        .append("g")
        .classed("gridLine", true)
        .attr("transform", "translate(0,0)")
        .style("color", "grey")
        .attr("opacity", "0.5")
        .call(yGridLine);


      // Add a clipPath: everything out of this area won't be drawn.
      let clipRect = rectSVG.append("defs")
        .append("rectSVG:clipPath")
        .attr("id", "clipRect")
        .append("rectSVG:rect")
        .attr("width", (rectSvgWidth))
        .attr("height", RectScatterheight)
        .attr("x", 0)
        .attr("y", 0);


      // Create the scatter variable: where both the circles and the brush take place
      let scatterRect = rectSVG.append("g").attr("clip-path", "url(#clipRect)");
      // .attr("clip-path", "url(#clip)");


      function updateChart(newX, newY) {
        let t = rectSVG.transition().duration(750);

        // update axes with these new boundaries
        xAxis.transition(t).call(d3.axisBottom(newX));
        yAxis.transition(t).call(d3.axisLeft(newY));



        // update circle position
        scatterRect
          .selectAll("rect")
          .transition(t)
          .attr("x", function (d) {

            return newX(d.valueTemp);
          })
          .attr("y", function (d) {
            return newY(d.valueTempRandom);
            // return newY(d.valueTempSecond);
          });
      }
      // Add circles
      let radiusScale = d3
        .scaleSqrt()
        .domain([0, d3.max(rectFullData, function (d) { return d.repeatingPercentage; })])
        .range([0, startPoint]);

      function zoomed(e) {
        // recover the new scale
        newX = e.transform.rescaleX(x_Rect);
        newY = e.transform.rescaleY(y);

        // update circle position
        scatterRect
          .selectAll("rect")
          .attr("x", function (d) {

            return newX(d.valueTemp);
          })
          .attr("y", function (d) {
            return newY(d.valueTempRandom);
            // return newY(d.valueTempSecond);
          })
          .attr("width", function (d) {
            return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 2) : radiusScale(d.repeatingPercentage + 4.5);
          })
          .attr("height", function (d) {
            return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage) : radiusScale(d.repeatingPercentage + 2.5);
          });
      }

      function idled() {
        idleTimeout = null;
      }

      function brushended(e) {
        let s = e.selection;

        if (!s) {
          if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
          newX = x_Rect.domain(x0rect);
          newY = y.domain(y0);
        } else {
          newX = x_Rect.domain([s[0][0], s[1][0]].map(newX.invert));
          newY = y.domain([s[1][1], s[0][1]].map(newY.invert));

          rectSVG.select(".brush").call(brush.move, null);
        }
        updateChart(newX, newY);
      }

      function start_brush_tool() {
        rectSVG.append("g")
          .attr("class", "brush")
          .call(brush);
      }

      function end_brush_tool() {
        rectSVG.selectAll("g.brush").remove();
      }


      //Tooltip For rect scatter graph Zoomable


      let rectTooltip = select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
      // .style("background-color", "white")
      // .style("border-radius", "5px")
      // .style("padding", "5px");

      // Three function that change the tooltip when user hover / move / leave a cell
      let tipMouseover = function (d, rectFullData) {
        rectTooltip.style("opacity", 1)
          .html(

            `<div class="scatter-main">
              <div class="scatter2-header">${rectFullData.groupName}</div> 
              <div id='tipDiv'></div>
              <div class="scatterbody2-content"> 
                <div class="d-flex ">
                  <div style="width:5%">
                  </div>
                  <div  style="width:75%">
                    <div class="scatter-texthead">Tagged Tests</div>
                  </div>
                  <div style="width:20%" class="scatter-testnum">${rectFullData.numberOfTests} </div>
                </div>

                <div class="mt-2"> 
                  <div class="d-flex ">
                    <div style="width:5%"></div>
                    <div  style="width:75%">
                    <div class="scatter-texthead  d-flex align-items-start">Candidates</div>
                  
                  </div>
                  <div style="width:20%" class="scatter-testnum">${rectFullData.numberOfCandidates} </div>
                </div>
              </div>
            </div>`

          )
          .style("left", d.pageX - 50 + "px")        // .style("top", d.pageY - 280 + "px");
        const tooltipHeight = rectTooltip.node().getBoundingClientRect().height;
        const tooltipBottomPosition = d.pageY + 150 + tooltipHeight;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight;
        if (tooltipBottomPosition > screenHeight) {
          rectTooltip.style("top", d.pageY - 20 - tooltipHeight + "px");
        } else {
          rectTooltip.style("top", d.pageY + 20 + "px");
        }
        select(this)
          .attr("width", function (d) {
            return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 4) : radiusScale(d.repeatingPercentage + 6.5);
          })
          .attr("height", function (d) {
            return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 2) : radiusScale(d.repeatingPercentage + 4.5);
          })
          .style("fill", function (d) {
            return d.active ? "yellow" : "pink";
          })
          .style("stroke", function (d) {
            return d.active ? "#003D35" : "#970000";
          })
          .style("opacity", 0.54);
        rectTooltip.style("display", "block");
      };

      let tipMouseout = function (d) {
        rectTooltip.style("opacity", 0);
        select(this)
          .attr("width", function (d) {
            return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 2) : radiusScale(d.repeatingPercentage + 4.5);
          })
          .attr("height", function (d) {
            return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage) : radiusScale(d.repeatingPercentage + 2.5);
          })
          .style("fill", function (d) {
            return d.active ? "#308D85" : "#E74B1D";
          })
          .style("stroke", "none")
          .style("opacity", 0.8);
        rectTooltip.style("display", "none");
      };



      scatterRect
        .selectAll("rect")
        .data(rectFullData)
        .enter()
        .append("rect")
        .attr("class", "pointer")
        .attr("x", function (d) {

          return x_Rect(d.valueTemp);
        })
        .attr("y", function (d) {

          return y(d.valueTempRandom);
          // return y(d.valueTempSecond);
        })
        // .attr("r", 8)
        .attr("width", function (d) {
          return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 2) : radiusScale(d.repeatingPercentage + 4.5);
        })
        .attr("height", function (d) {
          return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage) : radiusScale(d.repeatingPercentage + 2.5);
        })
        // .attr("r", function (d) {
        //   return d.repeatingPercentage > 0 ? radiusScale(d.repeatingPercentage) : radiusScale(d.repeatingPercentage + 1);
        // })
        // .style("fill", "#61a3a9")
        .attr("fill", function (d) {
          return d.active ? "#308D85" : "#E74B1D";
        })
        .style("opacity", 0.7)
        .on("mouseover", tipMouseover)

        .on("mousemove", function (event) {
          rectTooltip
            .style("left", event.pageX - 50 + "px")
          const tooltipHeight = rectTooltip.node().getBoundingClientRect().height;
          const tooltipBottomPosition = event.pageY + 150 + tooltipHeight;
          const screenHeight = window.innerHeight || document.documentElement.clientHeight;
          if (tooltipBottomPosition > screenHeight) {
            rectTooltip.style("top", event.pageY - 20 - tooltipHeight + "px");
          } else {

            rectTooltip.style("top", event.pageY + 20 + "px");
          }

        })
        .on("mouseout", tipMouseout);


      this.rectTooltip = rectTooltip
      // this.tipMouseovered("d",rectFullData[20]);
    }, 1000);

  }

  tipMouseovered(d, rectFullData) {
    this.rectTooltip.style("opacity", 1)
      .html(

        `<div class="scatter-main">
          <div class="scatter2-header">${rectFullData.groupName}</div> 
          <div id='tipDiv'></div>
          <div class="scatterbody2-content"> 
            <div class="d-flex ">
              <div style="width:5%">
              </div>
              <div  style="width:75%">
                <div class="scatter-texthead">Tagged Tests</div>
              </div>
              <div style="width:20%" class="scatter-testnum">${rectFullData.numberOfTests} </div>
            </div>

            <div class="mt-2"> 
              <div class="d-flex ">
                <div style="width:5%"></div>
                <div  style="width:75%">
                <div class="scatter-texthead  d-flex align-items-start">Candidates</div>
              
              </div>
              <div style="width:20%" class="scatter-testnum">${rectFullData.numberOfCandidates} </div>
            </div>
          </div>
        </div>`

      )
      .style("left", d.pageX - 50 + "px")        // .style("top", d.pageY - 280 + "px");
    const tooltipHeight = this.rectTooltip.node().getBoundingClientRect().height;
    const tooltipBottomPosition = d.pageY + 150 + tooltipHeight;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    if (tooltipBottomPosition > screenHeight) {
      this.rectTooltip.style("top", d.pageY - 20 - tooltipHeight + "px");
    } else {
      this.rectTooltip.style("top", d.pageY + 20 + "px");
    }
    select(this)
      .attr("width", function (d) {
        return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 4) : radiusScale(d.repeatingPercentage + 6.5);
      })
      .attr("height", function (d) {
        return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 2) : radiusScale(d.repeatingPercentage + 4.5);
      })
      .style("fill", function (d) {
        return d.active ? "yellow" : "pink";
      })
      .style("stroke", function (d) {
        return d.active ? "#003D35" : "#970000";
      })
      .style("opacity", 0.54);
    this.rectTooltip.style("display", "block");
  };
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

  constructor() {
    // this.mchkkk = [];
    this.getTagName = ""
    this.onlytagName = this.onlytagName.bind(this);
  }
  async dendoGram(classes) {

    const divElement = document.getElementById("dendogram");

    if (divElement != null) {
      document.getElementById("dendogram").innerHTML = "";
    } else {
      void 0;
    }

    // if (document.getElementById("dendogram").innerHTML != "") {
    //   document.getElementById("dendogram").innerHTML = ""
    // }

    let svgWidth;
    let svgHeight = 270;

    const margin = {
      top: 25,
      bottom: 5,
      left: 25,
      right: 20,
    };


    // var widthss = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (window.innerWidth >= 1700) {
      svgWidth = window.innerWidth - 400
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1500) {
      svgWidth = window.innerWidth - 370
    }
    else if (window.innerWidth >= 1300) {
      svgWidth = window.innerWidth - 350;
    }
    else if (window.innerWidth >= 1100) {
      svgWidth = window.innerWidth - 300;
    }

    const width1 = svgWidth - margin.left - margin.right;
    const height1 = svgHeight - margin.top - margin.bottom;



    let div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "black");

    const diameter = svgWidth > 2500 ? svgWidth / 1.5 : (svgWidth < 1300 ? svgWidth / 0.75 : svgWidth < 1750 ? svgWidth / 0.85 : svgWidth / 1.35),
      radius = diameter / 2.5 + 30,
      innerRadius = radius / 2;

    let cluster = d3.cluster().size([360, innerRadius]);

    let line = d3
      .lineRadial()
      .curve(d3.curveBundle.beta(0.85))
      .radius(function (d) {
        return d.y;
      })
      .angle(function (d) {
        return (d.x / 180) * Math.PI;
      });

    let svg = d3
      .select("#dendogram")
      // .classed("svg-container", true)
      .append("svg")

      .attr("viewBox", `-${svgWidth / 2.5} -430 ${svgWidth} 850`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .classed("svg-content-responsive", true);
    // .attr("height", 900)
    // .style("background-color", "pink");

    var ctrl, key;

    // Attach the resize event listener
    document.body.addEventListener("keydown", function (ev) {



      ev = ev || window.event;
      key = ev.which || ev.code;
      ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
      window.addEventListener("resize", resize);

      // }
    }, false);

    function resize() {
      if (window.innerWidth >= 1700) {
        svgWidth = window.innerWidth - 400
        // svgHeight = 250
      }
      else if (window.innerWidth >= 1500) {
        svgWidth = window.innerWidth - 370
      }
      else if (window.innerWidth >= 1300) {
        svgWidth = window.innerWidth - 350;
      }
      else if (window.innerWidth >= 1100) {
        svgWidth = window.innerWidth - 300;
      }



      if (ctrl && key === 109 && window.innerWidth > 1700) {
        svgWidth = window.innerWidth - 400

        var containerWidth = parseInt(d3.select("#dendogram").style("width"));
        var containerHeight = parseInt(d3.select("#dendogram").style("height"));

        svg.attr("viewBox", `-${svgWidth * containerWidth / (svgWidth - 100)} -430 ${svgWidth} 850`)
      }
      // else if (window.innerWidth > 1700) {

      //   svg.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
      //   if (window.innerHeight > 950) {
      //     svg.attr("viewBox", `0 0 ${svgWidth + 200} ${svgHeight + 50}`);
      //   }

      // }
      else {

        svg.attr("viewBox", `-${svgWidth / 2.5} -430 ${svgWidth} 850`)
      }
    }

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

    cluster(root);

    link = link
      .data(packageImports(root.leaves()))
      .enter()
      .append("path")
      .each(function (d) {
        (d.source = d[0]), (d.target = d[d.length - 1]);
      })
      .attr("class", "link")
      .attr("d", line)

    node = node.data(root.leaves());


    let mchkkk = []
    for (let index = 0; index < node._enter[0].length; index++) {
      mchkkk.push(node._enter[0][index].__data__);
    };


    let chkNodeMouse = node
      .enter()
      .append("a")
      .attr("class", "node pointer")
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
        if (d.data.parentTag.length > 5) {
          return d.data.parentTag.substring(0, 4) + "..";
        } else {
          return d.data.parentTag;
        }
      })
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted)
      .on("click", function (d, i) {


        link
          .classed("link--target ", function (l) {
            if (l.target === i) {

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
        const liveValue = i.data.parentTag
        this.getTagName = i.data.parentTag;

        // let den = new treeGraph();
        // den.getTagName = i.data.key;

        const event = new CustomEvent('liveValueUpdated', { detail: liveValue });
        window.dispatchEvent(event);

      });
    // chkNodeMouse.on("click", this.mouseSelect);

    // node.on("click", function() {
    // });

    // mouseovered("e",mchkkk[2]);

    function mouseovered(d, i) {
      link
        .classed("link--target ", function (l) {
          if (l.target === i) {
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

      // div.transition().duration(200).style("opacity", 0.9);
    };



    function mouseouted() {
      link.classed("link--target", false).classed("link--source", false);

      node.classed("node--target", false).classed("node--source", false);
      div.transition().duration(500).style("opacity", 0);
    };



    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
      let map = {};

      function find(parentTag, data) {
        let node = map[parentTag],
          i;
        if (!node) {
          node = map[parentTag] = data || { name: parentTag, children: [] };
          if (parentTag.length) {
            // node.parent = find(parentTag.substring(0, (i = parentTag.lastIndexOf("."))));
            node.parent = find(
              parentTag.substring(0, (i = parentTag.lastIndexOf(" ")))
            );

            node.parent.children.push(node);
            node.key = parentTag.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach(function (d) {
        find(d.parentTag, d);
      });

      return d3.hierarchy(map[""]);
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {

      let map = {},
        importss = [];

      // Compute a map from name to node.
      nodes.forEach(function (d) {
        map[d.data.parentTag] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function (d) {
        if (d.data.imports)
          d.data.imports.forEach(function (i, j) {

            if (typeof map[i] === "undefined") {
              return;
            } else {
              // for (let k = 0; k <= d.data.imports.length; k++) {

              importss.push(map[d.data.parentTag].path(map[i]));
            }
          });
      });

      return importss;
    }
    this.chkLink = link;
    this.nodess = node

    //  this.onlytagName();
    return mchkkk;
  }

  mouseovereded(d, i) {
    this.chkLink
      .classed("link--target ", function (l) {
        if (l.target === i) {
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

    this.nodess
      .classed("node--target", function (n) {
        return n.target;
      })
      .classed("node--source", function (n) {
        return n.source;
      });

    // div.transition().duration(200).style("opacity", 0.9);
  };

  onlytagName() {
  }
}


class proctBarChart {
  /*
  async getGraph(type, roles) {
    const heightOfScreen =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    let res;
    if (
      roles.includes("GET_EVALUATOR_TEST") == true &&
      roles.includes("GET_PROCTORING") == false
    ) {
      res = await postEvalTestGroups(payload);
    } else {
      res = await getProctorGroups(payload);
    }
    if (res.status == 200) {
      this.totalGroups = res.data.data.total;
      this.totalCandidates = res.data.data.totalCandidatesTakenTest;
      let data = res.data.data.data;
      const chartContainer = this.$refs.chartContainer;
      const chartWidth = data.length * 90;
      const chartHeight =
        heightOfScreen <= 800 ? (heightOfScreen <= 700 ? 160 : 240) : 300;
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
      const width = chartWidth - margin.left - margin.right;
      const height = chartHeight - margin.top - margin.bottom;
      let x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.55)
        .domain(data.map(d => d.groupName));
      let y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([
          0,
          d3.max(
            type === "CAN"
              ? res.data.data.candCount
              : type === "TEST"
              ? res.data.data.testCount
              : res.data.data.topicCount
          ) + 5
        ]);
      let xAxis = d3
        .axisBottom(x)
        .tickSize(-height)
        .tickFormat(function(d) {
          // Replace long names with shortened versions
          if (d.length > 10) {
            return d.substring(0, 10) + "...";
          } else {
            return d;
          }
        });

      let yAxis = d3
        .axisLeft(y)
        .tickSize(-width)
        .ticks(5);

      if (this.barGraphCreated === true) {
        d3.select("#proctBarChart")
          .selectAll("g")
          .remove();
      }

      const svg = d3
        .select("#proctBarChart")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text");
      // .style("text-anchor", "miidle")
      // .attr("transform", "rotate(-10)");
      svg.append("g").call(yAxis);
      const rects = svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.groupName))
        .attr("y", data =>
          y(
            type === "CAN"
              ? data.candidateCount
              : type === "TEST"
              ? data.testCount
              : data.topicCount
          )
        )
        .attr("width", 40)
        .attr(
          "height",
          data =>
            height -
            y(
              type === "CAN"
                ? data.candidateCount
                : type === "TEST"
                ? data.testCount
                : data.topicCount
            )
        )
        .attr("fill", "#3379B3");
      var div = d3
        .select("body")
        .append("div")
        .attr("class", "toolTip")
        .classed("toolTipForBarGraph", true);

      rects.on("mouseover", function(e, d) {
        svg
          .append("circle")
          .attr("cx", () => x(d.groupName) + 20)
          .attr("cy", () =>
            y(
              type === "CAN"
                ? d.candidateCount
                : type === "TEST"
                ? d.testCount
                : d.topicCount
            )
          )
          .attr("r", 4)
          .attr("fill", "#3379B3")
          .attr("stroke-width", function() {
            return 2;
          })
          .attr("stroke", "white");
        div.style("left", e.pageX + "px");
        div.style("top", e.pageY - 87 + "px");
        div.style("display", "inline-block");
        div.html(
          `<div class="groupName">${d.groupName}
          </div>
          <div class="countDiv">
          <div class="colorline"></div>
          <div class="countDivOne">
          
           ${
             type === "CAN"
               ? "Total Candidates"
               : type === "TEST"
               ? "Total Tests"
               : "Total Topics"
           }
          </div>
          <div class="countDivTwo">

          ${
            type === "CAN"
              ? d.candidateCount
              : type === "TEST"
              ? d.testCount
              : d.topicCount
          }
          </div>
          </div>
          `
        );
      });

      rects.on("mouseout", function() {
        d3.select(this).attr("fill", "#3379B3");
        svg.select("circle").remove();
        div.style("display", "none");
      });
      this.barGraphCreated = true;
      // chartContainer.scrollLeft ;
      // document.querySelector('.linechartContainer').scrollLeft;
      chartContainer.scrollLeft;
      //  = (chartWidth - chartContainer.clientWidth) / 2;
    }
  }
  */


  async proctBarData(id, types, user, max_val, allBarData, xScaleDomain, xScaleDomainGridLines, barColor) {
    script.barData = [];
    script.allData = user;
    // script.marks_data = user.count;
    script.max = max_val;
    allBarData.forEach((element) => {
      script.barData.push(element);
    });
    // document.getElementById(id).innerHTML = "";



    //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
    this.makeProctBarGraph(id, types, xScaleDomain, xScaleDomainGridLines, barColor);
  }

  makeProctBarGraph(id, types, xScaleDomain, xScaleDomainGridLines, barColor) {
    let heightOfScreen =
      window.innerHeight
      || document.documentElement.clientHeight ||
      document.body.clientHeight;

    const rectWidth = 50;
    // const svgHeight = 280;
    const svgHeight = (heightOfScreen >= 1800) ? 800 : (heightOfScreen >= 1400) ? 600 : (heightOfScreen >= 1000) ? 250
      : (heightOfScreen >= 900) ? 270 : (heightOfScreen >= 800) ? 250 : (heightOfScreen >= 700) ? 220 : (heightOfScreen >= 600) ? 150 : (heightOfScreen >= 500) ? 110 : 200;

    const barWidth = 30;

    let len = script.allData.length > 16 ? script.allData.length * rectWidth : 900;
    // let len = 900;
    let margin = { top: 10, right: 35, bottom: 48, left: 40 },
      height = svgHeight - margin.bottom,
      width = len + (2 * rectWidth);

    // For making the svg
    const svg1 = select(id)
      .append("svg")
      .attr("height", (svgHeight + 20))
      .attr("width", width)
    // .style("background-color","red");
    // .attr("preserveAspectRatio", "xMinYMin meet")
    //   .attr("viewBox", `0 0 ${width} ${svgHeight}`)

    const req_g = svg1
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //SCALES START
    if (script.max % 5 !== 0) {
      script.max = script.max + (5 - (script.max % 5));
    }

    let xScale = d3.scalePoint()
      .domain(xScaleDomain) //variable1??
      .range([0, len]);

    const yScale = scaleLinear()
      .domain([0, script.max])
      .range([0, svgHeight - margin.bottom - margin.top]);

    const yScale1 = scaleLinear()
      .domain([0, script.max])
      .range([height, 0])
      .nice();



    const x_axis = axisBottom(xScale)
      .tickSize(-height)
      .tickFormat(function (d) {
        // Replace long names with shortened versions
        if (d.length > 5) {
          return d.slice(0, 5) + "..";
        } else {
          return d;
        }
      })
      ,

      xAxisTranslate = svgHeight - margin.bottom + margin.top;

    const y_axis = axisLeft(yScale1)
      .tickSize(-(len + margin.right))
      // .ticks(script.max <= 10 ? script.max
      //   : script.max <= 29 ? (script.max + 5) / 5
      //     : script.max <= 25 || ?);
      .ticks(script.max < 5 ? script.max : 5);


    const g = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left + margin.right) + "," + xAxisTranslate + ")");
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
      .attr("transform", function (d) {
        return d.length < 4 ?
          ("translate(" + 12 + "," + 5 + ")") : d.length < 7 ? ("translate(" + 17 + "," + 5 + ")") : ("translate(" + 25 + "," + 5 + ")")
      })
      ;
    // .attr("transform", "rotate(-30)");
    // .attr("transform", "rotate()");

    req_g
      .append("g")
      .attr("class", "bar-x-axis")
      .call(y_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font", "Roboto")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "translate(" + 0 + "," + 2 + ")")
      ;



    //FOR Y axis Title

    const yScaleText = scaleLinear()
      .domain([0, script.max])
      .range([height, 0])

    const y_axis_title = axisLeft(yScaleText)
      .tickFormat("")
      .tickSizeOuter(0)
      .tickSizeInner(0);
    const y_title = svg1
      .append("g")
      .attr("transform", "translate(" + 7 + "," + (-height / 2) + ")");
    const y_tittle_txt = y_title
      .append("g")
      .call(y_axis_title);
    y_tittle_txt.select('.domain').attr('stroke-width', 0);
    y_tittle_txt.select("text")
      .style("text-anchor", "middle")
      .style("color", "#5D5D5D")
      .style("font-family", "poppins")
      .style("font-size", "12px")
      .style("font-weight", "500")

      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-90)")
      .text(function () {
        return (types === "CAN") ? `Candidate Count` : (types === "TEST") ? "Test Count" : "Topic Count"
      });



    const xScaleText = d3.scalePoint()
      .domain(xScaleDomain)
      .range([0, len])
    const x_axis_title = axisBottom(xScaleText)
      .tickFormat("")
      .tickSizeOuter(0)
      .tickSizeInner(0);

    const x_title = svg1
      .append("g")
      .attr("transform", "translate(" + (margin.left + margin.right) + "," + (height + 30) + ")");

    const x_tittle_txt = x_title
      .append("g")
      .call(x_axis_title)
      .attr("position", "-webkit-sticky")
      .attr("position", "sticky");

    x_tittle_txt.select('.domain').attr('stroke-width', 0);
    x_tittle_txt.select("text")

      .style("text-anchor", "middle")
      .style("color", "#5D5D5D")
      .style("font-family", "poppins")
      .style("font-size", "12px")
      .style("font-weight", "500")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .text("Groups");


    //SCALES END
    const t = select("svg1").transition().duration(2000);

    const g1 = svg1
      .append("g")
      .attr("transform", "translate(" + 25 + "," + margin.top + ")");

    //  /*


    var div = d3
      .select("body")
      .append("div")
      .attr("class", "toolTip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .classed("toolTipForBarGraph", true);

    const rect = g1
      .selectAll("rect")
      .data(script.allData, (d) => d)
      .join(
        (enter) => {
          const rect = enter
            .append("rect")
            .attr("width", rectWidth - barWidth)
            .attr("fill", barColor)
            .attr("x", (d, i) => i * rectWidth)
            .attr("y", function (p) {
              return height;
            })
            .attr("height", function (d) {
              return 0;
            })
            .attr("transform", "translate(" + margin.left + "," + 0 + ")")
            .on("mouseover", function (e, d) {
              g1
                .append("circle")
                .attr("transform", "translate(" + margin.left + "," + 0 + ")")
                .attr("cx", () => xScale(d.groupName) + ((rectWidth - barWidth) / 2))
                .attr("cy", () => {
                  return (types === "CAN") ? height - yScale(d.candidateCount) : (types === "TEST") ? height - yScale(d.testCount) : height - yScale(d.topicCount)
                }

                )
                .attr("r", 4)
                .attr("fill", "#3379B3")
                .attr("stroke-width", function () {
                  return 2;
                })
                .attr("stroke", "white");
              div.style("left", e.pageX + 10 + "px");
              div.style("top", e.pageY - 87 + "px");

              div.style("display", "inline-block")
                .style("visibility", "visible")
                .html(
                  `<div class="groupName">${d.groupName}
                </div>
                <div class="countDiv">
                <div class="colorline"></div>
                <div class="countDivOne">
                
                 ${types === "CAN"
                    ? "Total Candidates"
                    : types === "TEST"
                      ? "Total Tests"
                      : "Total Topics"
                  }
                </div>
                <div class="countDivTwo">
    
                ${types === "CAN"
                    ? d.candidateCount
                    : types === "TEST"
                      ? d.testCount
                      : d.topicCount
                  }
                </div>
                </div>
                `
                )
            })
            .on("mouseout", function () {
              d3.select(this).attr("fill", "#3379B3");
              div.html(``).style("visibility", "hidden");
              div.html(``).style("display", "none");
              g1.select("circle").remove();
              div.style("display", "none");
              d3.selectAll(".toolTip").style("display", "none");
            });


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
      .attr("x", function (d, i) {
        return xScale(d.groupName)
      })
      .attr("y", function (d) {
        return (types === "TOPIC") ?
          height - yScale(d.topicCount) : (types === "TEST") ? height - yScale(d.testCount) : height - yScale(d.candidateCount);
      })
      .attr("height", function (d) {
        return (types === "TOPIC") ?
          yScale(d.topicCount) : (types === "TEST") ? yScale(d.testCount) : yScale(d.candidateCount);
      })
      .attr("width", rectWidth - barWidth)



  }
}

class proctLineChart {
  async makeProcLineChart(id, data) {
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    // const chartWidth = 950 ;

    if (window.innerWidth >= 3000) {
      var chartWidth = window.innerWidth - 1700
      var chartHeight = 700;
    }
    else if (window.innerWidth >= 2500) {
      var chartWidth = window.innerWidth - 1250
      var chartHeight = 550;

    }
    else if (window.innerWidth >= 2000) {
      var chartWidth = window.innerWidth - 1100
      var chartHeight = 450;

    }
    else if (window.innerWidth >= 1900) {
      var chartWidth = window.innerWidth - 950
      var chartHeight = 250;
    }
    else if (window.innerWidth >= 1600) {
      var chartWidth = window.innerWidth - 800
      var chartHeight = 210;
    }
    else if (window.innerWidth >= 1500) {
      var chartWidth = window.innerWidth - 750
      var chartHeight = 175;
    }
    else if (window.innerWidth >= 1200) {
      var chartWidth = window.innerWidth - 650
      var chartHeight = 175;
    }
    else {
      var chartWidth = window.innerWidth - 650
      var chartHeight = 110;
    }
    // else if (window.screen.availWidth >= 2000) {
    //   var chartWidth = window.innerWidth - 1100;
    // }

    // var chartHeight = 200;
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;


    const svg = d3
      .select(id)
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
    // .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)

    // .style("background-color","yellow");

    const graph = svg
      .append("g")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let reverseData = data.map(d => d.key);

    const xScale = d3
      .scalePoint()
      .domain(reverseData)
      .range([0, width])
      .padding(0.55);


    let maxi = d3.max(data, d => d.totalCandidates);
    if (maxi % 4 !== 0) {
      maxi = maxi + (4 - (maxi % 4));
    }

    const yScale = d3.scaleLinear().domain([0, maxi]).range([height, 0]);
    const xAxisGroup = graph
      .append("g")
      .attr("transform", "translate(" + 0 + "," + height + ")");




    const xAxis = axisBottom(xScale).tickSize(-height);
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(maxi < 4 ? maxi : 4)
      .tickSize(-width);

    xAxisGroup
      // .append("g")
      // .attr("class", "bar-x-axis")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(0,10)");
    const yAxisGroup = graph.append("g").call(yAxis);

    const circles = graph.selectAll("circle").data(data);

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ffffff");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#97d9e1");


    var div = d3
      .select("body")
      .append("div")
      .attr("class", "toolTip")
      .classed("toolTipForBarGraph", true);
    circles
      .enter()
      .append("circle")
      .attr("r", 6)
      .attr("cx", data => xScale(data.key))
      .attr("cy", data => yScale(data.totalCandidates))
      .attr("fill", "#6C9F9B")
      .attr("stroke-width", function () {
        return 1;
      })
      .attr("stroke", "#3379B3")
      .on("mouseover", function (e, d) {
        graph
          .append("rect")
          .attr("x", () => xScale(d.key) - margin.right)
          .attr("y", () => yScale(d.totalCandidates) + margin.right)
          .attr("width", 40)
          .attr("height", () => {
            return (height - yScale(d.totalCandidates) - margin.right) > 0 ?
              (height - yScale(d.totalCandidates) - margin.right) : 0
          })
          .attr("fill", "url(#bar-gradient)");

        div.style("left", e.pageX - 90 + "px");
        div.style("top", e.pageY - 130 + "px");
        div.style("display", "inline-block");
        div.html(
          `<div class="groupNameLine">
              <div class="mr-3">
             Total Evaluated Candidates 
  </div>
  <div>${d.totalEvaluated}</div>
              </div>
              <div class="countDivLine">
             <div class="countDivData">
              <div class="colorlineLine"></div>
             <div class="graphFonts" >
              <div class="d-flex align-items-center justify-content-between p-2">
            <div>  Total Candidates</div>
  <div>
  ${d.totalCandidates}
              </div>
             </div>
  
              <div class="d-flex align-items-center justify-content-between p-2">
            <div>  Total Tests</div>
  
             <div> ${d.totalTests}</div>
              </div>
             </div>
             </div>
              </div>
              `
        );
      })
      .on("mouseout", function () {
        graph.select("rect").remove();
        div.style("display", "none");
      });
    const line = d3
      .line()
      .x(d => xScale(d.key))
      .y(d => yScale(d.totalCandidates))
      .curve(d3.curveMonotoneX);
    // .curve(d3.curveStep);

    graph
      .append("path")
      .data([data])
      .attr("fill", "none")
      .attr("stroke", "#A9A9A9")
      .attr("d", line);

  }

}


/*
// class reclinechart {
//   //   async mygraph1(data) {


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


//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
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



//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;

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


//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;

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



//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;

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
//Recruitment Graphsssss
*/

// #Recruitment Graphss

class reclinechart {
  //   async mygraph1(data) {



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
    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;
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
      .on("mouseover", function (e, d) { })
      .on("mouseout", function () { });

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


    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;

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
      .on("mouseover", function (e, d) { })
      .on("mouseout", function () { });

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


    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;

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
      .on("mouseover", function (e, d) { })
      .on("mouseout", function () { });

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



    //  const max = Math.max(...data.map((o) => o.progress.length));
    const max = reverseData.length;

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
      .on("mouseover", function (e, d) { })
      .on("mouseout", function () { });

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



//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
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


//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
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



//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;
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



//     //  const max = Math.max(...data.map((o) => o.progress.length));
//     const max = reverseData.length;

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

  async createDensity(id, datass, count) {
    var svgWidth;
    var svgHeight = 270;
    if (document.getElementById(id).innerHTML != "") {
      document.getElementById(id).innerHTML = "";
    }
    const Data2 = datass;
    let lineChartData1 = [],
      lineChartData2 = [],
      lineChartData3 = [];

    lineChartData1[0] = { ...Data2[0] };
    lineChartData2[0] = { ...Data2[1] };
    lineChartData3[0] = { ...Data2[2] };


    const margin = {
      top: 25,
      bottom: 25,
      left: 25,
      right: 20,
    };


    // var widthss = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (window.innerWidth >= 1700) {
      svgWidth = window.innerWidth - 900
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1500) {
      svgWidth = window.innerWidth - 800
    }
    else if (window.innerWidth >= 1300) {
      svgWidth = window.innerWidth - 700;
    }
    else if (window.innerWidth >= 1100) {
      svgWidth = window.innerWidth - 400;
    }




    const width1 = svgWidth - margin.left - margin.right;
    const height1 = svgHeight - margin.top - margin.bottom;


    // /*original
    const svg = d3
      .select("#density_graph")
      .classed("svg-container", true)
      .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)

      .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
      .classed("svg-content-responsive", true);

    // .attr("width", svgWidth)
    // .attr("height", svgHeight)
    // .style("background-color", "red");

    var ctrl, key;

    // Attach the resize event listener
    document.body.addEventListener("keydown", function (ev) {
      ev = ev || window.event;
      key = ev.which || ev.code;
      ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
      window.addEventListener("resize", resize);

      // }
    }, false);

    function resize() {

      if (ctrl && key === 109 && window.innerWidth > 1900) {

        var containerWidth = parseInt(d3.select("#density_graph").style("width"));
        var containerHeight = parseInt(d3.select("#density_graph").style("height"));

        svg.attr("viewBox", "0 0 " + svgWidth * containerWidth / (svgWidth - 100) + " " + svgHeight * containerHeight / svgHeight);
      }
      else if (window.innerWidth > 1700) {

        svg.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
        if (window.innerHeight > 950) {
          svg.attr("viewBox", `0 0 ${svgWidth + 200} ${svgHeight + 50}`);
        }

      }
      else {

        svg.attr("viewBox", `0 0 ${svgWidth + 20} ${svgHeight + 50}`)

      }
    }
    // */


    /* Tried One
    
    // var svg = d3
    //   .select("#density_graph")
      
    //   .append("svg")
    //   .attr("width", "100%")
    //   .attr("height", "100%")
    //   // .classed("svg-content-responsive", true);

    //   svg.attr("viewBox", "0 0 " + svgWidth + " " + svgHeight)
    
    //   ;

      function resize() {
        var containerWidth = parseInt(d3.select("#density_graph").style("width"));
        var containerHeight = parseInt(d3.select("#density_graph").style("height"));
      
        // Update the viewBox based on the container size
        svg.attr("viewBox", "0 0 " + svgWidth * containerWidth / svgWidth + " " + svgHeight * containerHeight / svgHeight);
      }
      
      // Attach the resize event listener
      window.addEventListener("resize", resize);
      
      // Call resize initially to set the SVG size based on the container
      resize();
      
      
      */


    const g = svg
      .append("g")
      // .attr('transform', `translate(${margin.left}, ${margin.top})`);

      .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

    const xAxisTranslate = svgHeight - margin.bottom;

    const g1 = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")");

    const parsedData1 = lineChartData1.map((company) => ({
      ticker: company.ticker,
      values: company.data.map((val) => ({
        close: val.value,
        // date: parseTime(val.date)
        date: val.date,
      })),
    }));      //GOOD

    const parsedData2 = lineChartData2.map((company) => ({
      ticker: company.ticker,
      values: company.data.map((val) => ({
        close: val.value,
        // date: parseTime(val.date)
        date: val.date,
      })),
    }));          //LAGGING

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



    const xScale = d3.scalePoint()
      .domain(xScaleDomain1)
      .range([0, width1]);

    const xScale1 = d3.scalePoint().domain(xScaleDomain1).range([0, width1 - 15]);


    const xScale11 = scaleLinear()
      .domain([1, 7])
      .range([0, width1])
      .nice();

    const xScale3 = scaleBand().domain(xScaleDomain3).range([0, svgWidth]);

    const max1 = Math.max(...parsedData1[0].values.map((o) => o.close));
    const max2 = Math.max(...parsedData2[0].values.map((o) => o.close));
    const max3 = Math.max(...parsedData3[0].values.map((o) => o.close));

    const min1 = Math.min(...parsedData1[0].values.map((o) => o.close));
    const min2 = Math.min(...parsedData2[0].values.map((o) => o.close));
    const min3 = Math.min(...parsedData3[0].values.map((o) => o.close));



    let largest = Math.max(max1, max2, max3);
    if (largest % 5 !== 0) {
      largest = largest + (5 - (largest % 5));
      if (largest % 10 !== 0) {
        largest = largest + (largest % 10)
      }
    }
    // else{
    //   largest = largest + (5 - (largest % 5));

    // }


    const yScale_grid = d3
      .scaleLinear()
      // .domain( largest<=10?
      //   [0, 5]:largest<=20?[0, 4]:[0, 5]
      //   )
      .domain(largest <= 10 ?
        [0, 5] : largest <= 15 ? [0, 3] : largest <= 20 ? [0, 4] : [0, 5]
      )
      .range([height1, 0])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, largest])
      .range([height1, 0]);
    // .domain([5, largest])
    // .range([height1, 5]);

    const yScale1 = d3
      .scaleLinear()
      .domain([0, largest])
      .range([(height1 - 8), 0]);

    // const yScale2 = d3.scaleLinear().domain([ 0,largest]).range([height1, -(margin.top-4)]);
    const yScale2 = d3.scaleLinear().domain([0, largest]).range([(height1 - 8), 0]);


    const yScale3 = scaleLinear().domain([0, largest]).range([(height1 - 8), 0]);
    const x_axis = axisBottom(xScale1).tickSizeOuter(0)
      .tickSizeInner(0);

    const xGridLine = axisBottom(xScale11)
      .scale(xScale11)
      .tickSize(-height1)
      .ticks(7)
      .tickFormat("");


    const yScaless = scaleLinear()
      .domain([0, max1])
      .range([svgHeight, 0]);


    svg
      .append("g")
      .classed("gridLine", true)
      .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")")
      .style("color", "#DCDCDC")
      .attr("opacity", "0.5")
      .call(xGridLine)




    const yGridLine = axisLeft(yScale_grid)
      .scale(yScale)
      .tickSize(-width1, 0, 0)
      .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
      .tickFormat("");


    g
      .append("g")
      .classed("gridLine", true)
      // .attr("transform", "translate(25,0)")
      .style("color", "#DCDCDC")
      .attr("opacity", "0.5")
      .call(yGridLine);

    const y_axis = axisLeft(yScale)
      // .tickSize(-width1)
      .scale(yScale)
      .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
      .tickSizeOuter(0)
      .tickSizeInner(0);

    g
      .append("g")
      .attr("class", "y axis")
      // .attr("transform", "translate(" + 25 + "," + 0 + ")")
      .style("color", "#A3A3A3")
      .call(y_axis);



    g.selectAll(".tick")
      .filter(function (d) { return d === 0; })
      .remove();

    g.selectAll('.domain').attr('stroke-width', 0);


    var x = xScale,
      y = yScale1;

    //LINE 1 STARTS
    const line1 = d3Line
      .line()
      // .interpolate("basis")
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.close)
      })
      // .curve(curveBasis);
      .curve(d3.curveCatmullRom.alpha(0.8));

    // /* cooment out
    g.selectAll(".line")
      .data(parsedData1)
      .enter()
      .append("path")
      .attr("d", (d) => {
        const lineValues1 = line1(d.values).slice(1);
        const splitedValues1 = lineValues1.split(",");

        return `M0,${height1},${lineValues1},l0,${height1 - splitedValues1[splitedValues1.length - 1]
          }`;
      })
      // .style('fill', '#E31A1C')
      .style("fill", "#C3FDB8")

      .style("opacity", 0.4);


    // comment out end
    // */

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
      .x((d) => {
        return xScale(d.date)
      }
      )
      .y((d) => yScale2(d.close))
      .curve(d3.curveCatmullRom.alpha(0.8));
    // .curve(curveBasis);

    g.selectAll(".line")
      .data(parsedData2)
      .enter()
      .append("path")
      .attr("d", (d) => {
        const lineValues2 = line2(d.values).slice(1);
        const splitedValues2 = lineValues2.split(",");

        return `M0,${height1},${lineValues2},l0,${height1 - splitedValues2[splitedValues2.length - 1]
          }`;
      })
      .style("fill", "#FFC145")
      .style("opacity", 0.5);

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

    // /*
    const line3 = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale3(d.close))
      .curve(d3.curveCatmullRom.alpha(0.8));
    // .curve(curveBasis);

    g.selectAll(".line")
      .data(parsedData3)
      .enter()
      .append("path")
      .attr("d", (d) => {

        const lineValues3 = line3(d.values).slice(1);
        const splitedValues3 = lineValues3.split(",");

        return `M0,${height1},${lineValues3},l0,${height1 - splitedValues3[splitedValues3.length - 1]
          }`;
      })
      .style("fill", "#F67280")
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

    // */

    // tt3.on("mouseover", function (d, e) {

    //   g
    //     .append("circle")
    //     .attr("cx", () => (d.offsetX - margin.left))
    //     .attr("cy", () => (d.offsetY))
    //     .attr("r", 8)
    //     .attr("fill", "#D34C15")
    //     .attr("stroke-width", function () {
    //       return 4;
    //     })
    //     .attr("stroke", "white");
    //   // div.style("left", e.pageX + "px");
    //   // div.style("top", e.pageY - 87 + "px");
    //   div.style("display", "inline-block");
    // });
    // tt3.on("mouseout", function () {

    //   svg.select("circle").remove();
    //   div.style("display", "none");
    // });

    //LINE3 ENDS

    g1.append("g")
      .attr("class", "bar-x-axis")
      .call(x_axis)
      .style("color", "#A3A3A3")
      .selectAll("text")
      .text(function (d) {
        return d.split(',')[0]
      })
      // .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      // .style("font", "Roboto")
      .attr("dx", ".8em")
      .attr("dy", ".15em")
      // .attr("transform", "rotate(-5)")
      .attr("transform", "translate(" + 0 + "," + 5 + ")")
      ;
    g1.select('.domain').attr('stroke-width', 0)



    // svg
    //   .append("g")
    //   .attr("class", "bar-x-axis")
    //   .attr("transform", "translate(25,0)")
    //   .call(y_axis)
    //   .selectAll("text")
    //   .style("text-anchor", "end")
    //   .style("color", "#A3A3A3")
    //   .style("font", "Roboto")
    //   .attr("dx", "-.8em")
    //   .attr("dy", ".15em");

    //  const tick2 =  g.append('g')
    //   .attr("transform", "translate(0," + 0 + ")")
    //   .call(d3.axisLeft(yScale1)
    //     .ticks(5));
    // tick2
    // .selectAll('line')
    //   .attr('stroke', `5, 5`)
    //   .attr('stroke', '#ccc')
    //   .attr('x2', `${svgWidth}px`)

    // svg.select(".domain").attr("stroke", "#ddd");



    this.densityCircle(svg, g, datass, largest, count);
  }

  async createDensity2(id, datass) {
    const Data2 = datass;
    let lineChartData1 = [],
      lineChartData2 = [],
      lineChartData3 = [];

    lineChartData1[0] = { ...Data2[0] };
    lineChartData2[0] = { ...Data2[1] };
    lineChartData3[0] = { ...Data2[2] };


    const margin = {
      top: 3,
      bottom: 3,
      left: 3,
      right: 3,
    };

    const svgWidth = 100;
    const svgHeight = 55;

    const width1 = svgWidth - margin.left - margin.right;
    const height1 = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(id)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    // .style("background-color", "red");

    const g = svg
      .append("g")
      // .attr('transform', `translate(${margin.left}, ${margin.top})`);

      .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

    const xAxisTranslate = svgHeight - margin.bottom;


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


    const xScale = d3.scalePoint()
      .domain(xScaleDomain1)
      .range([0, width1]);

    const xScale1 = d3.scalePoint().domain(xScaleDomain1).range([0, width1]);


    const xScale11 = scaleLinear()
      .domain([1, 7])
      .range([0, width1])
      .nice();

    const xScale3 = scaleBand().domain(xScaleDomain3).range([0, svgWidth]);

    const max1 = Math.max(...parsedData1[0].values.map((o) => o.close));
    const max2 = Math.max(...parsedData2[0].values.map((o) => o.close));
    const max3 = Math.max(...parsedData3[0].values.map((o) => o.close));


    var largest = Math.max(max1, max2, max3);
    if (largest % 5 !== 0) {
      largest = largest + (5 - (largest % 5));
    }

    const yScale_grid = d3
      .scaleLinear()
      .domain(largest <= 10 ?
        [0, 5] : largest <= 15 ? [0, 3] : largest <= 20 ? [0, 4] : [0, 5]
      )
      .range([height1, 0])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, largest])
      .range([height1, 0]);


    const yScale1 = d3
      .scaleLinear()
      .domain([0, largest])
      .range([(height1 - 8), 8]);

    // const yScale2 = d3.scaleLinear().domain([0, max2]).range([height1, 0]);
    const yScale2 = d3.scaleLinear().domain([0, largest]).range([(svgHeight - 8), 8]);
    const yScale3 = scaleLinear().domain([0, largest]).range([(svgHeight - 8), 8]);

    // const yScale3 = d3.scaleLinear().domain([0, max3]).range([height1, 0]);



    const xGridLine = axisBottom(xScale11)
      .scale(xScale11)
      .tickSize(-height1)
      .ticks(7)
      .tickFormat("");

    svg
      .append("g")
      .classed("gridLine", true)
      .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")")
      .style("color", "#DCDCDC")
      .attr("opacity", "0.5")
      .call(xGridLine)


    const yGridLine = axisLeft(yScale_grid)
      .scale(yScale_grid)
      .tickSize(-width1, 0, 0)
      .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
      .tickFormat("");

    g
      .append("g")
      .classed("gridLine", true)
      // .attr("transform", "translate(25,0)")
      .style("color", "#DCDCDC")
      .attr("opacity", "0.5")
      .call(yGridLine);

    //LINE 1 STARTS
    const line1 = d3Line
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale1(d.close))
      .curve(d3.curveCatmullRom.alpha(0.8));

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
      .curve(d3.curveCatmullRom.alpha(0.8));



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
      .curve(d3.curveCatmullRom.alpha(0.8));


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
    svg.select(".domain").attr("stroke", "#ddd");
  }

  async createDensity3(id, datass, largest) {
    /*
        // document.getElementById(id).innerHTML = ""
        const Data2 = datass;
        const lineChartData1 = [],
          lineChartData2 = [],
          lineChartData3 = [];
    
        lineChartData1[0] = { ...Data2[0] };
        lineChartData2[0] = { ...Data2[1] };
        lineChartData3[0] = { ...Data2[2] };

    
        const margin = {
          top: 3,
          bottom: 3,
          left: 3,
          right: 3,
        };
    
        const svgWidth = 100;
        const svgHeight = 55;
    
        const width1 = svgWidth - margin.left - margin.right;
        const height1 = svgHeight - margin.top - margin.bottom;
    
        const svg = select(id)
          .append("svg")
          .attr("width", svgWidth)
          .attr("height", svgHeight);
        // .style("background-color", "red");
    
        const g = svg
          .append("g")
          // .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
          .attr("transform", "translate(" + 0 + "," + margin.bottom + ")");
    
        const xAxisTranslate = svgHeight - margin.bottom;
    
        const g1 = svg
          .append("g")
          .attr("transform", "translate(" + 0 + "," + xAxisTranslate + ")");
    
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
    
    
        const xScale = d3.scalePoint()
          .domain(xScaleDomain1)
          .range([0, width1]);
    
        const xScale1 = d3.scalePoint().domain(xScaleDomain1).range([0, width1]);
    
    
        const xScale11 = scaleLinear()
          .domain([1, 7])
          .range([0, width1])
          .nice();
    
        const xScale3 = scaleBand().domain(xScaleDomain3).range([0, svgWidth]);
    
        const max1 = Math.max(...parsedData1[0].values.map((o) => o.close));
        const max2 = Math.max(...parsedData2[0].values.map((o) => o.close));
        const max3 = Math.max(...parsedData3[0].values.map((o) => o.close));
    
        const yScale1 = d3
          .scaleLinear()
          .domain([0, max1])
          .range([svgHeight - margin.bottom, 0]);
    
        const yScale2 = d3.scaleLinear().domain([0, max2]).range([height1, 0]);
    
        const yScale3 = d3.scaleLinear().domain([0, max3]).range([height1, 0]);
    
        const x_axis = axisBottom(xScale1).tickSizeOuter(0)
          .tickSizeInner(0);
    
        const xGridLine = axisBottom(xScale11)
          .scale(xScale11)
          .tickSize(-svgHeight, 0, 0)
          .ticks(7)
          .tickFormat("");
    
        svg
          .append("g")
          .classed("gridLine", true)
          .attr("transform", "translate(" + 0 + "," + xAxisTranslate + ")")
          .style("color", "#DCDCDC")
          .attr("opacity", "0.5")
          .call(xGridLine);
    
    
    
        const y_axis = axisLeft(yScale1)
          .tickSize(-width1)
          // .ticks(script.max <= 10 ? script.max
          //   : script.max <= 29 ? (script.max + 5) / 5
          //     : script.max <= 25 || ?);
          .ticks(7)
          .tickFormat("");
    
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
    
            return `M0,${height1},${lineValues1},l0,${height1 - splitedValues1[splitedValues1.length - 1]
              }`;
          })
          .style("fill", "none")
          // .style("fill", "#e2f7cf")
    
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
    
            return `M0,${height1},${lineValues2},l0,${height1 - splitedValues2[splitedValues2.length - 1]
              }`;
          })
          .style("fill", "none")
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
    
            return `M0,${height1},${lineValues2},l0,${height1 - splitedValues2[splitedValues2.length - 1]
              }`;
          })
          .style("fill", "none")
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
    
        // g1.append("g")
        //   .attr("class", "bar-x-axis")
        //   .call(x_axis)
        //   .style("color", "#A3A3A3")
        //   .selectAll("text")
        //   .text(function (d) {
        //    return d.split(',')[0]
        //   })
        //   .style("text-anchor", "end")
        //   .style("color", "#A3A3A3")
        //   .style("font", "Roboto")
        //   .attr("dx", ".8em")
        //   .attr("dy", ".15em")
        //   // .attr("transform", "rotate(-30)");
        //   .attr("transform", "translate(" + 10 + "," + 5 + ")");
    
        svg
          .append("g")
          .attr("class", "bar-x-axis")
          .attr("transform", "translate(0,0)")
          .call(y_axis)
          // .selectAll("text")
          // .style("text-anchor", "end")
          .style("color", "#DCDCDC")
          .attr("opacity", "0.5");
        // .style("font", "Roboto")
        // .attr("dx", "-.8em")
        // .attr("dy", ".15em");
    
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
    
        */


    const Data2 = datass;
    let lineChartData1 = [],
      lineChartData2 = [],
      lineChartData3 = [];

    lineChartData1[0] = { ...Data2[0] };
    lineChartData2[0] = { ...Data2[1] };
    lineChartData3[0] = { ...Data2[2] };


    const margin = {
      top: 3,
      bottom: 3,
      left: 3,
      right: 3,
    };

    const svgWidth = 100;
    const svgHeight = 55;

    const width1 = svgWidth - margin.left - margin.right;
    const height1 = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(id)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    // .style("background-color", "red");

    const g = svg
      .append("g")
      // .attr('transform', `translate(${margin.left}, ${margin.top})`);

      .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

    const xAxisTranslate = svgHeight - margin.bottom;


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

    const xScale = d3.scalePoint()
      .domain(xScaleDomain1)
      .range([0, width1]);

    const xScale1 = d3.scalePoint().domain(xScaleDomain1).range([0, width1]);


    const xScale11 = scaleLinear()
      .domain([1, 7])
      .range([0, width1])
      .nice();

    const xScale3 = scaleBand().domain(xScaleDomain3).range([0, svgWidth]);

    const max1 = Math.max(...parsedData1[0].values.map((o) => o.close));
    const max2 = Math.max(...parsedData2[0].values.map((o) => o.close));
    const max3 = Math.max(...parsedData3[0].values.map((o) => o.close));


    var largest = Math.max(max1, max2, max3);
    if (largest % 5 !== 0) {
      largest = largest + (5 - (largest % 5));
    }

    const yScale_grid = d3
      .scaleLinear()
      .domain(largest <= 10 ?
        [0, 5] : largest <= 15 ? [0, 3] : largest <= 20 ? [0, 4] : [0, 5]
      )
      .range([height1, 0])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([0, largest])
      .range([height1, 0]);


    const yScale1 = d3
      .scaleLinear()
      .domain([0, largest])
      .range([(height1 - 8), 8]);

    // const yScale2 = d3.scaleLinear().domain([0, max2]).range([height1, 0]);
    const yScale2 = d3.scaleLinear().domain([0, largest]).range([(svgHeight - 8), 8]);
    const yScale3 = scaleLinear().domain([0, largest]).range([(svgHeight - 8), 8]);

    // const yScale3 = d3.scaleLinear().domain([0, max3]).range([height1, 0]);



    const xGridLine = axisBottom(xScale11)
      .scale(xScale11)
      .tickSize(-height1)
      .ticks(7)
      .tickFormat("");

    svg
      .append("g")
      .classed("gridLine", true)
      .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")")
      .style("color", "#DCDCDC")
      .attr("opacity", "0.5")
      .call(xGridLine)


    const yGridLine = axisLeft(yScale_grid)
      .scale(yScale_grid)
      .tickSize(-width1, 0, 0)
      .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
      .tickFormat("");

    g
      .append("g")
      .classed("gridLine", true)
      // .attr("transform", "translate(25,0)")
      .style("color", "#DCDCDC")
      .attr("opacity", "0.5")
      .call(yGridLine);

    //LINE 1 STARTS
    const line1 = d3Line
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale1(d.close))
      .curve(d3.curveCatmullRom.alpha(0.8));

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
      .curve(d3.curveCatmullRom.alpha(0.8));



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
      .curve(d3.curveCatmullRom.alpha(0.8));


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
    svg.select(".domain").attr("stroke", "#ddd");
  }

  densityCircle(svg, g, datass, largest, count) {

    const datas = datass;
    const len = datas.length;
    const data33 = datas[len - 1].data;
    const data22 = datas[len - 2].data;
    const data11 = datas[len - 3].data;


    var svgWidth;
    var svgHeight = 270;
    const margin = {
      top: 25,
      bottom: 25,
      left: 25,
      right: 20,
    };
    if (window.innerWidth >= 1700) {
      svgWidth = window.innerWidth - 900
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1500) {
      svgWidth = window.innerWidth - 800
    }
    else if (window.innerWidth >= 1300) {
      svgWidth = window.innerWidth - 700;
    }
    else if (window.innerWidth >= 1100) {
      svgWidth = window.innerWidth - 400;
    }

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;



    const gs = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");


    const xDomain = data33.map((d) => d.date);
    var x = d3.scalePoint()
      .domain(xDomain)
      .range([0, width]);

    var y = scaleLinear().domain([0, largest]).range([(height - 8), 0]);

    var tt = g.selectAll()
      .data(data33)
      .enter()
      .append("ellipse")
      .attr("fill", "black")
      .style("opacity", 0)
      .attr("stroke", "none")
      .attr("cx", function (d, i) {
        return x(d.date)
      })

      .attr("cy", function (d) {

        return y(d.value)
      })
      .attr("rx", 7)
      .attr("ry", height).raise();



    var Tooltip = select("body")
      // var Tooltip = select("#density_graph")
      .append("div")
      .style("opacity", 0)
      .attr("class", "toolTip")

      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute");

    const reverseData = data33.map((d) => d.values);
    const xScaless = scaleBand().domain(reverseData).range([0, width]);


    tt.on("mouseover", function (e, d, i) {

      var indexCount = count.findIndex(p => p.date === d.date);
      var indexGood = data11.findIndex(p => p.date === d.date);
      var indexLagging = data22.findIndex(p => p.date === d.date);
      var indexRisk = data33.findIndex(p => p.date === d.date);

      var redData = [];
      var yellowData = [];
      var greenData = [];
      redData.push(data33[indexRisk]);
      yellowData.push(data22[indexLagging]);
      greenData.push(data11[indexGood]);



      // /*circles making Start
      gs
        .selectAll()
        .data(redData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("fill", "#D34C15")
        // .style("opacity", 2)
        .attr("stroke", "white")
        .style("stroke-width", 2)
        .attr("cx", function (d, i) {
          return x(d.date)
        })
        .attr("cy", function (d) {
          return y(d.value)
        })
        .attr("r", 4);
      // .on("mouseover",function () {
      //   g.selectAll("ellipse").style("display","none");
      // })
      // .on("mouseout",function () {
      //   g.selectAll("ellipse").style("display","initial");
      // });

      gs.selectAll()
        .data(yellowData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("fill", (yellowData[0].value === redData[0].value) ? "#72738E" : "#FFC145")
        .style("opacity", 2)
        .attr("stroke", "white")
        .style("stroke-width", 2)
        .attr("cx", function (d, i) {
          return x(d.date)
        })
        .attr("cy", function (d) {
          return y(d.value)
        })
        .attr("r", 4);

      gs.selectAll()
        .data(greenData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("fill", (greenData[0].value === yellowData[0].value) ? "#72738E" : (greenData[0].value === redData[0].value) ? "#72738E" : "#89C30D")
        .style("opacity", 2)
        .attr("stroke", "white")
        .style("stroke-width", 2)
        .attr("cx", function (d, i) {
          return x(d.date)
        })
        .attr("cy", function (d) {
          return y(d.value)
        })
        .attr("r", 4);

      // Circles End  */

      Tooltip.html(
        `<div class="density-main">
        <div class="d-flex density-header mb-1">
        <div style="width:80%;" >Tatal JD’s</div> 
        <div  style="width:20%;"> ${count[indexCount].count} </div>
        </div>
        <hr class='density-line mb-0 mt-0'></hr>
        <div class="ml-2">
        <div  class="density-content mt-2"> 
        <div class="d-flex ">
        <div class="density-mdash-round good"></div>
        <div class ="d-flex ml-2">  ${data11[indexGood].value} JDs</div>
        </div>
        <div class="density-content mt-1"> 
        <div class="d-flex ">
        <div class="density-mdash-round lag "></div>
        <div class ="d-flex ml-2">   ${data22[indexLagging].value} JDs</div>
        </div>
        <div  class="density-content mt-1"> 
        <div class="d-flex ">
        <div class="density-mdash-round risk"></div>
        <div class ="d-flex ml-2">   ${data33[indexRisk].value} JDs</div>
        </div
        </div>
        </div>`
      )
        .style("left", e.pageX + 0 + "px")
        .style("top", e.pageY - 0 + "px")
        // .style("left", e.pageX + 70 + "px")
        // .style("top", e.pageY - 170 + "px")
        //     .style('left', `${e.pageX}px`)
        // .style('top', `${e.pageY}px`)
        .style("opacity", 1)

        .style("visibility", "visible");

      Tooltip.style("display", "block");
    });
    tt.on("mousemove", function (event) {
      Tooltip
        // .style('left', `${event.pageX}px`)
        // .style('top', `${event.pageY}px`);
        .style("left", event.pageX - 0 + "px")
        .style("top", event.pageY - 0 + "px")

    });


    tt.on("mouseout", function () {
      Tooltip.style("opacity", 0);
      gs.selectAll("circle")
        // .attr("opacity", 0)
        .remove();
      // g.selectAll("ellipse").remove();
      Tooltip.style("display", "none");
    });





  }
}

class funnelChart {
  async createFunnel(originalData) {
    if (document.getElementById('funnel').innerHTML != "") {
      document.getElementById('funnel').innerHTML = "";
    }
    let width;
    let height = 185;  //200
    let svgHeight = 250     //(185 + 65);
    let extraGap = 50;
    let myWidth = window.innerWidth;
    if (window.innerWidth >= 1700) {
      width = window.innerWidth - 200
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1500) {
      width = window.innerWidth - 300
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1300) {
      width = window.innerWidth - 300
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1100) {
      width = window.innerWidth - 450
      // svgHeight = 250
    }
    let svgWidth = width;
    width = svgWidth - extraGap;
    //  width = width + extraGap
    // const height = 200;
    const len = originalData.length;
    // const len = 15;

    let x1 = (width / len);
    let y1 = (height / (4 * len));
    // let y1 = (height/24);

    // create data
    // var data = [
    // //   // {x: 0, y: 0}, 
    // //   // {x: 50, y: 20}, 
    // //   // {x: 150, y: 20}, 
    // //   // {x: 200, y: 40}, 
    // //   // {x: 300, y: 40},
    // //   // {x: 350, y:60},
    // //   // {x: 450, y: 60} ,
    // //   // // {x: 600, y: 130}
    // //   // {x: 450, y: 100},

    //     {x: 0, y: 40}, 
    //   {x: x1/2, y: y1 + 40}, 
    //   {x: x1, y: y1 +40}, 
    //   {x: x1+(x1/2), y: y1+y1 +40}, 
    //   {x: x1+x1, y: y1+y1 +40},
    //   {x: x1+x1+(x1/2), y:y1+y1+y1+40},
    //   {x: x1+x1+x1, y: y1+y1+y1+40} ,
    //   // // {x: 600, y: 130}
    //   // {x: x1+x1+x1, y: y1+y1+y1+y1},

    // ];
    let datass = [{ x: 0, y: 40 }]
    let k = 1;
    for (let i = 0; i < len; i++) {
      const val = 2;
      for (let j = 0; j < val; j++) {
        let ob = { x: (x1 / 2) * k, y: (y1 * (i + 1)) + 40 };
        datass.push(ob);
        k++;
      }
      //  let ob = { x: (x1/2)*(i+1), y: (y1 * (i+1))+40 };
      //   datass.push(ob);
    }

    // var data2 = [

    // //   {x: 450, y: 100},
    // //   {x: 350, y:100 },
    // //   {x: 300, y: 120}, 
    // //   {x: 200, y: 120}, 
    // //   {x: 150, y: 140}, 
    // //   {x: 50, y: 140},
    // //   {x: 0, y:160},
    // //   // {x: 450, y: 60} ,
    // //   // {x: 600, y: 130}


    //   {x: x1+x1+x1, y:y1+y1+y1+y1 +40},
    //   {x: x1+x1+(x1/2), y:y1+y1+y1+y1 +40 },
    //   {x: x1+x1, y: (y1*5) +40}, 
    //   {x: x1+(x1/2), y: (y1*5) +40}, 
    //   {x: x1, y: (y1*6) +40}, 
    //   {x: x1/2, y: (y1*6) +40},
    //   {x: 0, y:(y1*7) +40}


    //   // {x: x1+x1+x1, y:y1+y1+y1 +40},
    //   // {x: x1+x1+(x1/2), y:y1+y1+y1 +40 },
    //   // {x: x1+x1, y: (y1*4) +40}, 
    //   // {x: x1+(x1/2), y: (y1*4) +40}, 
    //   // {x: x1, y: (y1*5) +40}, 
    //   // {x: x1/2, y: (y1*5) +40},
    //   // {x: 0, y:(y1*6) +40}

    // ]

    let datass2 = []
    let k2 = len * 2;
    let y_val = len + 1.5;
    for (let i = 0; i < len; i++) {
      let val = 2;

      for (let j = 0; j < val; j++) {
        let ob = { x: (x1 / 2) * k2, y: (y1 * y_val) + 40 };
        datass2.push(ob);
        k2--;
      }
      y_val++;
      //  let ob = { x: (x1/2)*(i+1), y: (y1 * (i+1))+40 };
      //   datass.push(ob);
    }
    datass2.push({ x: (x1 / 2) * k2, y: (y1 * y_val) + 40 })


    // create svg element:
    let svg1 = d3.select("#funnel")
      .classed("svg-container", true)
      .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
      .classed("svg-content-responsive", true)
    // .style("background-color", "black");

    let svg = svg1.append("g")
      .attr("transform", "translate(" + 50 + "," + 0 + ")");

    //Only For SVG 

    var ctrl, key;

    // Attach the resize event listener
    document.body.addEventListener("keydown", function (ev) {
      ev = ev || window.event;
      key = ev.which || ev.code;
      ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
      window.addEventListener("resize", resize);

      // }
    }, false);

    function resize() {

      // width = document.querySelector('#funnel').offsetWidth + 400

      if (ctrl && key === 109 && window.innerWidth > 1900) {

        var containerWidth = parseInt(d3.select("#funnel").style("width"));
        var containerHeight = parseInt(d3.select("#funnel").style("height"));
        if (document.querySelector('#funnel').offsetWidth > 1300) {
          svg1.attr("viewBox", "0 0 " + (width * 1.2) * containerWidth / (width - width / 20) + " " + height * containerHeight / (height - height / 3.7));
        }
        else {
          svg1.attr("viewBox", "0 0 " + width * containerWidth / (width - width / 5) + " " + height * containerHeight / (height - height / 7));
        }
      }
      else if (window.innerWidth > 1700) {
        if (document.querySelector('#funnel').offsetHeight > 1200) {
          // svg1.attr("viewBox", `0 0 ${width + 250} ${height}`);
          svg1.attr("viewBox", `0 0 ${svgWidth + 250} ${svgHeight}`);
        }
        else {
          svg1.attr("viewBox", `0 0 ${svgWidth + 150} ${svgHeight + 10}`);
        }

      }
      else {

        if (document.querySelector('#funnel').offsetHeight > 1100) {
          svg1.attr("viewBox", `0 0 ${svgWidth + 100} ${svgHeight}`)
        }
        else {
          svg1.attr("viewBox", `0 0 ${svgWidth + 50} ${svgHeight}`)
        }
      }
    }
    var curveFunc = d3.area()
      .x(function (d) { return d.x })      // Position of both line breaks on the X axis
      .y1(function (d) { return d.y })     // Y position of top line breaks
      .y0(95)                            // Y position of bottom line breaks (200 = bottom of svg area)
    // .y0(130)   

    var curveFunc2 = d3.area()
      .x(function (d) { return d.x })      // Position of both line breaks on the X axis
      .y1(function (d) { return d.y })     // Y position of top line breaks
      // .y0(102)  
      .y0(90)                            // Y position of bottom line breaks (200 = bottom of svg area)
    // Y position of bottom line breaks (200 = bottom of svg area)

    var curveFunc3 = d3Line.line()
      .x(function (d) { return d.x })      // Position of both line breaks on the X axis
      .y(function (d) { return d.y })     // Y position of top line breaks



    var defs = svg.append("defs");
    var gradient = defs.append("linearGradient")
      .attr("id", "svgGradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "100%")
      .attr("y2", "100%");
    gradient.append("stop")
      .attr('class', 'start')
      .attr("offset", "0%")
      .attr("stop-color", "#7664BC")
      .attr("stop-opacity", 1);
    gradient.append("stop")
      .attr('class', 'end')
      .attr("offset", "100%")
      .attr("stop-color", "#D6D1EB")
      .attr("stop-opacity", 1);
    // Add the path using this helper function
    svg.append('path')
      .attr('d', curveFunc(datass))
      // .attr('stroke', '#d6d1eb')
      // .style("stroke-width", 5)
      .attr('fill', 'url(#svgGradient)');

    svg.append('path')
      .attr('d', curveFunc2(datass2))
      // .attr('stroke', '#d6d1eb')
      // .style("stroke-width", 5)
      .attr('fill', 'url(#svgGradient)');

    svg.append('path')
      .attr('d', curveFunc3(datass))
      .attr('stroke', '#d6d1eb')
      // .style("stroke-width", 4)
      .attr("stroke-width", function (d, i) {

        return (3)
      })

      .attr('fill', 'none');

    svg.append('path')
      .attr('d', curveFunc3(datass2))
      .attr('stroke', '#d6d1eb')
      .style("stroke-width", 2.5)
      .attr('fill', 'none');




    //Funnel Gridlines
    const xScale1 = scaleLinear()
      .domain([0, len])
      .range([0, width])
      .nice();

    const xGridLine = d3.axisTop(xScale1)
      // .scale(xScale11)
      .tickSize(-(height - 30))
      .ticks(len)
      .tickFormat("");

    const xGroup = svg
      .append("g")
      .classed("gridLine", true)
      .attr("transform", "translate(" + 0 + "," + 0 + ")")
      // .attr("transform", function(d,i){

      //    return "translate(" + 0 + "," + d.y + ")"
      //   }
      // )

      .style("color", "#C4C4C4")
      // .attr("opacity", "0.5")
      .call(xGridLine)

    xGroup.select('.domain').attr('stroke-width', 0)

    //Gridline end

    // X axis line Funnel

    const g1 = svg
      .append("g")
      .attr("transform", "translate(" + 0 + "," + (height - 30) + ")");

    const xScale = d3.scaleBand().domain(originalData.map((d) => d.level)).range([0, width]);
    /*
        const onlyxScale = d3.scaleBand().domain(originalData.map((d) => d.level)).range([0, (width-x1)]);
        const onlyXaxis = axisBottom(onlyxScale)
          .ticks(len)
          .tickSizeOuter(0)
          .tickSizeInner(0);
    
          const xGroups = g1.append("g")
          .attr("class", "x-axis")
          .call(onlyXaxis)
          .style("color", "#A3A3A3")
    */

    const x_axis = axisBottom(xScale)
      .ticks(len)
      .tickFormat("")
      .tickSizeOuter(0)
      .tickSizeInner(0);
    const xGroup2 = g1.append("g")
      .attr("class", "x-axis")
      .call(x_axis)
      .style("color", "#C4C4C4")
      // .style("color", "red")
      ;




    let rect_data = []
    for (let i = 0; i < len; i++) {
      rect_data.push(i);
    }


    var nodes_rect = xGroup2
      .selectAll(".rect")
      .data(rect_data)
      .enter()
      .append("g")
      // .classed('rect', true)

      .append("rect")
      .attr("width", 80)
      .attr("height", 15)
      .attr("x", function (d, i) {
        return (x1 * (i + (1 / 2)) - 40)
      })
      .attr("y", function (d, i) {

        return y1 / 2 - 10;
        // return height - 40
      })
      .attr("fill", "white");
    // .attr("fill", "white");


    var nodes_text = svg
      .selectAll(".text")
      .data(rect_data)
      .enter()
      .append("g")
    // .classed('rect', true)

    nodes_text.append("text")
      // .attr("width", 50)
      // .attr("height", 15)
      .attr("x", function (d, i) {
        // return (x1 * (i) + 10)
        return (x1 * (i) + (x1 / 2))
      })
      .attr("y", function (d, i) {

        return y1 / 2 + 10;
        // return height - 40
      })
      .text(function (d, i) {

        return (originalData[i].count)
      })
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .attr("fill", "#696969");

    // .attr("fill", "white");


    nodes_text.append("text")
      // .attr("width", 50)
      // .attr("height", 15)
      .attr("x", function (d, i) {
        return (x1 * (i) + (x1 / 2 - 30))

        // return (x1 * (i) + 10)
      })
      .attr("y", function (d, i) {

        return y1 / 2 + 25;
        // return height - 40
      })
      .text(function () {
        return (`Candidates`)
      })
      .attr("font-size", "12px")
      .attr("font-weight", "400")
      .attr("fill", "#ADADAD");

    // xGroup2.select('.domain').attr('stroke-width', 0)

    const xGroup_text = g1.append("g")
      .attr("class", "bar-x-axis")
      .call(x_axis)
    // .style("color", "red")

    xGroup_text.select('.domain').attr('stroke-width', 0);

    xGroup_text
      .selectAll("text")
      .text(function (d, i) {

        return i < (len - 1) ?
          (` Level ` + originalData[i].level) : ("Final")
      })
      .style("color", "#696969")
      .attr("font-weight", function (d, i) {

        return i < (len - 1) ? "500" : "600"

      })
      .attr("font-family", "Poppins")
      .attr("font-size", function (d, i) {

        return i < (len - 1) ? "12px" : "14px"

      })
      .attr("transform", "translate(" + 0 + "," + -6 + ")")
      .raise();

    const glast = svg
      .append("g")
      .attr("transform", "translate(" + 0 + "," + (svgHeight - 50) + ")")

    const xGroup2_Rect = glast.append("g")
      .attr("class", "x-axis")
      .call(x_axis)
    // .style("color", "pink");

    xGroup2_Rect.append("rect")
      .attr("width", width)
      .attr("height", "40")
      .attr("x", 0)
      .attr("y", 0)
      .style("fill", "#E5E5E5")
      // .style("background-color", "black")
      .attr("transform", "translate(" + 0 + "," + (-20) + ")");

    const xGroup_LastText = glast.append("g")
      .attr("class", "bar-x-axis")
      .call(x_axis);

    xGroup_LastText.select('.domain').attr('stroke-width', 0);

    xGroup_LastText
      .selectAll("text")
      .text(function (d, i) {
        return ((` Round ` + originalData[i].level) + ' : ' + originalData[i].actualCount)
        // return i < (len - 1) ?
        //   (` Round ` + originalData[i].level) + ' : ' + originalData[i].actualCount : (`Selected`+' :'+'100')
      })

      .style("color", "#7664BC")
      .attr("font-weight", function (d, i) {

        return 600

      })

      .attr("font-family", "Poppins")
      .attr("font-size", function (d, i) {

        return "12px"

      })
      .attr("transform", "translate(" + 0 + "," + -6 + ")")
      .raise();


    //Y scale Text
    const yScaleText = scaleLinear()
      .domain([0, height])
      .range([height, 0])

    const y_axis_title = axisLeft(yScaleText)
      .tickFormat("")
      .tickSizeOuter(0)
      .tickSizeInner(0);
    const y_title = svg
      .append("g")
      .attr("transform", "translate(" + -20 + "," + (-height / 1.8) + ")");
    const y_tittle_txt = y_title
      .append("g")
      .call(y_axis_title);
    y_tittle_txt.select('.domain').attr('stroke-width', 0);

    y_tittle_txt.select("text")
      .style("text-anchor", "middle")
      .style("color", "#030229")
      .style("font-family", "poppins")
      .style("font-size", "12px")
      .style("font-weight", "500")

      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-90)")
      .text(function () {
        return "Accumulative"
      });

    const y_axis_title2 = axisLeft(yScaleText)
      .tickFormat("")
      .tickSizeOuter(0)
      .tickSizeInner(0);
    const y_title2 = svg
      .append("g")
      .attr("transform", "translate(" + -15 + "," + ((height / 10) - 25) + ")");
    const y_tittle_txt2 = y_title2
      .append("g")
      .call(y_axis_title2);
    y_tittle_txt2.select('.domain').attr('stroke-width', 0);


    y_tittle_txt2.select("text")
      .style("text-anchor", "middle")
      .style("color", "#030229")
      .style("font-family", "poppins")
      .style("font-size", "12px")
      .style("font-weight", "500")

      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-90)")
      // .attr("transform", "translate(" + 40 + "," + 0 + ")")
      .text(function () {
        return "Selection"
      })

    const y_title3 = svg
      .append("g")
      .attr("transform", "translate(" + -28 + "," + ((height / 10) - 20) + ")");
    const y_tittle_txt3 = y_title3
      .append("g")
      .call(y_axis_title2);
    y_tittle_txt3.select('.domain').attr('stroke-width', 0);

    y_tittle_txt3.select("text")
      .style("text-anchor", "middle")
      .style("color", "#030229")
      .style("font-family", "poppins")
      .style("font-size", "12px")
      .style("font-weight", "500")

      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-90)")
      // .attr("transform", "translate(" + 40 + "," + 0 + ")")
      .text(function () {
        return "Actual"
      })


  }
}

// Recruitment New Start 

class rolePieChart {
  pieGraph(id, id2, data) {
    if (document.getElementById(id2).innerHTML != "") {
      document.getElementById(id2).innerHTML = ""
    }
    let pie_data = data.data
    const svgHeight = 280,
      radius = Math.min(script.svgWidth / 3, svgHeight) / 2;
    console.log("the redd", radius)
    const start_point = script.svgWidth / 6;

    const svg = select(id)
      .append("svg")
      .attr("viewBox", `0 0 ${script.svgWidth / 3} ${svgHeight}`)
      .attr("height", svgHeight)
    // .style("background-color", "black");

    const g = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + start_point + "," + svgHeight / 2 + ")"
      );


    let colorScale = scaleOrdinal()
      .domain(pie_data.map((d) => d.roleName))
      .range(["#4070EA", "#F5D06E", "#038E00", "#AD1927", "#595959", "#269C8A",]);


    const pies = d3Line.pie()
      .sort(null)
      .value(function (d) {
        return d.percentage;
      });

    const path = d3Line
      .arc()
      .outerRadius(radius - 30)
      .innerRadius(70);

    const arc = g
      .selectAll("arc")
      .data(pies(pie_data))
      .enter()
      .append("g")
      .style("filter", "url(#drop-shadow)");
    arc
      .append("path")
      .attr("d", path)

      .attr("fill", function (d) {
        return colorScale(d.data.roleName);
      });

    const outerArc = d3Line.arc()
      .innerRadius(radius * 1)
      .outerRadius(radius * 0.9);

    arc.append("polyline")
      .attr("stroke", function (d) {
        return colorScale(d.data.roleName);
      })
      // .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .attr("fill", "none")
      .attr("points", function (d) {
        const posA = path.centroid(d); // line insertion in the slice
        const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that purpose
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = radius * 1 * (midangle < Math.PI ? 1 : -1); // Multiplying by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      });

    const text = arc.append("text")
      .attr("transform", function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 1.1 * (midangle < Math.PI ? 1 : -1);
        pos[1] = pos[1] + 5
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return (midangle < Math.PI ? "start" : "end");
      })
      .attr("fill", function (d) {
        return colorScale(d.data.roleName);
      }) // Set text color
      .attr("font-size", "12px")
      .attr("font-weight", "500")

      .text(function (d) {
        return d.data.percentage;
      })
      ;

    // Adjust positions to avoid collisions
    const textNodes = text.nodes();
    const padding = 0; // Padding between labels

    textNodes.forEach((node, i) => {
      let currentBBox = node.getBBox();
      let currentPos = d3.select(node).attr("transform");
      let [x, y] = currentPos.replace("translate(", "").replace(")", "").split(",").map(Number);

      for (let j = i + 1; j < textNodes.length; j++) {
        let nextNode = textNodes[j];
        let nextBBox = nextNode.getBBox();
        let nextPos = d3.select(nextNode).attr("transform");
        let [nx, ny] = nextPos.replace("translate(", "").replace(")", "").split(",").map(Number);

        if (Math.abs(y - ny) < currentBBox.height + padding) {
          // Adjust y position to avoid overlap
          ny = ny - 0.5;
          d3.select(nextNode).attr("transform", `translate(${nx},${ny})`);
          y = ny;
        }
      }
    });



  }
}


class statChart {
  // Original data
  async createDensity(datass) {
    //   const lineChartData = [
    //   {
    //           values: [
    //       {
    //         date: "Jan",
    //         close: 230
    //       },
    //       {
    //         date: "Feb",
    //         close: 269
    //       },
    //       {
    //         date: "March",
    //         close: 234
    //       },
    //       {
    //         date: "Apr",
    //         close: 282
    //       },
    //       {
    //         date: "May",
    //         close: 231
    //       },
    //       {
    //         date: "June",
    //         close: 240
    //       },
    //       {
    //         date: "jul",
    //         close: 213
    //       },
    //       {
    //         date: "AUg",
    //         close: 320
    //       },
    //       {
    //         date: "Sep",
    //         close: 253
    //       },
    //       {
    //         date: "Oct",
    //         close: 264
    //       },
    //       {
    //         date: "Nov",
    //         close: 272
    //       },
    //       {
    //         date: "DEC",
    //         close: 290
    //       },
    //       {
    //         date: "heyy",
    //         close: 225
    //       },
    //       {
    //         date: "okk",
    //         close: 349
    //       }
    //     ]
    //   }
    // ];

    let svgWidth;
    let svgHeight = 160;

    const Data2 = datass.data.reverse();
    console.log("data111", Data2)
    // let lineChartData2=[]
    // lineChartData2[0]= { ...Data2};
    const lineChartData2 = [
      {
        values: Data2
      }
    ];

    const margin = {
      top: 20,
      bottom: 0,
      left: 40,
      right: 20,
    };
    const extraMargin = 10;

    if (window.innerWidth >= 1700) {
      svgWidth = window.innerWidth - 900
      // svgHeight = 250
    }
    else if (window.innerWidth >= 1500) {
      svgWidth = window.innerWidth - 800
    }
    else if (window.innerWidth >= 1300) {
      svgWidth = window.innerWidth - 700;
    }
    else if (window.innerWidth >= 1100) {
      svgWidth = window.innerWidth - 400;
    }




    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select("#density_graph")
      .classed("svg-container", true)
      .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight)
      .classed("svg-content-responsive", true);
    // .style("background-color", "black");

    var ctrl, key;

    // Attach the resize event listener
    document.body.addEventListener("keydown", function (ev) {
      ev = ev || window.event;
      key = ev.which || ev.code;
      ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false)
      window.addEventListener("resize", resize);

      // }
    }, false);

    function resize() {
      if (ctrl && key === 109 && window.innerWidth > 1900) {

        let containerWidth = parseInt(d3.select("#density_graph").style("width"));
        let containerHeight = parseInt(d3.select("#density_graph").style("height"));

        svg.attr("viewBox", "0 0 " + svgWidth * containerWidth / (svgWidth * 2 - 100) + " " + svgHeight * containerHeight / svgHeight);
      }
      else if (window.innerWidth > 1700) {

        svg.attr("viewBox", `0 0 ${svgWidth + 80} ${svgHeight}`);
        if (window.innerHeight > 950) {
          svg.attr("viewBox", `0 0 ${svgWidth + 200} ${svgHeight + 50}`);
        }

      }
      else {

        svg.attr("viewBox", `0 0 ${svgWidth + 20} ${svgHeight + 50}`)

      }
    }

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

    const gText = svg
      .append("g")
      .attr("transform", "translate(" + (margin.left / 9) + "," + (margin.top * 3 - extraMargin) + ")");

    const parsedData = lineChartData2.map(company => ({
      ticker: company.ticker,
      values: company.values.map(val => ({
        close: val.count,
        // date: parseTime(val.date)
        date: val.x_axis

      }))
    }));

    let xScaleDomain2 = parsedData[0].values.map((d) => d.date);

    const xScale = scaleBand()
      .domain(xScaleDomain2)
      .range([margin.left, svgWidth - margin.right]);
    const xScale2 = scaleBand()
      .domain(xScaleDomain2)
      .range([margin.left - extraMargin / 2, svgWidth - (margin.right + extraMargin)]);



    const max2 = Math.max(...parsedData[0].values.map((o) => o.close));
    let largest = max2;
    if (largest % 5 !== 0) {
      largest = largest + (5 - (largest % 5));
      if (largest % 10 !== 0) {
        largest = largest + (largest % 10)
      }
    }
    const yScale = d3.scaleLinear()
      .domain([0, largest])
      .range([height, margin.top]);


          //For Vertical Lines

    const tick1 = svg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x axis")
    .call(d3.axisBottom(xScale)
      .ticks(14)
      .tickSizeOuter(0)
      .tickSizeInner(0));
  svg.select('.domain').attr('stroke-width', 0);

  tick1.selectAll('text')
    .style("color", "#333333")
    .style('font-size', '8px')
    .style("font-weight", "500")
    .style("font-family", "Lato");

  //  tick1
  // .selectAll('line')
  //   .attr('stroke', `5, 5`)
  //   .attr('stroke', '#ccc')
  //   .attr('y2', `-${height}px`)


  const xScale11 = scaleLinear()
    .domain([1, 30])
    .range([0, width])
    .nice();

  const xGridLine = axisBottom(xScale11)
    .scale(xScale11)
    .tickSize(-height + margin.top)
    .ticks(30)
    .tickFormat("");

  const xAxisTranslate = svgHeight - margin.bottom - margin.top;

  svg
    .append("g")
    .classed("gridLine", true)
    .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")")
    .style("color", "#F0F0F0")
    .attr("opacity", "0.7")
    .call(xGridLine)

  gText.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Count  of  Users")
    .style("color", "#72738E")
    .style('font-size', '8px')
    .style("font-weight", "500")
    .style("font-family", "Montserrat");

  //For HOrizontal Lines

  const tick2 = g.append('g')
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)
      .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
      .tickSizeOuter(0)
      .tickSizeInner(0));

  g.selectAll('.domain').attr('stroke-width', 0);

  tick2.selectAll('text')
    .style("color", "#72738E")
    .style('font-size', '8px')
    .style("font-weight", "500")
    .style("font-family", "Lato");

  //     tick2
  //     .selectAll('line')
  //       .attr('stroke', `5, 5`)
  //       .attr('stroke', '#ccc')
  //       .attr('x2', `${svgWidth-50}px`)

  //  svg.select('.domain')
  //     .attr('stroke', '#ddd')

  const yScale_grid = d3
    .scaleLinear()
    .domain(largest <= 10 ?
      [0, 5] : largest <= 15 ? [0, 3] : largest <= 20 ? [0, 4] : [0, 5]
    )
    .range([height, margin.top])
    .nice();

  // const yScale1 = d3
  // .scaleLinear()
  // .domain([0, max2])
  // .range([(height - 8), 8]);

  const yGridLine = axisLeft(yScale_grid)
    .scale(yScale)
    .tickSize(-width, 0, 0)
    .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
    .tickFormat("");

  g
    .append("g")
    .classed("gridLine", true)
    .style("color", "#F0F0F0")
    .attr("opacity", "0.7")
    .call(yGridLine);

    //LINE 1 STARTS

    const gLine = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

    const line1 = d3.line()
      .x(d => xScale2(d.date))
      .y(d => yScale(d.close))
      .curve(d3.curveMonotoneX);

      gLine.selectAll('.line')
      .data(parsedData)
      .enter()
      .append('path')
      .attr('d', d => {
        const lineValues = line1(d.values).slice(1);
        const splitedValues = lineValues.split(',');

        return `M0,${height},${lineValues},l0,${height - splitedValues[splitedValues.length - 1]}`
      })
      .style('fill', '#269C8A')
      .style('opacity', 0.3)



      gLine.selectAll('.line')
      .data(parsedData)
      .enter()
      .append('path')
      .attr('d', d => line1(d.values))
      .attr('stroke-width', '1')
      .style('fill', 'none')
      .style('filter', 'url(#glow)')
      .attr('stroke', '#269C8A');

    //LINE 1 ENDS

    gLine.selectAll('.circle')
      .data(parsedData[0].values) // Assuming you want circles for the first set of data
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', d => xScale2(d.date)) // Position based on x scale
      .attr('cy', d => yScale(d.close)) // Position based on y scale
      .attr('r', 3) // Radius of the circle
      .style('fill', '#269C8A'); // Color of the circle, you can change this as needed

  }

}

class thirdPartyBar {
  async horizontalBarGraph(datas) {
    const data = datas;
    // const data = [
    //   { key: "microsoftTeams", name: "Microsoft Teams", count: 20 },
    //   { key: "googleMeet", name: "Google Meet", count: 17 },
    //   { key: "Amazon", name: "Amazon inc ", count: 19 },
    //   { key: "amcf", name: "akjbhjo ", count: 50 },

    // ];

    const margin = { top: 70, right: 100, bottom: 90, left: 150 };
    const width = 700 - margin.left - margin.right; //100 Increased
    const height = 290 - margin.top - margin.bottom; //50 Increased

    const svg = d3.select("#horizontal_barGraph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    // .style("background-color", "red")


    const gAxis = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)


    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([0, (width + margin.right / 2)]);

    const y = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, height])
      .padding(0.1);


        //For Horizontal Lines 
    const yScale_grid = d3
    .scaleLinear()
    .domain([0, 5])
    .range([height, 0])
    .nice();

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height + (margin.top / 2), -(margin.top / 2)]);

  const yGridLine = axisLeft(yScale_grid)
    .scale(yScale)
    .tickSize(-width - (margin.right / 2), 0, 0)
    .ticks(5)
    .tickFormat("");

  gAxis
    .append("g")
    .classed("gridLine", true)
    .style("color", "#F0F0F0")
    .attr("opacity", "0.7")
    .call(yGridLine);

    const gText = svg
    .append("g")
    .attr("transform", "translate(" + width + "," + (height + margin.top + (margin.top/1.2)) + ")");

    gText.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    // .attr("transform", "rotate(-90)")
    .text("No. of Usage")
    .style("color", "#888888")
    .attr("opacity", "0.8")
    .style('font-size', '10px')
    .style("font-weight", "500")
    .style("font-family", "Montserrat");

  //For Vertical Lines 

  // let largest = d3.max(data, d => d.count);
  let largest = Math.max(...data.map((o) => o.count));


  if (largest % 5 !== 0) {
    largest = largest + (5 - (largest % 5));
    if (largest % 10 !== 0) {
      largest = largest + (largest % 10)
    }
  }

  let xScaleDomain2 = data.map((d) => d.count);
  console.log(xScaleDomain2, "the Domainnn")

  const xScale = d3.scaleLinear()
    .domain([0, largest])
    .range([0, width + (margin.right / 2)])
  const xAxisTranslate = height + margin.top + (margin.top / 2);

  const tick1 = svg.append('g')
    .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")")
    .attr("class", "x axis")
    .call(d3.axisBottom(xScale)
      .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
      .tickSizeOuter(0)
      .tickSizeInner(0));
  svg.selectAll('.domain').attr('stroke-width', 0);

  tick1.selectAll('text')
    .style("color", "#72738E")
    .style('font-size', '8px')
    .style("font-weight", "500")
    .style("font-family", "Lato");

  const xScale11 = scaleLinear()
    .domain(largest <= 10 ?
      [0, 5] : largest <= 15 ? [0, 3] : largest <= 20 ? [0, 4] : [0, 5]
    )
    .range([0, width + (margin.right / 2)])
    .nice();

  const xGridLine = axisBottom(xScale11)
    .scale(xScale11)
    .tickSize(-height - (margin.top / 1.17))
    .ticks(largest <= 10 ? 5 : largest <= 15 ? 3 : largest <= 20 ? 4 : 5)
    .tickFormat("");



  svg
    .append("g")
    .classed("gridLine", true)
    .attr("transform", "translate(" + margin.left + "," + xAxisTranslate + ")")
    .style("color", "#F0F0F0")
    .attr("opacity", "0.7")
    .call(xGridLine);

    const gSvg = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
    
    gSvg.append("g")
      .call(d3.axisLeft(y).tickSize(0).tickPadding(15));

    gSvg.select('.domain').attr('stroke-width', 0);


    let colorScale = scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(["#F5D06E", "#595959", "#4070EA", "#269C8A"]);

    const bars = gSvg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(d.name))
      .attr("width", d => x(d.count))
      .attr("height", function (d) {
        return y.bandwidth() - 5
      })
      .attr("fill", function (d) {
        return colorScale(d.name);
      });
// Colors based on key

      bars.raise();

      const labels = gSvg.selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", d => x(d.count) + 10)
      .attr("y", d => y(d.name) + y.bandwidth() / 2 + 4)
      .text(d => d.count)
      .attr("fill", d => d.key === "microsoftTeams" ? "#FFC107" : "#4D4D4D");
      labels.raise();
  
  }
}


class heaTmap {
  async heatMapGraph(data) {
    console.log(data[0].weekday, "actual data")
    console.log(data.length, "the len")
  //   const data = [
  //     { date: "2023-05-30", day: "Tue", count: 0 },
  //     { date: "2023-05-31", day: "Wed", count: 0 },
  //     { date: "2023-06-01", day: "Thu", count: 5 },
  //     { date: "2023-06-02", day: "Fri", count: 1 },
  //     // Add more data as needed
  // ];

  // Parse the date and calculate week and day indices
  const parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach(d => {
      d.date = parseDate(d.date);
      d.weekday = d.date.getDay();
      d.week = d3.timeWeek.count(d3.timeYear(d.date), d.date);
  });

          // Determine the date range from the data
          const minDate = d3.min(data, d => d.date);
          const maxDate = d3.max(data, d => d.date);
          const months = d3.timeMonth.range(d3.timeMonth.floor(minDate), d3.timeMonth.ceil(maxDate));
          const gapNumber = data[0].weekday

  // Set up the dimensions and margins of the graph
  const margin = { top: 30, right: 20, bottom: 20, left: 40 };
  const width = 960 - margin.left - margin.right;
  const height = 150 - margin.top - margin.bottom;

  // Create the SVG container
  const svg = d3.select("#heatmap")
  .append("svg")
  .attr("width", "100%")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .on("mouseout", function() { // Hide tooltip when mouse leaves the SVG
    Tooltip.style("opacity", 0)
      .style("visibility", "hidden");
  });
      // .style("background-color", "red")

      const barG = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

      const axisG = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")");


  // Create a color scale
  // const colorScale = d3.scaleSequential(d3.interpolateGreens)
  //     .domain([0, 5]);

      const colorScale = scaleOrdinal()
      .domain([0, 5])
      .range(["#F5F5F5", "#A6CBC5", "#68B4A9", "#44A798", "#289D8B"]);

  // Set up the x and y scales
  // const x = d3.scaleBand()
  //     .range([0, width])
  //     .domain(d3.timeMonth.range(new Date(2023, 4, 1), new Date(2024, 5, 1)).map(d => d3.timeFormat("%b")(d)));

  
             const x = d3.scaleBand()
            .range([0, width])
            .domain(months.map(d => d3.timeFormat("%b")(d)));

  const y = d3.scaleBand()
      .range([0, height])
      .domain(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

  // const cellWidth = width / d3.timeMonth.range(new Date(2023, 4, 1), new Date(2024, 5, 1)).length;
  const cellWidth = width / months.length;
  const cellHeight = height / 7;
  const cellSize = Math.floor(width / data.length); // Adjust cell size for the number of data points


  // // Add day labels
  // svg.selectAll(".day-label")
  //     .data(y.domain())
  //     .enter()
  //     .append("text")
  //     .attr("class", "day-label")
  //     .attr("x", -5)
  //     .attr("y", d => y(d) + cellHeight / 2)
  //     .attr("dy", ".35em")
  //     .attr("text-anchor", "end")
  //     .text(d => d);

  // //Add month labels
  // svg.selectAll(".month-label")
  //     .data(x.domain())
  //     .enter()
  //     .append("text")
  //     .attr("class", "month-label")
  //     .attr("x", (d, i) => i * cellWidth + cellWidth / 2)
  //     .attr("y", -5)
  //     .attr("text-anchor", "middle")
  //     .text(d => d);

  // Create the x-axis for month labels

  const xScale = d3.scaleTime()
  .domain([minDate, maxDate])
  .range([0, width]);

  const xAxis = d3.axisBottom(xScale)
  .ticks(d3.timeMonth.every(1))
  .tickFormat(d3.timeFormat("%b"))
  .tickSizeOuter(0)
  .tickSizeInner(0);

// Append the x-axis to a new group element and position it
const tick1 = axisG.append('g')
.attr("transform", "translate(" + ((cellWidth/2) - 0.7) + "," + -margin.top/3 + ")")
.attr("class", "x axis")
.call(xAxis);

// Remove the axis line
axisG.select('.domain').attr('stroke-width', 0);

// Style the axis labels
tick1.selectAll('text')
.style("color", "#333333")
.style('font-size', '12px')
.style("font-weight", "500")
.style("font-family", "Lato");


const tick2 = axisG.append('g')
.attr("transform", "translate(" + -margin.left/3 + "," + margin.top/2.5 + ")")
.attr("class", "y axis")
.call(d3.axisLeft(y)
  .ticks(7)
  .tickSizeOuter(0)
  .tickSizeInner(0));
svg.selectAll('.domain').attr('stroke-width', 0);

tick2.selectAll('text')
.style("color", "#333333")
.style('font-size', '9px')
.style("font-weight", "500")
.style("font-family", "Lato");



    // Create tooltip
    let Tooltip = d3.select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("width", "auto")
      .style("height", "30px")
      .style("padding", "8.01px 12.01px")
      .style("border-radius", "8px 0 0 0")
      .style("background-color", "#D9D9D9")
      .style("position", "absolute")
      .style("text-align", "center")
      .style("font-family", "Montserrat")
      .style("font-size", "10px")
      .style("font-weight", "400")
      .style("line-height", "12.19px")
      .style("color", "#696969")
      .style("pointer-events", "none");


      let tipMouseover = function(event, d) {
        Tooltip.style("opacity", 1)
          .style("visibility", "visible")
          .style("left", (event.pageX - 100) + "px")
          .style("top", (event.pageY - 35) + "px");
          if (d.count > 0) {
          Tooltip.html(`
            <strong>${d.count} Interview Taken on ${d3.timeFormat("%b %d, %Y")(d.date)}</strong><br>
          `)
          }
          else{
            Tooltip.html(`
            <strong>No Interview Taken on ${d3.timeFormat(" %b %d, %Y")(d.date)}</strong><br>
          `)
          }
          
      };

      
      let tipMouseout = function() {
        Tooltip.style("opacity", 0)
          .style("visibility", "hidden");
      };

let largest = Math.max(...data.map((o) => o.weekday));

const xScale2 = d3.scaleLinear()
        .domain([0, largest])
        .range([0, width ]);

  // Draw the heatmap cells
  barG.selectAll(".cell")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "cell")
      // .attr("x", (d, i) => i * cellSize )
      // .attr("x", d => xScale(d.date) )
      .attr("x", function (d,i) {
        return (xScale(d.date) - ((i+gapNumber) % 7) - d.weekday*1.5)
      })
            // .attr("x", d => xScale(d.date) - (d3.timeDay.count(minDate, d.date) % 7) * cellSize) // Adjust x-position

      // .attr("x", (d, i) => x(d.date) + (i % 7) * cellWidth) 
      // .attr("x", (d, i) => xScale2(d.weekday)) 
      
      // .attr("y", d => d.date.getDay() * cellSize*3)
      // .attr("x", (d,i) => x(d3.timeFormat("%b")(d.date)) + (d.week % 4) * cellWidth / 4)
      .attr("y", d => y(d3.timeFormat("%a")(d.date)))

      .attr("width", cellWidth / 6)
      .attr("height", cellHeight- 5)
      .attr("fill", d => colorScale(d.count))
      .attr("rx", 2) // Rounded corners
      .attr("ry", 2)
      .on("mouseover", tipMouseout)
      .on("mousemove",tipMouseover)
      .on("mouseout", tipMouseout);
  }
}



// eslint-disable-next-line no-redeclare
export {
  D3BarChart,
  scatterplot,
  scatterplotZoom,
  scatterplot_rect,
  piePlot,
  treeGraph,
  proctBarChart,


  testBarChart,
  topicBarChart,
  gradientChart,
  donoutChart,
  multiBarChart,

  reclinechart,
  DensityChart,
  funnelChart,
  proctLineChart,
  QuesData,


   //For Recruitment New 
   rolePieChart,
   statChart,
   thirdPartyBar,
   heaTmap,

};
// module.exports = {};
// treeGraph1




// #Changed Code

/*
class D3BarChart {
  async myData(user) {
    script.marks_data = [];
    let fullbarData =
    script.allData = user;
    // script.marks_data = user.count;
    var max = Math.max(...user.map((o) => o.count));
    script.max = max;
    script.allData.forEach((element) => {
      script.marks_data.push(element.count);
    });
    document.getElementById("barchartGraph").innerHTML = "";

    //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
    this.makegraph();
  }

  makegraph() {

    const rectWidth = 50;
    const svgHeight = 250,
      barWidth = 20

    let len = script.allData.length * (rectWidth) ;
    let margin = { top: 10, right: 10, bottom: 35, left: 15 },
      height = svgHeight - margin.bottom,
      width = len ;
    // For making the svg
    const svg1 = select("#barchartGraph")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", len + 50);
      // .style("background-color", "red");

    //SCALES START

    const xScale = scaleBand()
      .domain(script.allData.map((d) => d.x_axis))        //variable1??
      .range([0, len]);
      // .padding(0),

    // variable2??
    const yScale = scaleLinear().domain([0, script.max]).range([0, svgHeight - margin.bottom - margin.top]);
    const yScale1 = scaleLinear().domain([0, script.max]).range([svgHeight - margin.bottom, 0]);

    const x_axis = axisBottom(xScale)
        .tickSize(-svgHeight),
      xAxisTranslate = svgHeight - margin.bottom + 5;

    const y_axis = axisLeft(yScale1)
      .tickSize(-width)
       .ticks((script.max+5)/5);

    const g =  svg1
      .append("g")
      .attr("transform", "translate(" + 30 + "," +xAxisTranslate + ")")
    // .attr("transform","translate(150,150)");
    g.append("g")
      .attr("class", "bar-x-axis").call(x_axis)
        .selectAll("text")
        .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font","Roboto")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
      // .attr("transform", "rotate(-30)");
      .attr("transform", "rotate(-15)");

    svg1.append("g").attr("class", "bar-x-axis").attr("transform", "translate(30,0)")
      .call(y_axis)
    .selectAll("text")
        .style("text-anchor", "end")
      .style("color", "#A3A3A3")
      .style("font","Roboto")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")

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

     const g1 =  svg1
      .append("g")
      .attr("transform", "translate(" + 25 + ","+ 0 + ")")

    const rect =
      g1.selectAll("rect")
      .data(script.marks_data, (d) => d)
      .join(
        (enter) => {
          const rect = enter
            .append("rect")
            .attr("width", rectWidth-barWidth)
            .attr("stroke-width", 3)
            // .attr("stroke", "#7E857E")
            .attr("stroke", "#88888E")

            .attr("fill", "#514B4B")
            // overwrite the default so the animation looks better:
            .attr("x", (d, i) => i * rectWidth)
            .attr("y", function (p) {

             return  height;
            })

            .attr("height", function (d) {
              // return yScale(d);
              return 0

            })     .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    //mose over start
      .on("mouseover", function (marks_data, i) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px").html(`Marks: ${marks_data}`).style("visibility", "visible");
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
            
        //end
      })
      .on("mousemove", function () {
        tooltip
          // tooltip.html(``).style("visibility", "hidden");
      })
      .on("mouseout", function () {
        tooltip.html(``).style("visibility", "hidden");
        select(this).attr("fill", "#514B4B");
        // tooltip.remove()
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

        return  height - yScale(p);
      })
      .attr("height", function (d) {
              return yScale(d);
      })
      .attr("width", rectWidth- barWidth)

    // //Line chart
      var x = xScale,
      y = yScale1,
      line = d3Line
        .line()
        .x(function (d) {
          return x(d.x_axis);
        })
        .y(function (d) {
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

    // chartcontainer.scrollLeft;

  }

  
}

*/

