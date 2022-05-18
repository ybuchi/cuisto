class UsersController < ApplicationController
    before_action :finde_user, only: [:show]
    skip_before_action :authorize, only: [:index]
    
    def index
        users = User.all
        render json: users
    end
    
    def show
        render json: @user
    end

    def store_recipe
        #Create new Recipe and UserRecipe instances of the recipe
        newRecipe = Recipe.create!(recipe_params)
        newUserRecipe = UserLibrary.create!(user_id: session[:user_id], recipe_id: newRecipe.id)
        render json: newUserRecipe.recipe
    end

    def show_recipe_library
        current_user = User.find_by(id: session[:user_id])
        render json: current_user.recipes
    end

    private

    def find_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :birthday, :new_username, :new_password)
    #can a user assign their own default club id?
    end
    def recipe_params
        params.permit(:recipe_name, :cuisine, :time_to_cook_min, :diet, :description, :image, :steps)
    end
end
