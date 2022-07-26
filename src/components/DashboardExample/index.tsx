import {
  BarChat as BarChatData,
  DonutChart as DonutChartData,
  BarChatSecond as BarChatDataSecond,
} from "../../data/FakeDashboardIndex";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

import styles from "./styles.module.css";

export default function DashboardExample() {
  return (
    <div className={styles.fakeDashes}>
      <div className={styles.fakeDash}>
        <p>Players This Year</p>
        <Doughnut data={DonutChartData} />
      </div>
      <div className={styles.fakeDash}>
        <Line data={BarChatData} />
        <Line data={BarChatDataSecond} />
      </div>
    </div>
  );
}
