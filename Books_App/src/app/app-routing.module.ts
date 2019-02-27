import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { Routes, RouterModule, Router, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    { path: 'shopping-list', component: ShoppingListComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
