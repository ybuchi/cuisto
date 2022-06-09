class PantryIngredientsController < ApplicationController
    before_action :find_pantry, only: [:show, :destroy, :update]
    
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

    def update
        related_ingredient = Ingredient.find_by(ingredient_name: params[:ingredient_name], ingredient_type: params[:ingredient_type])
        #If the ingredient_name and ingredient_type params represent an ingredient that already exsists, link that ingredient to the pantry 
        if related_ingredient != nil && related_ingredient.id != @pantryIngredient.ingredient_id
            #Link the ingredient to the pantry
            ingredient_id = Ingredient.find_by(ingredient_name: params[:ingredient_name], ingredient_type: params[:ingredient_type]).id

            #You only need o update the pantryIngredient
            @pantryIngredient.update!(ingredient_id: ingredient_id)
        
        #If the base Ingredient is still the same, you only need to update the pantry ingredient
        elsif related_ingredient != nil && Ingredient.find_by(ingredient_name: params[:ingredient_name], ingredient_type: params[:ingredient_type]).id == @pantryIngredient.ingredient_id
            @pantryIngredient.update!(amount: params[:amount], metric: params[:metric])
        
        #If the base Ingredient does not yet exists according to the params, create a new ingredient and link it
        else 
            Ingredient.create!(ingredient_name: params[:ingredient_name], ingredient_type: params[:ingredient_type])
            @pantryIngredient.update!(amount: params[:amount], metric: params[:metric])
        end

        # @pantryIngredient.update!(amount: params[:amount], metric: params[:metric], needs_restock: params[:needs_restock])
        render json: @pantryIngredient
    end

    def destroy
        @pantryIngredient.destroy
        head :no_content
    end

    private
    def find_pantry
        @pantryIngredient = PantryIngredient.find_by(id: params[:id])
    end
    def pantry_ingredient_params
        params.permit(:pantry_id, :ingredient_id, :amount)
    end
    
end
