import './App.css';
import UserList from './UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateUser from './CreateUser';
import LoginUser from './login';
import { useAuth } from './auth';
import PrivateRoute from './PrivateRoute';

// function PrivateRoute({ element: Component, ...rest }) {
//   let auth = useAuth();
//   return auth ? <Component {...rest} /> : <Navigate to="/login" />;
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<PrivateRoute element={<CreateUser />} />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
