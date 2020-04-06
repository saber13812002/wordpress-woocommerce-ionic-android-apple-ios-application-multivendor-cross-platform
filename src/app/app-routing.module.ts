import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderSummaryPage } from './checkout/order-summary/order-summary.page';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', },
  { path: 'order-summary/:id', component: OrderSummaryPage },
  //{ path: 'edit-address', loadChildren: './account/edit-address/edit-address.module#EditAddressPageModule' },
  //{ path: 'map', loadChildren: './account/map/map.module#MapPageModule' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
