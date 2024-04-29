import React from "react";
import '../styles/Dashboard.css';

const Dashboard = () => {
    return (
      <div className="container">
        <div className="balance-and-info-container">
          <div className="balance-container">Ваш баланс: <br/>250,000.00 ₽</div>
          <div className="info-section">
            <div className="current-month">Апрель 2023</div>
            <div className="info-items-container">
              <div className="info-item">
                <div className="info-content">
                  <strong>Расходы</strong>
                  <br />
                  35,000 ₽
                </div>
              </div>
              <div className="info-item">
                <div className="info-content">
                  <strong>Зачисления</strong>
                  <br />
                  75,000 ₽
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;