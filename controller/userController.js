const donorData = require("../model/donor");
const bloodBank = require("../model/bloodBank");
const bcrypt = require('bcryptjs');
const res = require("express/lib/response");
const Controller = {
    registerDonor: async (req, res) => {
        console.log(req.body);
        if (!req.body) {
            return res.status(400).send();
        }
        try {
            const data = new donorData(req.body);
            await data.save();

        }
        catch (e) {
            console.log(e);
            return res.status(400).send();
        }
        req.flash('message', 'Registered Succesfully');
        res.redirect("/donorRegistration");
    },
    findBlood: async (req, res) => {
        const body = req.body;
        console.log(body);
        //o- is universal donor
        if (!body) {
            return res.status(400).send();
        }
        let bloodGroups;
        switch (body.bloodGroup) {
            case 'A+': bloodGroups = ['A+', 'A-', 'O+', 'O-']
                break;
            case 'A-': bloodGroups = ['A-', 'O-']
                break;
            case 'AB+': bloodGroups = ['A+', 'A-', 'O+', 'O-', 'AB+', 'AB-', 'B+', 'B-']
                break;
            case 'AB-': bloodGroups = ['AB-', 'A-', 'B-', 'O-']
                break;
            case 'B+': bloodGroups = ['B+', 'B-', 'O+', 'O-']
                break;
            case 'B-': bloodGroups = ['B-', 'O-']
                break;
            case 'O+': bloodGroups = ['O+', 'O-']
                break;
            case 'O-': bloodGroups = ['O-']
                break;

        }
        console.log(bloodGroups, 12)

        try {
            data = await donorData.find({ district: body.district, state: body.state, bloodGroup: { $in: bloodGroups } });
            console.log(data);
        }
        catch (e) {
            console.log(e);
            return res.status(400).send();
        }

        res.render('donorDetails', { data })
    }

}
const BloodBankController = {
    register: async (req, res) => {
        if (!req.body) {
            return res.status(400).send();
        }
        const { bbid, password, state, district, phone } = req.body;
        //need validation to check bbid

        try {
            const hashedPassword = await bcrypt.hash(password, 8);
            const data = new bloodBank({ bbid, password: hashedPassword, state, district, phone });
            await data.save();
        }
        catch (e) {
            return res.status(400).send();
        }
        req.flash('message', 'Registered Succesfully');
        res.redirect("/register");
    },

    updateQty: async (req, res) => {

        try {
            console.log(req.body);
            const updatedBloodQty = req.body;
            const id = req.user._id;
            let bloodQty = req.user.bloodQty;
            const updatedKeys = Object.keys(req.body);
            const keys = Object.keys(bloodQty);
            console.log(updatedKeys);
            console.log(keys);
            updatedKeys.forEach((ukey) => {
                bloodQty[ukey] = updatedBloodQty[ukey];
            })
            console.log(bloodQty, 1212);
            const data = await bloodBank.findByIdAndUpdate(id, { bloodQty: bloodQty });
            console.log(data, 1212)
            return res.redirect('/bloodBank');

        }
        catch (e) {
            return res.status(400).send();
        }

    },

    findBlood: async (req, res) => {
        console.log(req.body);
        var bloodGroup = req.body.bloodGroup;
        let data = await bloodBank.find({ state: req.body.state, district: req.body.district })

        var filteredData = data.filter((dt) => {
            return dt.bloodQty[bloodGroup] > 0;
        })
        console.log(filteredData)
        return res.render('bloodBankDetails', { data: filteredData, bloodGroup: bloodGroup });
    }

}
module.exports = { Controller, BloodBankController };