import { useState } from "react";
import axios from "axios";
import './AddUser.css';

const AddUser = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/add', form);
            alert('User Added successfully');
            setForm({ name: '', email: '', phone: '', address:'' });
        } catch (error) {
            alert('Error sending message');
        }
    };

    return (
        <>
       
        <form onSubmit={handleSubmit}>
            <h2>Add New User </h2>
            <label>Name:</label>
            <input name="name" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Email:</label>
            <input name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label>Phone:</label>
            <input name="phone" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <label>Address:</label>
            <input name="address" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <button type="submit">Add User</button>
        </form>
        </>
    );
};

export default AddUser;
