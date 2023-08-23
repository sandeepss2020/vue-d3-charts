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
    // console.log("widtghhh", window.innerWidth)
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



    // console.log("maxxx",Math.max(...datapoints.map(o => o.uniqueTotalCandidates)))
    // let height = (Math.max(...datapoints.map(o => o.uniqueTotalCandidates))) * 3.5;
    let height = 250
    makescattergraph(height)


    function makescattergraph(height) {
      // console.log("heighhhtt", height)
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
      // console.log("force xx", forceXCombine)
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
          // console.log( radiusScale(d.uniqueTotalCandidates))

          // console.log("ddd", d.uniqueTotalCandidates, "and" , (radiusScale(d.uniqueTotalCandidates)%100) )
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
      // // console.log("dataa1", datapoints)

      // console.log("dataa", maxScale)

      const xScale = scaleLinear().domain([0, 300]).range([10, width / 1.4]);

      function ticked() {
        circles
          .attr("cx", function (d, i) {
            // console.log(d.x)
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
            // console.log( radiusScale((d.uniqueTotalCandidates) + 5));
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

//       // console.log(data,"sepalll")


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

//       // console.log(max2,"maxx1")
//       // Add X axis
//       var x = d3.scaleLinear()
//         .domain([0, 25])
//         .range([0, (width - 50)]);

//       // console.log("what",data.map((d) => d.topicName))

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
//           // console.log(d)
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

//     console.log("classs", newData);

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

//       // console.log(max2,"maxx1")
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
//         // console.log(datapoints.uniqueTotalCandidates)
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
//             // console.log( radiusScale((d.uniqueTotalCandidates) + 5));
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
//           // console.log(d.totalNumberOfTest, "neww")
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

    // console.log("classs", newData);

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

      // console.log(max2,"maxx1")
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
        // console.log(datapoints.uniqueTotalCandidates)
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
          const tooltipBottomPosition = d.pageY + 200 +tooltipHeight;
          const screenHeight = window.innerHeight || document.documentElement.clientHeight;
          if (tooltipBottomPosition < screenHeight) {
           
            Tooltip.style("top", d.pageY - 150 - tooltipHeight + "px");
          } else {
           
            Tooltip.style("top", d.pageY  - 460 + "px");
          }
        select(this)
          .attr("r", function (d) {
            // console.log( radiusScale((d.uniqueTotalCandidates) + 5));
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

        //     // console.log(d.numberOfActiveTest,"ec csxc cds")
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
          // console.log(d.totalNumberOfTest, "neww")
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
            const tooltipBottomPosition = event.pageY + 200 +tooltipHeight;
            const screenHeight = window.innerHeight || document.documentElement.clientHeight;
            if (tooltipBottomPosition < screenHeight) {
             
              Tooltip.style("top", event.pageY - 150 - tooltipHeight + "px");
            } else {
             
              Tooltip.style("top", event.pageY  - 460 + "px");
            }
        })
        .on("mouseout", tipMouseout);

       
        // this.toolTip = Tooltip;
        // this.otherMouseover("d",data[0])

    }, 100);
    return data;

  }


  otherMouseover(d, datapoints,num,data){
 
    let id = '#circle'+num
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

      //     // console.log(d.numberOfActiveTest,"ec csxc cds")
      //     // return d.numberOfActiveTest;
      //     return d.totalNumberOfTest;
      //   })
      // )
      .domain([0, d3.max(data, function (d) { return d.totalNumberOfTest; })])

      .range([0, 50]);

      this.scatter.select(id)
        .attr("r", function (d) {
          // console.log( radiusScale((d.uniqueTotalCandidates) + 5));
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

      //     // console.log(d.numberOfActiveTest,"ec csxc cds")
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
            .on("mousemove",function(event){
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
        // console.log("dd",d)
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
    // console.log(id2)
    if (document.getElementById(id2).innerHTML != "") {
      document.getElementById(id2).innerHTML = ""
    }
    let pie_data = data.pie_data
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
      // .domain(script.pie_data.map((d) => d.platform))
      .domain(pie_data.map((d) => d.testStatus))
      // .range(["#FFC145", "#33A02C", "#3379B3"]);
      // #FFC145 // yellow
      // #33A02C // Green
      .range(["#3379B3", "#FFC145", "#33A02C"]);


    const pies = d3Line.pie().value(function (d) {
      // console.log(d.testStatus);

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
    //  console.log("ok");

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

    // let sum = 0;
    // pie_data.forEach((x) => {
    //   sum += x.percentage;
    // });

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
    // console.log("recttt daatta", data)
    if (document.getElementById("rect_scatter").innerHTML != "") {
      document.getElementById("rect_scatter").innerHTML = "";
    }
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
    // .style("background-color", "white")
    // .style("border-radius", "5px")
    // .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    let mouseover = function (d, datapoints) {

      // console.log(datapoints.numberOfTests)


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

      // console.log("svg height is",svgHeight, "and chartheight",RectScatterheight )
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
        .range([0, (rectSvgWidth )])
        .nice();
      const xGridLine = axisBottom(xScale1)
        .scale(xScale1)
        .tickSize(RectScatterheight, 0, 0)
        .ticks(6)
        .tickFormat("");

      const yScale1 = scaleLinear().domain([0, 5]).range([0, RectScatterheight]).nice(),
        yGridLine = axisLeft(yScale1)
          .scale(yScale1)
          .tickSize((-rectSvgWidth ), 0)
          .ticks(6)
          .tickFormat("");

      // console.log("what",data.map((d) => d.topicName))

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
          // console.log(radiusScale(d.repeatingPercentage + 2))
          return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage + 2) : radiusScale(d.repeatingPercentage + 4.5);
        })
        .attr("height", function (d) {
          // console.log(radiusScale(d.repeatingPercentage),"heiighhtt ")
          return d.repeatingPercentage > 2 ? radiusScale(d.repeatingPercentage) : radiusScale(d.repeatingPercentage + 2.5);
        })
        // .attr("r", function (d) {
        //   console.log(radiusScale(d.repeatingPercentage), "neww")
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
    // console.log(classes);

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

    // console.log("innerwidth",window.innerWidth,"svgwidth is", svgWidth);
    const diameter = svgWidth > 2500 ? svgWidth / 1.5 : ( svgWidth < 1300 ? svgWidth / 0.75 : svgWidth < 1750 ? svgWidth / 0.85 : svgWidth / 1.35),
      radius = diameter / 2.5 + 30,
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
      .attr("d", line)

    node = node.data(root.leaves());


      let mchkkk=[]
      for (let index = 0; index < node._enter[0].length; index++) {
        // console.log("hh",node._enter[0][index].__data__)
        mchkkk.push(node._enter[0][index].__data__);
      };
      // console.log("my arr ", this.mchkkk)


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
          // console.log("sub stringssss",d.data.parentTag);
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

        // console.log("theee",this.getTagName,"final")
        const event = new CustomEvent('liveValueUpdated', { detail: liveValue  });
        window.dispatchEvent(event);

      });
    // chkNodeMouse.on("click", this.mouseSelect);

    // node.on("click", function() {
    //   console.log("rect");
    // });
   
    // console.log("mine ", mchkkk)
    // mouseovered("e",mchkkk[2]);

    function mouseovered(d, i) {
      link
        .classed("link--target ", function (l) {
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

      // div.transition().duration(200).style("opacity", 0.9);
    };



    function mouseouted() {
      // console.log(d);
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
            // console.log("okkk222",find(parentTag.substring(0, (i = parentTag.lastIndexOf("#")))))
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
    this.chkLink = link;
    this.nodess = node
  
  //  this.onlytagName();
    return mchkkk;
  }

   mouseovereded(d, i) {
      this.chkLink
        .classed("link--target ", function (l) {
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

        this.nodess
        .classed("node--target", function (n) {
          return n.target;
        })
        .classed("node--source", function (n) {
          return n.source;
        });

      // div.transition().duration(200).style("opacity", 0.9);
    };
    
    onlytagName(){
      // console.log("thetagggs", this.getTagName,"hey");
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


  async proctBarData(id, types, user, max_val, allBarData, xScaleDomain, xScaleDomainGridLines,barColor) {
    // console.log("usserr typee", types);
    script.barData = [];
    script.allData = user;
    console.log(script.allData.length,"Its length")
    // script.marks_data = user.count;
    script.max = max_val;
    allBarData.forEach((element) => {
      script.barData.push(element);
    });
    // document.getElementById(id).innerHTML = "";

    // console.log(document.getElementById(id).innerHTML);


    //1) d.x_axis  2) HIghest marks of BAR ; 3) Bar Color ; 4)bardata ; 5)y_axis
    this.makeProctBarGraph(id, types, xScaleDomain,xScaleDomainGridLines, barColor);
  }

  makeProctBarGraph(id, types, xScaleDomain,xScaleDomainGridLines, barColor) {
    let heightOfScreen =
      window.innerHeight
      || document.documentElement.clientHeight ||
      document.body.clientHeight;

    // console.log("height of screewn", heightOfScreen)
    const rectWidth = 50;
    // const svgHeight = 280;
    const svgHeight = (heightOfScreen >= 1800) ? 800 : (heightOfScreen >= 1400) ? 600 : (heightOfScreen >= 1000) ? 250
      : (heightOfScreen >= 900) ? 270 : (heightOfScreen >= 800) ? 250 : (heightOfScreen >= 700) ? 220 : (heightOfScreen >= 600) ? 150 : (heightOfScreen >= 500) ? 110 : 200;

    const barWidth = 30;

    let len = script.allData.length >16 ? script.allData.length * rectWidth : 900;
    // let len = 900;
    console.log("Actual Length of Gridlines")
    let margin = { top: 10, right: 35, bottom: 48, left: 40 },
      height = svgHeight - margin.bottom,
      width = len + (2 * rectWidth);

    // console.log("heeeight", heightOfScreen)
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

    // console.log("maxxx", script.max);
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
        // console.log(d)
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
    // console.log("Chartwidth", window.innerWidth)

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
    // console.log("reversedata",reverseData);

    const xScale = d3
      .scalePoint()
      .domain(reverseData)
      .range([0, width])
      .padding(0.55);


    let maxi = d3.max(data, d => d.totalCandidates);
    if (maxi % 4 !== 0) {
      maxi = maxi + (4 - (maxi % 4));
    }

    // console.log("maxxx ", maxi);
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
      if(largest %10 !== 0){
        largest = largest + (largest%10)
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

    var y = scaleLinear().domain([0, largest]).range([(height - 8),0]);

    var tt = g.selectAll()
      .data(data33)
      .enter()
      .append("ellipse")
      .attr("fill", "black")
      .style("opacity",0 )
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
    let svgHeight =  250     //(185 + 65);
    let extraGap = 50;
    let myWidth = window.innerWidth;
    if (window.innerWidth >= 1700) {
      width = window.innerWidth  - 200
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
          svg1.attr("viewBox", "0 0 " + width * containerWidth / (width - width/5) + " " + height * containerHeight / (height - height/7));
        }
      }
      else if (window.innerWidth > 1700) {
        if (document.querySelector('#funnel').offsetHeight > 1200) {
          // svg1.attr("viewBox", `0 0 ${width + 250} ${height}`);
          svg1.attr("viewBox", `0 0 ${svgWidth + 250} ${svgHeight}`);
        }
        else {
          svg1.attr("viewBox", `0 0 ${svgWidth + 150} ${svgHeight +10}`);
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
      .attr("transform", "translate(" + 0 + "," +(-20) + ")");

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
      .attr("transform", "translate(" + -15 + "," + ((height / 10 ) - 25) + ")");
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
      .attr("transform", "translate(" + -28 + "," + ((height / 10 ) - 20) + ")");
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



// eslint-disable-next-line no-redeclare
export {
  D3BarChart,
  scatterplot,
  scatterplotZoom,
  scatterplot_rect,
  piePlot,
  treeGraph,
  proctBarChart,

  reclinechart,
  DensityChart,
  funnelChart,
  proctLineChart,
  QuesData,
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
        // console.log("users",script.max)

    // console.log("lennn", len)
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
    // console.log(script.count);
    // rect.exit().remove();
    // svg.selectAll("rect > *").remove();

    // console.log(chartcontainer)
    // chartcontainer.scrollLeft;

  }

}

*/

