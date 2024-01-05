import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

const config = defineConfig({
    projectId: 'wrrjh3je',
    dataset: 'production',
    title: 'Writing & Worldbuilding Tool',
    apiVersion: '2023-01-04',
    basePath: '/admin',
    plugins: [deskTool(), visionTool()]
})

export default config