export default {
  title: 'Patrocinadores',
  name: 'sponsor',
  type: 'document',
  description: 'Patrocinadores de un evento',
  fields: [
    {
      title: 'Evento',
      name: 'event',
      type: 'reference',
      description: 'Evento al que pertenece la actividad.',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      description: 'Nombre del patrocinador.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Logo',
      name: 'image',
      type: 'image',
      description: 'Logo del patrocinador.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Enlace',
      name: 'url',
      type: 'string',
      description: 'Enlace al sitio del patrocinador',
    },
  ],
};
