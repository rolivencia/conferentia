export default {
  title: 'Autores',
  name: 'author',
  type: 'document',
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      institution: 'institution',
    },
    prepare(selection) {
      const { firstName, lastName, institution } = selection;
      return {
        title: `${firstName} ${lastName}`,
        subtitle: institution,
      };
    },
  },
  fields: [
    {
      title: 'Nombres',
      name: 'firstName',
      type: 'string',
      description: 'Nombre del autor',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Apellidos',
      name: 'lastName',
      type: 'string',
      description: 'Apellidos del autor',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Institución',
      name: 'institution',
      type: 'string',
      description: 'Institución de trabajo del autor',
      validation: (Rule) => Rule.required(),
    },
  ],
};
