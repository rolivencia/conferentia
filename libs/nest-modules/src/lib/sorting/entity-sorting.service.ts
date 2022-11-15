import { Injectable } from '@nestjs/common';
import { SortableEntity } from './sortable-entity.interface';
import { SortingService } from './sorting.service';

@Injectable()
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
