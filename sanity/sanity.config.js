import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const config = defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  title: 'Sanity Esports',
  apiVersion: '2023-05-03',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})

export default config
