const mongooes = require("mongoose");


const connectDatabase = () => {
    mongooes.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connect.host}`);
    })
}

module.exports = connectDatabase