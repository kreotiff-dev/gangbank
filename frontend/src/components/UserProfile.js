import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('user/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Данные:' + data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);
  console.log('Hi!' + userData);
  
  return (
    <div>
      {userData ? (
        <div>
          <p>Name: {userData.firstname || 'N/A'}</p>
          <p>Email: {userData.email}</p>
          {/* Дополнительные данные профиля */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfile;
