// Import the Express library
const express = require('express');
const bodyParser = require('body-parser');


// Create an instance of an Express application
const app = express();
app.use(express.json());
const PORT = 3000;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ error: 'Something went wrong!' }); 
});

//array to store user data
const users = [];



// Route to handle GET requests
app.get('/users', (req, res) => {
    console.log('GET /users endpoint was accessed'); 
    res.status(200).json(users);
});


// Route to handle POST requests
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
   
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
    }

    // If all validations pass, save the new user
    const newUser = { name, email, password }; // Note: Password should be hashed in a real application
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});


// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
