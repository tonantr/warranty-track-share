import ProductList from './ProductList';
import Logout from './Logout';

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
