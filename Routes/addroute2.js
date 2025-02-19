const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' }
];

app.get('/allusers', (req, res) => {
  res.status(200).json(users);
});

app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
});

app.get('/adduser/:id/:name', (req, res) => {
  const userId = parseInt(req.params.id);
  const userName = req.params.name;

  if (users.find(user => user.id === userId)) {
    return res.status(409).json({ message: 'User with this ID already exists.' });
  }

  const newUser = { id: userId, name: userName };
  users.push(newUser);
  res.status(201).json({ message: 'User added successfully.', user: newUser });
});

app.get('/deleteuser/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ message: `User with ID ${userId} deleted.` });
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
});

app.get('/printusers', (req, res) => {
  let userList = users.map(user => `<li>ID: ${user.id}, Name: ${user.name}</li>`).join('');
  res.send(`
    <h2>All Users</h2>
    <ul>${userList}</ul>
    <a href="/">Back to Home</a>
  `);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
