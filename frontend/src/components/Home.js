import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
    const [users, setUsers] = useState([]); 
    const [searchResults, setSearchResults] = useState([]); 
    const [query, setQuery] = useState(''); 
    const navigate = useNavigate(); 

    // Fetch all users 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users");
                setUsers(res.data);
                setSearchResults(res.data); 
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Handle search
    const handleSearch = async () => {
        if (!query) {
            setSearchResults(users); 
            return;
        }

        try {
            const res = await axios.get("http://localhost:5000/api/users/search", {
                params: { query }, // Send query as a parameter
            });
            setSearchResults(res.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    // Delete user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
            setSearchResults(searchResults.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="user-list-container">
            <h2>User Data</h2>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name, email, phone, or address..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button 
                    onClick={handleSearch} 
                    className="search-btn">
                    Search
                </button>
            </div>

            {/* User Table */}
            {searchResults.length ? (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button 
                                        onClick={() => navigate(`/update/${user._id}`)} 
                                        className="update-btn">
                                        Update
                                    </button>
                                    <button 
                                        onClick={() => deleteUser(user._id)} 
                                        className="delete-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No Users Found</p>
            )}
        </div>
    );
};

export default Home;
