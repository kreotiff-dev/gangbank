import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import '../styles/PersonalCabinet.css'

const PersonalCabinet = () => {
  return (
    <div>
      <Header />
      <main>
        <UserProfile />
      </main>
      <footer>
        <p>&copy; 2024 Your Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PersonalCabinet;
