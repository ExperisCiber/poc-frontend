import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { ProductionLotComponent } from './ProductionLot/ProductionLot.component';
import { ContractComponent } from './Contract/Contract.component';
import { BatchComponent } from './Batch/Batch.component';
import { ProductsComponent } from './Products/Products.component';
import { ImporterComponent } from './pages/roles/importer/importer.component';
import { GrowerComponent } from './pages/roles/grower/grower.component';
import { ConsumerComponent} from './pages/roles/consumer/consumer.component'; 

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		{ path: 'ProductionLot', component: ProductionLotComponent},
		{ path: 'Contract', component: ContractComponent},
		{ path: 'Batch', component: BatchComponent},
    { path: 'Products', component: ProductsComponent},
    { path: 'roles/importer', component: ImporterComponent},
    { path: 'roles/grower', component: GrowerComponent},
    { path: 'roles/consumer', component: ConsumerComponent},
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
