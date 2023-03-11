import DashboardLayout from "../../layouts/dashboard";
import { NextPageWithLayout } from "../../types";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <p>home</p>
    </div>
  );
};

Home.getLayout = DashboardLayout;

export default Home;
