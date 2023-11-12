import { Schema, model } from "mongoose"

const documentSchema = new Schema({
    _id: String,
    name: String,
    creator: String,
    data: Object
})

export default model('Document', documentSchema)