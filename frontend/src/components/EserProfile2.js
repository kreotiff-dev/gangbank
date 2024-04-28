import React, { useState } from "react";
import axios from "axios";



const UserProf = () => {
    const [users, setUsers] = useState(null);
    
    const fetchUserData = async () => {
        const response = await axios.get('http://192.168.1.63:3000/user/1');
        setUsers(response.data);
    }

    return (
        <div className="App">
            <h1>Game of Thrones Books</h1>
            <h2>Fetch a list from an API and display it</h2>

            {/* Кнопка для запроса данных */}
            <div>
                <button className="fetch-button" onClick={fetchUserData}>
                    Fetch Data
                </button>
            </div>

            {/* Отображение данных из API */}
            <div className="books">
                {users && (
                    <pre>{JSON.stringify(users, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}

export default UserProf;
