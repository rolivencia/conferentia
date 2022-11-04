export default {
  title: 'Eventos',
  name: 'event',
  type: 'document',
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      description:
        'Nombre asignado a cada uno de los eventos gestionados por la plataforma.',
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
  ],
  initialValue: {
    start_date: new Date(),
    end_date: new Date()
  }
};
