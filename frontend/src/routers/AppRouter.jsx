// AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProductList from "../pages/ProductList";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/ui/Spinner";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    <Spinner />

    return (
        <Routes>
            <Route index element={isAuthenticated ? <Navigate to="/products" /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/products" /> : <AuthPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;