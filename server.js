const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectdb = require("./config/db");

connectdb();

//init middleware to accept json data
app.use(express.json({ extended: false }));

app.post("/", (req, res) => {
  res.json({ msg: "welcome " });
});

app.use("/user", require("./routes/user"));

app.use("/auth", require("./routes/auth"));

app.use("/contacts", require("./routes/contacts"));

app.listen(PORT, () => console.log(`server started on ${PORT}`));
