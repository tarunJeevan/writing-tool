import { Schema, model } from "mongoose"

const folderSchema = new Schema({
    creator: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    path: [String],
    parentId: String
})

export default model('Folder', folderSchema)