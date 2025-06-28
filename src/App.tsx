import AppRouter from "@/routes/App-router";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import Layout from "@/components/Layout";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {isLoginPage ? (
          <AppRouter />
        ) : (
          <Layout>
            <AppRouter />
          </Layout>
        )}
      </div>
    </AuthProvider>
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
