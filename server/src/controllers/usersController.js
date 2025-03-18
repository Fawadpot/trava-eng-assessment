const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf-8")).users;

const getUsers = (req, res) => {
  let filteredUsers = usersData;
  const query = req.query;
  Object.keys(query).forEach((param) => {
    if (param.endsWith("_op")) return;
    const operatorKey = `${param}_op`;
    const operator =
      query[operatorKey] ||
      (typeof usersData[0]?.[param] === "string" ? "like" : "eq");

    filteredUsers = applyFilter(filteredUsers, param, query[param], operator);
  });

  if (query.sort) {
    const sortField = query.sort;
    const sortDir = query.sort_dir === "desc" ? -1 : 1;
    filteredUsers.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === "string") return valA.localeCompare(valB) * sortDir;
      if (typeof valA === "number") return (valA - valB) * sortDir;
      return 0;
    });
  }

  res.json({ users: filteredUsers });
};

const applyFilter = (users, key, value, operator) => {
  switch (operator) {
    case "eq":
      return users.filter(
        (user) => user[key]?.toString().toLowerCase() === value.toLowerCase()
      );
    case "neq":
      return users.filter(
        (user) => user[key]?.toString().toLowerCase() !== value.toLowerCase()
      );
    case "gte":
      return users.filter((user) => parseFloat(user[key]) >= parseFloat(value));
    case "lte":
      return users.filter((user) => parseFloat(user[key]) <= parseFloat(value));
    case "gt":
      return users.filter((user) => parseFloat(user[key]) > parseFloat(value));
    case "lt":
      return users.filter((user) => parseFloat(user[key]) < parseFloat(value));
    case "like":
      return users.filter((user) =>
        user[key]?.toString().toLowerCase().includes(value.toLowerCase())
      );
    default:
      return users;
  }
};

module.exports = { getUsers };
