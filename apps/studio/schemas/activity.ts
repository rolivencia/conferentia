export default {
  title: 'Actividades',
  name: 'activities',
  type: 'document',
  description: 'Lista de actividades del evento',
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
      title: 'Título',
      name: 'title',
      type: 'string',
      description: 'Título asignado a la actividad.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Tipo de Actividad',
      name: 'activity_type',
      description: 'Tipo asignado a la actividad.',
      type: 'reference',
      to: [{ type: 'activity_type' }],
      // options: {
      //   filter: ({ document }) => {
      //     // TODO: Put this filter to work (see #15)
      //     // Check that the assigned Activity Type belongs to the same Event the activity belongs to
      //     return {
      //       filter: 'event == $event',
      //       params: {
      //         event: document.event,
      //       },
      //     };
      //   },
      // },
      validation: (Rule) => Rule.required(),
    },
  ],
};
