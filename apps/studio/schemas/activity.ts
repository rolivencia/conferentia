import dayjs from 'dayjs';

export default {
  title: 'Actividades',
  name: 'activities',
  type: 'document',
  description: 'Lista de actividades del evento',
  preview: {
    select: {
      title: 'title',
      image: 'image',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare(selection) {
      const { title, image, startDate, endDate } = selection;
      const displayedStartDate = `${dayjs(new Date(startDate)).format(
        'YYYY-MM-DD'
      )}`;
      const displayedStartTime = `${dayjs(new Date(startDate)).format(
        'HH:mm'
      )}`;
      const displayedEndTime = `${dayjs(new Date(endDate)).format('HH:mm')}`;
      return {
        title: `${title}`,
        subtitle: `${displayedStartDate} | ${displayedStartTime} - ${displayedEndTime}`,
        media: image,
      };
    },
  },
  orderings: [
    {
      title: 'Hora de Inicio, desde más temprano',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Hora de Inicio, desde más tarde',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Alfabético, ascendente',
      name: 'alphabeticAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Alfabético, descendente',
      name: 'alphabeticDesc',
      by: [{ field: 'title', direction: 'desc' }],
    },
  ],
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
      name: 'type',
      description: 'Tipo asignado a la actividad.',
      type: 'reference',
      to: [{ type: 'activityType' }],
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
    {
      title: 'Ícono',
      name: 'image',
      type: 'image',
      description: 'Ícono/imagen asignado a la actividad',
    },
    {
      title: 'Participantes',
      name: 'participants',
      type: 'array',
      description: 'Participantes de la actividad (oradores, encargados, etc.)',
      of: [
        {
          type: 'reference',
          to: { type: 'participant' },
        },
      ],
    },
    {
      title: 'Fecha y Hora de inicio',
      name: 'startDate',
      type: 'datetime',
    },
    {
      title: 'Fecha y Hora de inicio',
      name: 'endDate',
      type: 'datetime',
    },
    {
      title: 'Descripción',
      name: 'description',
      type: 'text',
      description: 'Descripción en detalle de la actividad.',
    },
    {
      title: 'Abstracts Relacionados',
      name: 'abstracts',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'abstract' } }],
    },
  ],
};
