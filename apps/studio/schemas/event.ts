export default {
  title: 'Eventos',
  name: 'event',
  type: 'document',
  fields: [
    {
      title: 'Título',
      name: 'title',
      type: 'string',
      description:
        'Título breve, en siglas, asignado a cada uno de los eventos gestionados por la plataforma.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      description:
        'Nombre en detalle asignado a cada uno de los eventos gestionados por la plataforma.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Logo del evento',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo de la imagen',
        },
      ],
    },
    {
      title: 'Fecha de Comienzo',
      name: 'start_date',
      type: 'date',
      description: 'Fecha de comienzo del evento',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Hoy',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Fecha de Finalización',
      name: 'end_date',
      type: 'date',
      description: 'Fecha de finalización del evento',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Hoy',
      },
      validation: (Rule) => Rule.required(),
    },
    // options: {
    //   filter: ({ document }) => {
    //     // TODO: Put this filter to work (see #15)
    //     // Check that the assigned Sponsors belongs to the same Event each sponsor belongs to
    //     return {
    //       filter: 'event == $event',
    //       params: {
    //         event: document.event,
    //       },
    //     };
    //   },
    // },
    {
      title: 'Patrocinadores',
      name: 'sponsors',
      type: 'array',
      description: 'Patrocinadores del evento',
      of: [
        {
          type: 'reference',
          to: { type: 'sponsor' },
        },
      ],
    },
  ],
  initialValue: {
    start_date: new Date(),
    end_date: new Date(),
  },
};
