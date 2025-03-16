import app from './app.js'
import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL.replace(
    "<PASSWORD>",
    process.env.DB_PASS)
    .replace("<USERNAME>", process.env.DB_USER)

mongoose.connect(DB_URL)
    .then(() => {
        console.log("connected to the database");
    })


app.listen(3000, () => {
    console.log('server is running on port 3000');
})
