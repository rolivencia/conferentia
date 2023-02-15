export default {
  title: 'Roles de Usuario',
  name: 'role',
  type: 'document',
  fields: [
    {
      title: 'Nombre',
      name: 'name',
      type: 'string',
      description: 'Nombre del rol de usuario.',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Llave',
      name: 'key',
      type: 'string',
      description: 'Cadena que identifica a un rol de usuario.',
      validation: (Rule) => Rule.required(),
    },
  ]
}
