// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: 'Eventos',
      name: 'event',
      type: 'document',
      fields: [
        {
          title: 'Nombre',
          name: 'title',
          type: 'string',
          description:
            'Nombre asignado a cada uno de los eventos gestionados por la plataforma',
        },
        {
          title: 'Fecha de Comienzo',
          name: 'start_date',
          type: 'date',
          description: 'Fecha de comienzo del evento',
          options: {
            dateFormat: 'YYYY-MM-DD',
            calendarTodayLabel: 'Hoy'
          }
        },
        {
          title: 'Fecha de Finalización',
          name: 'end_date',
          type: 'date',
          description: 'Fecha de finalización del evento',
          options: {
            dateFormat: 'YYYY-MM-DD',
            calendarTodayLabel: 'Hoy'
          }
        }
      ],
    },
  ]),
});
