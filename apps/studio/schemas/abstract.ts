export default {
  title: 'Abstracts',
  name: 'abstract',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subjectArea: 'subjectArea',
      status: 'status',
    },
    prepare(selection) {
      const { title, subjectArea, status } = selection;
      return {
        title: `${title} | ${subjectArea.name}`,
        subtitle: status.toUpperCase(),
      };
    },
  },
  fields: [
    {
      title: 'Evento',
      name: 'event',
      type: 'reference',
      description: 'Evento al que pertenece el área temática.',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Usuario',
      name: 'user',
      type: 'reference',
      description: 'Usuario que envió el abstract',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    },
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
      name: 'pdfFile',
      type: 'file',
      description: 'Archivo del abstract',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Formato',
      name: 'format',
      type: 'string',
      options: {
        list: [
          { title: 'Oral Presentation', value: 'oralPresentation' },
          { title: 'Flash Poster', value: 'flashPoster' },
        ],
      },
      layout: 'radio',
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