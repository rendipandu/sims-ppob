import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import HomePage from './components/pages/HomePage';
import { componentMaps, routeLists } from './routes/route';
import PrivateRoute from './routes/privateRoute';
import { Toast } from './components/atoms/Toast';
import Navbar from './components/molecules/Navbar';

const AppContent: React.FC = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== '/login' && location.pathname !== '/registration';

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        {routeLists
          .filter((list) => list.component)
          .map((list, index) => {
            const Component = componentMaps[list.component as keyof typeof componentMaps];
            return <Route key={index} path={list.path} element={<Component />} />;
          })}
      </Routes>
      <Toast />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;