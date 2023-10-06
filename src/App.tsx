import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login"/>;
  }

  return children;
}

