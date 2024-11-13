import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { PriceCalculationComponent } from './pages/price-calculation/price-calculation.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'layout/product',
        pathMatch: 'full'
    },
  

    {
        path: 'layout',
        component: LayoutComponent,
        children: [
            {
                path:'product',
                component:ProductListComponent
            },
            {
                path:'price',
                component:PriceCalculationComponent
            }
        ]
    }

];
