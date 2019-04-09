import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FaultsPage} from "./faults";
import {MomentModule} from "ngx-moment";
import 'moment/locale/en-au';


@NgModule({
  declarations: [
    FaultsPage,



  ],
  imports: [
    IonicPageModule.forChild(FaultsPage),
    MomentModule,

  ],
  exports: [
    FaultsPage,

  ]
})
export class FaultsPageModule {}
