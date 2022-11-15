import { Sortable } from './sortable-entity.interface';

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
