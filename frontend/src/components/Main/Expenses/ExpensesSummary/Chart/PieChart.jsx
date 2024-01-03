import React, {useState, useEffect} from "react";

import {Pie} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

const PieChart = (props) => {
    const [showLegend, setShowLegend] = useState(window.innerWidth > 500);

    useEffect(() => {
      const handleResize = () => {
        setShowLegend(window.innerWidth > 500);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const options = {
        plugins: {
            legend: {
                display: showLegend
            }
        }
    }

    return (
        <Pie data = {props.chartData} options={options}/>
    )
}

export default PieChart;