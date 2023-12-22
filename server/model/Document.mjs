import { Schema, model } from "mongoose"

const documentSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
})

export default model('Document', documentSchema)