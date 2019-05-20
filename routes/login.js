const fs = require('fs');

module.exports = {
    signupPage: (req, res) => {
        res.render('signup.ejs', {
            title: "Welcome to Blossom",
        });
    },

    signup: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let phone = req.body.phone;
        console.log(email + password + phone);
        
        let query = "INSERT INTO account (email, password, phone) VALUES ('" + email + "', '" + password + "', '" + phone + "')";
        db.query(query, (err, result) => {

        });
        window.location.href="localhost:3000/login";
        // res.render('login.ejs', {
        //     title: "Welcome to Blossom",
        //     error: false
        // });
    },

    loginPage: (req, res) => {
        // let playerId = req.params.id;
        res.render('login.ejs', {
            title: "Welcome to Blossom",
            error: false
        });

    },

    login: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        console.log('Email: ' + email + ' Password: ' + password);

        let query = "SELECT * FROM `account` WHERE email = '" + email + "' AND password = '" + password + "'";
        db.query(query, (err, result) => {
            if (!result[0]) {
                res.render('login.ejs', {
                    title: "Welcome to Blossom",
                    error: true
                });
            } else {
                res.render('index.ejs', {
                    title: "Welcome to Blossom",
                    account: result[0]
                });
            }
        });
    }
}