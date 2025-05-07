const express = require('express');
const mongoose = require('mongoose');

const User = require('./model/user'); // User model
const Blog = require('./model/blog'); // Blog model (corrected name)

const userRoutes = require("./routes2/userRoutes"); // User routes
const blogRoutes = require("./routes2/blogRoutes"); // Blog routes

const app = express();

// Set up the view engine (Handlebars)
app.set('view engine', 'hbs');

// Middleware for parsing form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route setup
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

// Homepage
app.get('/', (req, res) => {
    res.render("home", {
        name: "Piyush"
    });
});

// Show all blogs
app.get('/blogsData', async (req, res) => {
    try {
        let allBlogs = await Blog.find();
        res.render("blogs", {
            data: allBlogs
        });
    } catch (err) {
        console.error("Error fetching blogs:", err);
        res.status(500).send("Error loading blogs");
    }
});

// Show individual blog by ID
app.get('/blogsData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).send("Blog not found");

        res.render("blog", {
            blog: blog
        });
    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).send("Server error");
    }
});

// Show add blog form
app.get('/addBlog', (req, res) => {
    res.render('addBlog'); // Assumes addBlog.hbs exists
});

// Handle add blog form submission
app.post('/blogsData', async (req, res) => {
    const { title, author, content, date } = req.body;

    const newBlog = new Blog({
        title,
        author,
        content,
        date
    });

    try {
        await newBlog.save();
        res.redirect('/blogsData');
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).send('Error adding blog');
    }
});

// Show all users
app.get('/usersData', async (req, res) => {
    try {
        let allUsers = await User.find();
        res.render("user", {
            userData: allUsers
        });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error loading users");
    }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Mongoose-1')
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.error("Connection error:", err));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
