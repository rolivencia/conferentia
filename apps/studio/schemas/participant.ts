export default {
  title: 'Participantes',
  name: 'participant',
  type: 'document',
  description: 'Participantes del evento (Speakers, Disertantes, etc.)',
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      courtesyTitle: 'courtesyTitle',
      avatar: 'avatar',
      institution: 'institution',
    },
    prepare(selection) {
      const { firstName, lastName, courtesyTitle, avatar, institution } =
        selection;
      const courtesyString = courtesyTitle ? `, ${courtesyTitle}.` : '';
      return {
        title: `${firstName} ${lastName}${courtesyString}`,
        subtitle: institution,
        media: avatar,
      };
    },
  },

  fields: [
    {
      title: 'Evento',
      name: 'event',
      type: 'reference',
      description: 'Evento al que pertenece el participante.',
      to: [{ type: 'event' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Nombre de Cortesía',
      name: 'courtesyTitle',
      type: 'string',
      options: {
        list: [
          { title: 'Ph.D', value: 'Ph.D' },
          { title: 'Dr.', value: 'Dr.' },
          { title: 'Prof.', value: 'Prof.' },
          { title: 'Ms', value: 'Ms' },
          { title: 'Miss', value: 'Miss' },
          { title: 'Mrs', value: 'Mrs' },
          { title: 'Ms.', value: 'Ms.' },
          { title: 'Mr.', value: 'Mr.' },
        ],
      },
    },
    {
      title: 'Nombre',
      name: 'firstName',
      type: 'string',
      description: 'Nombre del participante.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Apellido',
      name: 'lastName',
      type: 'string',
      description: 'Apellido del participante.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Rol',
      name: 'role',
      type: 'string',
      options: {
        list: [
          { title: 'Keynote', value: 'keynote' },
          { title: 'Plenary', value: 'plenary' },
          { title: 'Oral Presentations', value: 'oralPresentations' },
        ],
        layout: 'radio',
      },
      description: 'Rol del participante en el evento.',
    },
    {
      title: 'Institución',
      name: 'institution',
      type: 'string',
      description: 'Institución a la que pertenece el participante.',
    },
    {
      title: 'Avatar',
      name: 'avatar',
      type: 'image',
      description: 'Imagen de la persona para presentar en la aplicación.',
    },
    {
      title: 'Currículum',
      name: 'curriculum',
      type: 'text',
      description: 'Currículum del participante.',
    },
  ],
};
