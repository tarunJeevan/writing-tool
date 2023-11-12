import { Schema, model } from "mongoose"

const folderSchema = new Schema({
    _id: String,
    parentFolder: Object
})

export default model('Folder', folderSchema)