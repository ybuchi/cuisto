class UserLibrariesController < ApplicationController
    skip_before_action :authorize, only: [:remove_from_library]

    def update
        @recipe = UserLibrary.find_by(recipe_id: params[:id])
        @user = User.find_by(id: session[:user_id])
        @recipe.update!(times_cooked: @recipe.times_cooked + params[:times_cooked]) 
        @user.update!(recipes_cooked: @user.recipes_cooked + params[:recipes_cooked])

        render json: @recipe
    end

    def create
        current_user = User.find_by(id: session[:user_id])
        userRecipe = UserLibrary.create!(user_id: current_user.id, recipe_id: params[:recipe_id])
        render json: userRecipe
    end

    def remove_from_library
        user_recipe_to_remove = UserLibrary.find_by(recipe_id: params[:id])
        user_recipe_to_remove.destroy

        render json: user_recipe_to_remove
    end
end
