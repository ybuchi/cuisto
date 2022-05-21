class RecipesController < ApplicationController
    before_action :find_recipe, only: [:show, :show_recipe_ingredients]

    def show
      render json: @recipe
    end

    def show_recipe_ingredients
      render json: @recipe.ingredients
    end

    private

    def find_recipe
        @recipe = Recipe.find_by(id: params[:id])
    end
end
