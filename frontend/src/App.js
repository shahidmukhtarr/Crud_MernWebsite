import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/update/:id" element={<UpdateUser />} />
            </Routes>
        </Router>
    );
};

export default App;
