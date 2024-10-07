import mongoose from 'mongoose'
export const connectToDb = () => new Promise((res, rej) => {
    mongoose.connect(process.env.DB_URI).then(() => {
        res("DB Connected")
    }).catch((e) => {
        rej(e)
    })
})