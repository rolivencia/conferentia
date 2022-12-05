// FIXME: Add shortpath for domain models (2022/12/05 - RO - #97)
import { countries } from '../../../libs/models/src';

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
      title: 'Nombres',
      name: 'firstName',
      type: 'string',
      description: 'Nombre del Usuario',
    },
    {
      title: 'Apellidos',
      name: 'lastName',
      type: 'string',
      description: 'Apellidos del Usuario',
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
      title: 'Afiliación',
      name: 'affiliation',
      type: 'string',
      description:
        'Institución, organización o empresa a la que pertenece el usuario',
    },
    {
      title: 'País',
      name: 'country',
      type: 'string',
      description: 'País de origen del usuario',
      options: {
        list: [...countries],
      },
    },
    {
      title: 'Registro Finalizado',
      name: 'hasFinishedRegistration',
      type: 'boolean',
      description: '¿Ha finalizado el usuario su registro?',
      validation: (Rule) => Rule.required(),
      initialValue: false,
    },
  ],
};
