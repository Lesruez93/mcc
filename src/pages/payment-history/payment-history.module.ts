import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentHistoryPage } from './payment-history';
import {MomentModule} from "ngx-moment";

@NgModule({
  declarations: [
    PaymentHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentHistoryPage),
      MomentModule,

  ],
})
export class PaymentHistoryPageModule {}
