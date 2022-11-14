export interface Sortable {
  /**
   * An object implementing the Sortable interface adds a property
   * to represent a value under which it can be sorted when part
   * of a list or a given data structure supporting a sorting method.
   */
  order: number;
}

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

export abstract class SortingService {
  /**
   * Implements ascending and descending sorting methods for
   * objects implementing the Sortable interface.
   */
  protected ascendingSortFn = (a: Sortable, b: Sortable): number => {
    if (a.order > b.order) {
      return 1;
    } else if (a.order < b.order) {
      return -1;
    }
    return 0;
  };

  protected descendingSortFn = (a: Sortable, b: Sortable): number => {
    if (a.order > b.order) {
      return -1;
    } else if (a.order < b.order) {
      return 1;
    }
    return 0;
  };
}

export class EntitySortingService<
  T,
  K extends Iterable<SortableEntity<T>> = Array<SortableEntity<T>>
> extends SortingService {
  /**
   * Service to handle objects implementing the SortableEntity interface
   * when processing fetch requests to retrieve entities of the T type,
   * allowing to hide sorting and ordering implementation details when
   * returning T-type collections.
   */
  public unwrap = (wrapper: SortableEntity<T>): T => wrapper.entity;
  public sortAndUnwrapAsArray = (iterable: K, asc: boolean = true): T[] => {
    return [...iterable]
      .sort(asc ? this.ascendingSortFn : this.descendingSortFn)
      .map((element) => this.unwrap(element));
  };
}
