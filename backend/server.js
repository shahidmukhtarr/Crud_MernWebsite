const express = require('express');
const cors = require('cors');
require('./db/connection'); 

const app = express();


app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));

const userRoute = require('./routes/userRoutes');
app.use('/api/users', userRoute); 


const PORT = 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
