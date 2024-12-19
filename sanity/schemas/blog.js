import {defineType, defineField} from 'sanity'

export const blog = defineType({
  title: 'Blog',
  name: 'blog',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Small Description',
      name: 'smallDescription',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      title: 'Title Image',
      name: 'titleImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      title: 'Created At',
      name: 'createdAt',
      type: 'datetime',
    }),
  ],
})

export default blog
