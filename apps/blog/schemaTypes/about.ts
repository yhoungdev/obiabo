import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introMarkdown',
      title: 'Homepage intro',
      type: 'text',
      rows: 8,
      description: 'Short about section shown on the homepage. Supports Markdown and inline HTML.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullMarkdown',
      title: 'Full about page',
      type: 'text',
      rows: 16,
      description: 'Long-form about content shown on /about. Supports Markdown and inline HTML.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
