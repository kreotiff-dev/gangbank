import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import UserProf from '../components/EserProfile2';
import '../styles/PersonalCabinet.css'

const PersonalCabinet = () => {
  return (
    <div>
      <Header />
      <main>
        <UserProf />
      </main>
      <footer>
        <p>&copy; 2024 Your Bank. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PersonalCabinet;
