import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classes from '../modules_css/Home.module.css'

const Info = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('user');

      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/users?id=${userId}`);
          if (response.data && response.data.length > 0) {
            setUser(response.data[0]);
          } else {
            setError('User not found');
          }
        } catch (err) {
          setError('Failed to fetch user information');
        }
      } else {
        setError('No user ID found in local storage');
      }

      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p><strong className={classes.infoTitle}>Username:</strong> {user.username}</p>
      <p><strong className={classes.infoTitle}>Email:</strong> {user.email}</p>
      <p><strong className={classes.infoTitle}>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
      <p><strong className={classes.infoTitle}>Geo:</strong> {user.address.geo.lat}, {user.address.geo.lng}</p>
      <p><strong className={classes.infoTitle}>Phone:</strong> {user.phone}</p>
      <p><strong className={classes.infoTitle}>Website:</strong> {user.website}</p>
      <p><strong className={classes.infoTitle}>Company:</strong> {user.company.name}, {user.company.catchPhrase}, {user.company.bs}</p>
    </div>
  );
};

export default Info;
