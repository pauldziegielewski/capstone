require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Item = require('./models/items');

const app = express();

// ------------------------------ Middleware
app.use(bodyParser.json());
app.use(cors());
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// ------------------------------ Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// ------------------------ Registration route
app.post(
  '/api/register',
  [
    body('firstName').notEmpty().withMessage('First Name is required'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      .withMessage('Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((error) => error.msg),
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      console.log('User saved successfully');
      return res.status(201).json({ message: 'Form submission successful' });
    } catch (error) {
      console.error('Error saving user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);





// -------------------------------- LOGIN

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', email, password);

  try {
    // Find a user by email
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (passwordMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      // Return a token and user data in the response
      return res.status(200).json({ success: true, token, user });
    } else {
      console.log('Authentication failed');
      return res.status(401).json({ success: false, error: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});



//  ------------------------------ LOGOUT
app.post("/api/logout", (req, res) => {


  res.json({ success: true, message: "Logout successful"});
})


// **************************************************
// ------------------------- ROUTES FOR ITEM CRUD
// **************************************************


// ---------------------ROUTE FOR ADDING A NEW ITEM
app.post('/api/items', verifyToken, async (req, res) => {
  try {
    const {name, checked} = req.body;
    const userID = req.userId;

    const newItem = new Item({
      userID,
      name,
      checked,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: "Internal server error"});
  }
});

// ------------------------ROUTE FOR RETRIEVING ITEMS
app.get('/api/items', async (req, res)=> {
  try {
    const items = await Item.find({ userID: req.query.userID});
    res.status(200).json(items);
  } catch (error) {
    console.error("Error retrieving items", error);
    res.status(500).json({error: "Internal server error"});
  }
});

//------------------------------ UPDATE ITEM BY ID
app.put('/api/items/:id', async (req, res)=> {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body,  {new: true});
    if(!updatedItem) {
      return res.status(404).json({error: "Item not found"});
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({error: "Inernal server error"});
  }
});

// ---------------------------DELETE ITEM BY ID
app.delete('/api/items/:id', async (req, res)=> {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({error: "Item not found"});
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({error: "Internal server error"});
  }
});


// ------------------------ AUTHENTICATION

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if(!token) {
    return res.status(403).json({auth: false, message: "No token provided"});
}

jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
  if (err) {
    return res.status(500).json({auth: false, message: "Failed to authenticate token"});
  }

  req.userId = decoded.user.id;
  next();
});
}


app.get("/api/protected", verifyToken, (req, res) => {
  if (req.userId) {
    res.json({ message: "This is a protected route", userId: req.userId });
  } else {
    res.status(403).json({ message: "Access denied. Token invalid or not provided." });
  }
});



// -------------------------Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
