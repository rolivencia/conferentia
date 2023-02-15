import { Pipe, PipeTransform } from '@angular/core';
import { Author } from "@conferentia/models";

@Pipe({
  name: 'authors'
})
export class AuthorsPipe implements PipeTransform {

  transform(authors: Author[], ...args: unknown[]): unknown {
    return authors.map(author => author.firstName + ' ' + author.lastName).join(', ');
  }

}
