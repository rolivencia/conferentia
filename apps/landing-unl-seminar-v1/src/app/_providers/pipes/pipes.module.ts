import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsPipe } from '../authors.pipe';

@NgModule({
  declarations: [AuthorsPipe],
  imports: [CommonModule],
  exports: [AuthorsPipe],
})
export class PipesModule {}
