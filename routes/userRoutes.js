const { Controller, BloodBankController } = require("../controller/userController");

const express = require("express");
const passport = require('passport');
//const LocalStrategy = require("../auth/passport");
const router = new express.Router();

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

router.get('/donorRegistration', (req, res) => {
    res.render('donorRegister', { message: req.flash('message') });
})
router.get('/login', (req, res) => {
    var message = req.flash('error');
    if (message.length) {
        console.log(message[0]);//wip
    }

    return res.render('bloodBankLogin', { error: req.flash('error') });
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/bloodBank',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', checkAuthentication, (req, res) => {
    req.logout();
    res.redirect('/')
})
router.get('/bloodBank', checkAuthentication, (req, res) => {
    const user = req.user
    console.log(user);
    return res.render('bloodBank', { data: user });
})

router.get('/register', (req, res) => {
    return res.render('bloodBankRegister', { message: req.flash('message') })
})
router.post('/donorRegistration', Controller.registerDonor);
router.post('/bloodBankRegister', BloodBankController.register)
router.post('/findBlood', Controller.findBlood);
router.post('/findBloodBank', BloodBankController.findBlood)
router.post('/updateQty', checkAuthentication, BloodBankController.updateQty);

module.exports = router;