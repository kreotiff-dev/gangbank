import React, { useState } from "react";
import axios from "axios";
import '../styles/UsProf.css'


const UserProf = () => {
    const [user, setUser] = useState(null);
    
    const fetchUserData = async () => {
        const response = await axios.get('http://192.168.1.63:3000/user/1');
        setUser(response.data);
    }

    return (
        <div className="App">
            <h1>Ваши данные:</h1>
            <h2>Fetch a list from an API and display it</h2>

            {/* Кнопка для запроса данных */}
            <div>
                <button className="fetch-button" onClick={fetchUserData}>
                    Fetch Data
                </button>
            </div>

            {/* Отображение данных из API */}
            <div className="user-info">
                {user && (
                    // <pre>{JSON.stringify(users, null, 2)}</pre>
                    <div>
                    <h2>User Information:</h2>
                    <p><strong>Имя:</strong> {user.firstname}</p>
                    <p><strong>Фамилия:</strong> {user.lastname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Добавьте другие поля, которые вам необходимо отобразить */}
                </div>
                )}
            </div>
        </div>
    );
}

export default UserProf;
