class PantriesController < ApplicationController
    before_action :find_pantry, only: [:show, :show_pantry_ingredients, :create_new_pantry_ingredient, :destroy]
    def show
        render json: @pantry
    end
    def show_pantry_ingredients
        render json: @pantry.ingredients
    end

    def destroy
        
        @pantry.destroy
        render json: @pantry

    end

    def create_new_pantry_ingredient

        newIngredient = Ingredient.create!(ingredient_name: params[:ingredient_name], ingredient_type: params[:ingredient_type])
        puts "Ingredient Created!"
        newPantryIngredient = PantryIngredient.create!(ingredient_id: newIngredient.id, pantry_id: params[:id] , amount: params[:amount], metric: params[:metric])
        puts "New Ingredient added itself to the Pantry!"
        render json: @pantry.ingredients, status: :accepted
    end

    private
    def find_pantry
        @pantry = Pantry.find_by(id: params[:id])
    end
end
