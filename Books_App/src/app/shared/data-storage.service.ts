import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {

    }

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-2e17b.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.http.get('https://ng-recipe-book-2e17b.firebaseio.com/recipes.json?auth=' + token)
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
