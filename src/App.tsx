import AppRouter from "@/routes/App-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
