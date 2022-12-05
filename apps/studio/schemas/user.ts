export default {
  title: 'Usuarios',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Email',
      name: 'email',
      type: 'email',
      description: 'Email del usuario',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Registro Finalizado',
      name: 'hasFinishedRegistration',
      type: 'boolean',
      description: '¿Ha finalizado el usuario su registro?',
      validation: (Rule) => Rule.required(),
      initialValue: false
    }
  ],
};
