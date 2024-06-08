import './App.css';
import UserList from './UserList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateUser from './CreateUser';
import LoginUser from './login';
import { useAuth } from './auth';
import PrivateRoute from './PrivateRoute';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';

// function PrivateRoute({ element: Component, ...rest }) {
//   let auth = useAuth();
//   return auth ? <Component {...rest} /> : <Navigate to="/login" />;
// }

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<PrivateRoute element={<TodoList />} />} />
        <Route path="/createtodo" element={<PrivateRoute element={<CreateTodo />} />} />
        <Route path="/createuser" element={<PrivateRoute element={<CreateUser />} />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
