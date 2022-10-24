export default {
  title: 'Tipo de Actividad',
  name: 'activity_type',
  type: 'document',
  description: 'Tipo asignable a una actividad',
  fields: [
    {
      title: 'Evento',
      name: 'event',
      type: 'reference',
      description: 'Evento al que pertenece este tipo de actividad',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tipo',
      name: 'type',
      type: 'string',
      description: 'Nombre asignado al tipo de actividad.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'font_color',
      title: 'Color de fuente',
      type: 'color',
      description:
        'Color de la fuente asignada al badge de tipo de actividad en la app',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'badge_color',
      title: 'Color de badge',
      type: 'color',
      description:
        'Color de fondo asignado al badge de tipo de actividad en la app',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
