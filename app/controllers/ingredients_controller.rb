class IngredientsController < ApplicationController
    def create
        newIngredient = Ingredient.create!(ingredient_params)
        render json: newIngredient
    end

    private
    def ingredient_params
        params.permit(:ingredient_name, :ingredient_type)
    end
end
