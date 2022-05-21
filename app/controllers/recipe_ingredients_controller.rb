class RecipeIngredientsController < ApplicationController
    before_action 
    def show
        render json: @recipeIngredient
    end
    def create
        newRecipeIngredient = RecipeIngredient.create!(recipe_ingredient_params)
        render json: newRecipeIngredient
    end

    private
    def find_recipe_ingredient
        @recipeIngredient = RecipeIngredient.find_by(id: params[:id])
    end

end
