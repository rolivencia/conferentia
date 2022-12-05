export default {
  title: 'Miembros del Comité',
  name: 'committeeMember',
  type: 'document',
  description: 'Miembros del comité de un evento',
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      courtesyTitle: 'courtesyTitle',
      avatar: 'avatar',
    },
    prepare(selection) {
      const { firstName, lastName, courtesyTitle, avatar } = selection;
      const courtesyString = courtesyTitle ? `, ${courtesyTitle}` : '';
      return {
        title: `${firstName} ${lastName}${courtesyString}`,
        media: avatar,
      };
    },
  },
  fields: [
    {
      title: 'Evento',
      name: 'event',
      type: 'reference',
      description: 'Evento al que pertenece el miembro del comité.',
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
      description: 'Nombre del miembro del comité.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Apellido',
      name: 'lastName',
      type: 'string',
      description: 'Apellido del miembro del comité.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Institución',
      name: 'institution',
      type: 'string',
      description: 'Institución a la que pertenece el miembro del comité.',
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
      description: 'Currículum del miembro del comité.',
    },
  ],
};
