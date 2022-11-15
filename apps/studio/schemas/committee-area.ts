export default {
  title: 'Áreas de Comité Académico',
  name: 'committeeArea',
  type: 'document',
  description: 'Áreas de los Comités Académicos de un evento',
  fields: [
    {
      title: 'Evento',
      name: 'event',
      type: 'reference',
      description: 'Evento al que pertenece el comité.',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      description: 'Nombre asignado al área.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Chairs',
      name: 'chairs',
      type: 'array',
      description: 'Chair(s) del comité',
      of: [
        {
          type: 'reference',
          to: { type: 'committeeMember' },
        },
      ],
    },
    {
      title: 'Vice Chairs',
      name: 'viceChairs',
      type: 'array',
      description: 'Vice-Chair(s) del comité',
      of: [
        {
          type: 'reference',
          to: { type: 'committeeMember' },
        },
      ],
    },
    {
      title: 'Integrantes',
      name: 'members',
      type: 'array',
      description: 'Integrantes del comité',
      of: [
        {
          type: 'reference',
          to: { type: 'committeeMember' },
        },
      ],
    },
    {
      title: 'Orden',
      name: 'order',
      type: 'number',
      description: 'Orden asignado al área al listar.',
    },
  ],
};
