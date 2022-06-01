class UserLibrariesController < ApplicationController
    def update
        @recipe = UserLibrary.find_by(recipe_id: params[:id])
        @user = User.find_by(id: session[:user_id])
        @recipe.update!(times_cooked: @recipe.times_cooked + params[:times_cooked]) 
        @user.update!(recipes_cooked: @user.recipes_cooked + params[:recipes_cooked])

        render json: @recipe
    end
end
