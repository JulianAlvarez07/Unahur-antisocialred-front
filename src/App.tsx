import AppRouter from "@/routes/App-router";
import { BrowserRouter, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="min-h-screen">
      {isLoginPage ? (
        <AppRouter />
      ) : (
        <Layout>
          <AppRouter />
        </Layout>
      )}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
