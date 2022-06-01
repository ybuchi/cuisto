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

      recipe_ing_to_destroy = RecipeIngredient.where(recipe_id: @recipe.id)

      if @recipe.ingredients.count > 0
        @recipe.ingredients.each do |ing|
          recipe_ingredient = RecipeIngredient.find_by(recipe_id: @recipe.id, ingredient_id: ing.id)
          recipe_ingredient.destroy
        end
      end


      params[:ingredients].each do |ing_obj|
        newIngredient = Ingredient.create!(ingredient_name: ing_obj[:ingredient_name], ingredient_type: ing_obj[:ingredient_type])
        puts "Ingredient #{ing_obj[:ingredient_name]} created!"
        newRecipeIngredient = RecipeIngredient.create!(ingredient_id: newIngredient.id, recipe_id: @recipe.id, amount: ing_obj[:amount].to_f, metric: ing_obj[:metric])
        puts "New Recipe Ingredient created!"
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
