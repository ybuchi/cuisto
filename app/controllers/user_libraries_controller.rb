class UserLibrariesController < ApplicationController
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
end
