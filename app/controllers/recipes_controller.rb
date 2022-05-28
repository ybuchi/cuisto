class RecipesController < ApplicationController
    before_action :find_recipe, only: [:show, :show_recipe_ingredients, :destroy]
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
