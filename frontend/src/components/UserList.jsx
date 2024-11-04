import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    console.log('Current token:', token);
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      console.log('Fetching users...');
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log('Fetched users data:', data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Unexpected response data:', data);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid gap-4 p-4">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserList;
