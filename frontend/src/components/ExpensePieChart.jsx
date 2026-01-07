import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensePieChart({ expenses }) {
  const labels = Object.keys(expenses);
  const values = Object.values(expenses);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#FF5252",
          "#FFD740",
          "#7C4DFF",
          "#69F0AE",
          "#FF4081",
          "#40C4FF",
        ],
        cutout: "70%",
      },
    ],
  };

  return (
    <div style={{ width: "300px", margin: "20px auto" }}>
      <Pie data={data} />
    </div>
  );
}
