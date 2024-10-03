const express = require("express");
const app = express();
app.use(express.json());
const users = require("./usersData");

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/usersById", (req, res) => {
  const userId = parseInt(req.query.id);
  const user = users.find((_u) => _u.id === userId);

  if (user) {
    res.json(user);
  }
  res.status(404).json({ message: `User ${userId} doesn't exist.` });
});

app.post("/users", (req, res) => {
  const usersReq = req.body;
  usersReq.forEach((user) => {
    const userFind = users.find((_item) => _item.name == user.name);

    if (userFind) {
      res.json({
        message: `There is a register with name ${userFind.name}`,
      });
      return res.json(users);
    }
    users.push({ id: user.id, name: user.name });
  });

  return res.json(users);
});

app.put("/users", (req, res) => {
  const { id: userId, name } = req.query;

  const userIndex = users.findIndex((_user) => _user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].name = name;
    res.json({
      message: "User name updated successfully",
      userUpdated: users[userIndex],
      users: users,
    });
  }
  res.status(404).json({ message: "User not found.", users: users });
});

app.delete("/users", (req, res) => {
  const userId = parseInt(req.query.id);
  const userIndex = users.findIndex((_user) => _user.id === userId);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json({
      message: "User deleted successfully",
      userRemoved: deletedUser[0],
      users: users,
    });
  }

  res.status(404).json({ message: "User not found", users: users });
});

app.listen(3333);
