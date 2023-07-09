const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  fs.readFile("chat.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "No Chats Exist";
    }
    res.send(
      ` ${data}
            <form onSubmit="document.getElementById('username').value=localStorage.getItem('username')"
             action='/' method='POST'>
             <input name='message' placeholder='Enter some message'/> 
             <input name='username' type='hidden' id='username'/> <button type='submit'>Send</button></form>`
    );
  });
});

app.get("/login", (req, res) => {
  res.send(
    `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action='/' ><input id="username" name='username' placeholder='enter username'/> <button type='submit'>Enter</button></form>`
  );
});
// app.post("/login", (req, res, next) => {
//   console.log(req.body.username);

//   // localStorage.setItem("username", body.username);
//   res.redirect("/");
// });

app.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  const message = `${body.username} : ${body.message}, `;
  fs.writeFile("chat.txt", message, { flag: "a" }, (e) => {
    res.redirect("/");
  });
});
app.use((req, res) => {
  res.send("<h1>Error 404. No page found</h1>");
});
app.listen(4000);
