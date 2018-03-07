import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddIpPage } from './add-ip';

@NgModule({
  declarations: [
    AddIpPage,
  ],
  imports: [
    IonicPageModule.forChild(AddIpPage),
  ],
})
export class AddIpPageModule {}
