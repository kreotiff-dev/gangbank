import React from 'react';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import Dashboard from '../components/Dashboard';
import CardsList from '../components/CardsList';
import '../styles/PersonalCabinet.css'

const mockCards = [
  { cardNumber: '1234 5678 9012 3456', type: 'Visa', balance: 5000 },
  { cardNumber: '9876 5432 1098 7654', type: 'Mastercard', balance: 10000 },
  { cardNumber: '4321 8765 2109 8765', type: 'Visa', balance: 7500 },
  { cardNumber: '5678 1234 9876 5432', type: 'Mastercard', balance: 3000 },
  { cardNumber: '8765 4321 5678 9012', type: 'Visa', balance: 12000 }
];

const PersonalCabinet = () => (
  <div>
    <Header />
    <main>
      <UserProfile />
      <Dashboard />
      <CardsList cards={mockCards} />
    </main>
    <footer>
      <p>&copy; 2024 Your Bank. All rights reserved.</p>
    </footer>
  </div>
);

export default PersonalCabinet;
