require("./db/db");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./auth/passport");
const userRoutes = require("./routes/userRoutes");
const path = require("path")
const app = express();



initializePassport(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'its a secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(userRoutes);
app.use('/', (req, res) => {
    res.render('index');
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT} 🚀`);
})