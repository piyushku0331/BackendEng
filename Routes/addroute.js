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
