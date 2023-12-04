// import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Logout from "./Logout";
// import config from "./Config";

function Dashboard() {
  return (
    <div className="dashboard">
      <Logout />
      <br />
      <ProductList />
    </div>
  );
}

export default Dashboard;


// import React, { useState, useEffect } from "react";
// import ProductList from "./ProductList";
// import Logout from "./Logout";
// import config from "./Config";

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);

//   useEffect(() => {
//     fetch(`${config.apiUrl}/dashboard`)
//       .then((response) => response.json())
//       .then((data) => setDashboardData(data))
//       .catch((error) => console.error("Error fetching dashboard data:", error));
//   }, []);

//   return (
//     <div className="dashboard">
//       <Logout />
//       <br />
//       <h1>Dashboard</h1>
//       {dashboardData ? (
//         <div>
//           <p>Some dashboard content: {dashboardData.someValue}</p>
//         </div>
//       ) : (
//         <p>Loading dashboard data...</p>
//       )}
//       <ProductList />
//     </div>
//   );
// };

// export default Dashboard;
