import { Sortable } from './sortable.interface';

export interface SortableEntity<T> extends Sortable {
  /**
   * An object implementing the SortableEntity interface acts as a
   * wrapper for an entity of type T, delegating its ordering as a
   * value inside a structure on the order property.
   *
   * The intent of the SortableEntity interface is allowing a
   * specific model entity not having to deal with knowing details
   * about the order in which it is displayed or sorted when
   * being used or managed as part of collections or data structures,
   * effectively separating concerns between the domain model
   * and architectural purposes for the handling of data.
   */
  entity: T;
}




