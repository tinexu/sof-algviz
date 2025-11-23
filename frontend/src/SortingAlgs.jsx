import * as d3 from "d3";

export function visualize(algorithm) {
  const svg = d3.select("#visualization");
  svg.selectAll("*").remove(); // clear previous drawing

  const data = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];

  const width = 800;
  const height = 300;
  const colors = ["#fe7ab6", "#f8c555", "#4cd5fc"];


  svg.attr("width", width).attr("height", height);

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 40)
    .attr("y", (d) => height - d * 4)
    .attr("width", 30)
    .attr("height", (d) => d * 4)
    .attr("fill", () => colors[Math.floor(Math.random() * colors.length)])
    .attr("rx", 5)
  // OPTIONAL: choose visualization based on algorithm name
  if (algorithm === "bubble") {
    console.log("Run bubble sort animation here");
  }

  if (algorithm === "selection") {
    console.log("Run selection sort animation here");
  }

  if (algorithm === "insertion") {
    console.log("Run insertion sort animation here");
  }
}
