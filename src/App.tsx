
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ModelManagerSection from "./components/ModelManagerSection";
import Auth from "./pages/Auth";
import MySolutions from "./pages/MySolutions";
import SolutionDetail from "./pages/SolutionDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/model-manager" element={<ModelManagerSection />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/my-solutions"
                element={
                  <ProtectedRoute>
                    <MySolutions />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/solutions/:id"
                element={
                  <ProtectedRoute>
                    <SolutionDetail />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
