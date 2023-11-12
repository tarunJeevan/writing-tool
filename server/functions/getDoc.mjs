import Document from "../model/Document.mjs"

const defaultValue = ''

export default async function findOrCreateDocument(id, name, creator) {
    if (id == null) return

    // Try to find the document by ID and return it if found
    const doc = await Document.findById(id)
    if (doc) return doc

    // Create new document if no document was found
    return await Document.create({ _id: id, data: defaultValue, creator: creator, name: name })
}