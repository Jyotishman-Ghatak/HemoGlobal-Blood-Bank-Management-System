const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs/dist/bcrypt");
const { BloodBankController } = require("../controller/userController");
const bloodBank = require("../model/bloodBank");

function intitalize(passport) {
    const authenticateBank = async (bbid, password, done) => {
        const user = await bloodBank.findOne({ bbid });

        if (!user) {
            return done(null, false, { message: "No Blood Bank with given Id found" });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: "Password Incorrect" });
            }
        }
        catch (e) {
            return done(e);
        }

    }
    passport.use(new LocalStrategy({ usernameField: 'bbid' }, authenticateBank));
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });
    passport.deserializeUser(async (id, done) => {
        const user = await bloodBank.findById(id);
        return done(null, user);
    });
}
module.exports = intitalize;