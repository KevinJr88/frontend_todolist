import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("isAuthenticated")) {
        return <Navigate to="/frontend_todolist/login" />;
    }

    return children;
};

export default ProtectedRoute;
