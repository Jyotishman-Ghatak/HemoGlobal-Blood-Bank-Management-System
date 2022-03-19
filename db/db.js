const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/hemoGlobal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected Successfully 🩸")
});

