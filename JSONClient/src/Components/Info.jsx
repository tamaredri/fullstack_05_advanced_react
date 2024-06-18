import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Info = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log('done')
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(`http://localhost:3000/users/${user.id}`);
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user information');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Username:</strong> {userInfo.username}</p>
      <p><strong>Full Name:</strong> {userInfo.fullName}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Info;
