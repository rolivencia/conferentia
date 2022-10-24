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
      description: 'Evento al que pertenece la actividad',
      to: [{ type: 'event' }],
    },
    {
      title: 'Título',
      name: 'title',
      type: 'string',
      description: 'Título asignado a la actividad.',
    },
  ],
};
