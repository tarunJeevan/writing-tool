import { Schema, model } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        // TODO: Add required?
    }
})

export default model('User', userSchema)