import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SummaryBarChart = ({ data }) => {
  const chartRef = useRef(null);

  // console.log("data SummaryBarChart ", data);
  // console.log(
  //   "data SummaryBarChart+++++++++++++++",
  //   data.graph_value_coherence
  // );

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Task Acheivement",
          "Coherence and Cohesion",
          "Lexical Resource",
          "Grammatical Range And Accuracy",
        ],
        datasets: [
          {
            label: "Full Achievement / Strong",
            data: [
              data.graph_value_coherence[0], // First value (75)
              data.graph_value_grammar[0], // Second value (0)
              data.graph_value_lexical[0], // Third value (0)
              data.graph_value_task_achievement[0], // Third value (0)
            ],
            backgroundColor: ["#008000"],
          },
          {
            label: "Partial Achievement / Needs Improvement",
            data: [
              data.graph_value_coherence[1], // First value (75)
              data.graph_value_grammar[1], // Second value (1)
              data.graph_value_lexical[1], // Third value (1)
              data.graph_value_task_achievement[1], // Third value (0)
            ],
            backgroundColor: ["#fbfb08"],
          },
          {
            label: "Missed / Weak",
            data: [
              data.graph_value_coherence[2], // First value (75)
              data.graph_value_grammar[2], // Second value (2)
              data.graph_value_lexical[2], // Third value (2)
              data.graph_value_task_achievement[2], // Third value (0)

            ],
            backgroundColor: ["#ff0000"],
          },
        ],
      },
      options: {
        indexAxis: "x", // This option makes the chart vertical
        scales: {
          x: {
            grid: {
              display: false, // Disable grid lines for the x-axis
            },
            stacked: true,
            title: {
              display: true,
              // text: "Sections", // Label for x-axis
              font: {
                size: 14,
              },
            },
          },
          y: {
            grid: {
              display: false, // Disable grid lines for the y-axis
            },
            stacked: true,
            title: {
              display: true,
              text: "Percentage (%)", // Label for x-axis
              font: {
                size: 14,
              },
            },
            beginAtZero: true,
          },
        },

        barThickness: 160, // Adjust bar width (in pixels)
        categoryPercentage: 0.5,
      },
      responsive: true, // Adjust spacing between bars (0.8 = 80% of the bar space, 20% for spacing)
      maintainAspectRatio: false, // Allow custom aspect ratio
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="container mx-auto">
          {/* <canvas ref={chartRef} width={600} height={200} id="chart-1"></canvas> */}
          <canvas ref={chartRef} id="chart-1"></canvas>
        </div>
      </div>
    </>
  );
};

export default SummaryBarChart; 