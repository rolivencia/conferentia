import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { IonicComponentsModule } from "@conferentia/ionic-components";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FolderPageRoutingModule, IonicComponentsModule],
  declarations: [FolderPage],
})
export class FolderPageModule {}
