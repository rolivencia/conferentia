export default {
  title: 'Areas Temáticas',
  name: 'subjectArea',
  type: 'document',
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
      title: 'Nombre',
      name: 'name',
      type: 'string',
      description: 'Nombre asignado al área temática.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Imagen Alusiva',
      name: 'image',
      type: 'image',
      description: 'Imagen alusiva al área temática.',
    },
  ]
}
