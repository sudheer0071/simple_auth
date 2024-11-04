import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/SignUp';
import UserList from './components/UserList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
