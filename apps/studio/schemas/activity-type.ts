export default {
  title: 'Tipo de Actividad',
  name: 'activityType',
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
      name: 'name',
      type: 'string',
      description: 'Nombre asignado al tipo de actividad.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Ícono',
      name: 'image',
      type: 'image',
      description: 'Ícono/imagen asignado al tipo de actividad',
    },
    {
      name: 'fontColor',
      title: 'Color de fuente',
      type: 'color',
      description:
        'Color de la fuente asignada al pill de tipo de actividad en la app',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'backgroundColor',
      title: 'Color de badge',
      type: 'color',
      description:
        'Color característico asignado al tipo de actividad en la app',
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
};
