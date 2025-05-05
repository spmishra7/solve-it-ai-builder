
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OfflineModeBanner from "./components/OfflineModeBanner";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Pricing from './pages/Pricing';
import { Toaster } from "@/components/ui/toaster";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const ModelManagerSection = lazy(() => import("./components/ModelManagerSection"));
const Auth = lazy(() => import("./pages/Auth"));
const MySolutions = lazy(() => import("./pages/MySolutions"));
const SolutionDetail = lazy(() => import("./pages/SolutionDetail"));
const AppPlayground = lazy(() => import("./pages/AppPlayground"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <OfflineModeBanner />
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
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
                    path="/playground/:id"
                    element={
                      <ProtectedRoute>
                        <AppPlayground />
                      </ProtectedRoute>
                    }
                  />
                  <Route 
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <ScrollToTopButton />
            <Toaster />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
