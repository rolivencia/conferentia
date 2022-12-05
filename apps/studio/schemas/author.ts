export default {
  title: 'Autores',
  name: 'author',
  type: 'document',
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
    }
  ],
};
