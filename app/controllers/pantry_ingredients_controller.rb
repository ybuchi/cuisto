class PantryIngredientsController < ApplicationController

    def index
        all_pantry_ingredients = PantryIngredient.all
        render json: all_pantry_ingredients
    end
    def show
        render json: @pantryIngredient
    end

    def create
        newPantryIngredient = PantryIngredient.create!(pantry_ingredient_params)
        render json: newPantryIngredient
    end

    private
    def find_pantry
        @pantryIngredient = PantryIngredient.find_by(id: params[:id])
    end
    def pantry_ingredient_params
        params.permit(:pantry_id, :ingredient_id, :amount)
    end
    
end
