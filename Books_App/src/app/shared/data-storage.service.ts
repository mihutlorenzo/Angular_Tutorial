import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {

    }

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-2e17b.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get('https://ng-recipe-book-2e17b.firebaseio.com/recipes.json')
            .pipe(map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    // tslint:disable-next-line:prefer-const
                    for (let recipe of recipes) {
                        // tslint:disable-next-line:no-string-literal
                        if (!recipe['ingredients']) {
                            // tslint:disable-next-line:no-string-literal
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
