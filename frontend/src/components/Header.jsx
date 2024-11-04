import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl">User Management</h1>
      {user && (
        <div className="flex items-center">
          <span className="mr-4">
            {user.name} ({user.email})
          </span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
