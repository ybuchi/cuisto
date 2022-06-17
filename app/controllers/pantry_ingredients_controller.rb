class PantryIngredientsController < ApplicationController
    before_action :find_pantry, only: [:show, :destroy, :update, :add_one, :remove_one, :set_restock]
    
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
        pantry_ingredient = PantryIngredient.find_by(id: params[:id])
        pantry = Pantry.find(@pantryIngredient.pantry_id)


        #Ingredient_name and ingredient_type params represent Ingredeint that already exsists, link that ingredient to the pantry 
        if related_ingredient != nil && related_ingredient.id != @pantryIngredient.ingredient_id
            puts "Case 1 hit!"
            #Link the ingredient to the pantry
            #You only need o update the pantryIngredient
            updated_ingredient = PantryIngredient.create!(ingredient_id: related_ingredient.id, pantry_id: @pantryIngredient.pantry_id, amount: params[:amount], metric: params[:metric])
            @pantryIngredient.destroy
            # render json: updated_ingredient
            render json: pantry.ingredients
        
        #If the base Ingredient is still the same, you only need to update the pantry ingredient
        elsif related_ingredient != nil && related_ingredient.id == @pantryIngredient.ingredient_id
            puts "Case 2 hit!"
            @pantryIngredient.update!(amount: params[:amount], metric: params[:metric])
            

            # render json: @pantryIngredient
            render json: pantry.ingredients
        
        #If the base Ingredient does not yet exists according to the params,
        #Destroy the link to its current Ingredient
        #Make a new link
        else
            puts "Case 3 hit!"
            #Destroy the pantry ingredient
            
            new_ingredient = Ingredient.create!(ingredient_name: params[:ingredient_name], ingredient_type: params[:ingredient_type])
            updated_ingredient = PantryIngredient.create!(ingredient_id: new_ingredient.id, pantry_id: @pantryIngredient.pantry_id, amount: params[:amount], metric: params[:metric])
            @pantryIngredient.destroy 
            
            # render json: updated_ingredient
            render json: pantry.ingredients
        end

        # # @pantryIngredient.update!(amount: params[:amount], metric: params[:metric], needs_restock: params[:needs_restock])
        # render json: @pantryIngredient
    end

    def set_restock
        @pantryIngredient.update!(needs_restock: params[:needs_restock])
        render json: @pantryIngredient
    end

    def add_one
        @pantryIngredient.update!(amount: params[:amount])
        render json: @pantryIngredient
    end
    def remove_one
        @pantryIngredient.update!(amount: params[:amount])
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
