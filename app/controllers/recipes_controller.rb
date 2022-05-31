class RecipesController < ApplicationController
    before_action :find_recipe, only: [:show, :show_recipe_ingredients, :destroy, :update]
    before_action :find_user, only: [:destroy]

    def show
      render json: @recipe
    end

    def show_public_recipes
      public_recipes = Recipe.where(visibility: "Public")
      render json: public_recipes
    end

    def show_recipe_ingredients
      render json: @recipe.ingredients
    end

    def update 
      updated_recipe = @recipe.update!(recipe_name: params[:recipe_name], cuisine: params[:cuisine], steps: params[:steps], diet: params[:diet], time_to_cook_min: params[:time_to_cook_min], description: params[:description], image: params[:image], visibility: params[:visibility], lactose_free: params[:lactose_free], peanut_free: params[:peanut_free], gluten_Free: params[:gluten_Free])
      updated_user_recipe = UserLibrary.find_by(user_id: session[:user_id], recipe_id: @recipe.id)

      params[:ingredients].each do |ing_obj|
        #Change this so that we first verify if ingredients exists
        ingredientToUpdate = Ingredient.find_by(id: ing_obj[:id])
        recipeIngredientToUpdate = RecipeIngredient.find_by(recipe_id: ing_obj[:id], recipe_id: @recipe.id)
        newRecipeIngredient = recipeIngredientToUpdate.update!(amount: ing_obj[:amount].to_f, metric: ing_obj[:metric])
        puts "New Recipe Ingredient updated!"
      end
      render json: @recipe;
    end

    def destroy
      recipe_to_destroy = Recipe.find_by(id: params[:id])
      if @user.username == recipe_to_destroy.author
        recipe_to_destroy.destroy
        render json: recipe_to_destroy, status: 200
      else
        render json: {error: "Not Authorized"}, status: 401
      end
    end

    private

    def find_recipe
        @recipe = Recipe.find_by(id: params[:id])
    end
    def find_user
        @user = User.find_by(id: session[:user_id])
    end

end
