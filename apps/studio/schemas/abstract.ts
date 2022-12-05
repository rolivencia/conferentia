export default {
  title: 'Abstracts',
  name: 'abstract',
  type: 'document',
  preview: {
    select: {},
  },
  fields: [
    {
      title: 'Título',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Autores',
      name: 'authors',
      type: 'array',
      description: 'Lista de autores del abstract presentado',
      of: [
        {
          type: 'reference',
          to: { type: 'author' },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Area Temática',
      name: 'subjectArea',
      type: 'reference',
      to: [{ type: 'subjectArea' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Palabras clave',
      name: 'keywords',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Archivo',
      name: 'file',
      type: 'file',
      description: 'Archivo del abstract',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Submitted', value: 'submitted' },
          { title: 'In Evaluation', value: 'inEvaluation' },
          {
            title: 'AcceptedWithModifications',
            value: 'acceptedWithModifications',
          },
          { title: 'Accepted', value: 'accepted' },
          { title: 'Rejected', value: 'rejected' },
          {
            title: 'Assigned modality: Oral presentation',
            value: 'Assigned modality: Oral presentation',
          },
          {
            title: 'Assigned modality: Flash poster',
            value: 'Assigned modality: Flash poster',
          },
        ],
      },
      initialValue: 'submitted',
    },
  ],
};
