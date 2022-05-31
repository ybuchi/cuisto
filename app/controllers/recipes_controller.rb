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
      @recipe.update!(recipe_name: params[:recipe_name], cuisine: params[:cuisine], steps: params[:steps], diet: params[:diet], time_to_cook_min: params[:time_to_cook_min], description: params[:description], image: params[:image], visibility: params[:visibility], lactose_free: params[:lactose_free], peanut_free: params[:peanut_free], gluten_Free: params[:gluten_Free])
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
