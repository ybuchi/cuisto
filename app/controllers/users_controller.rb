class UsersController < ApplicationController
    before_action :find_user, only: [:show]
    skip_before_action :authorize, only: [:index, :create, :show]
    
    def index
        users = User.all
        render json: users
    end
    
    def show
        render json: @user
    end

    def create
        user = User.create!(user_params)
        # login after creation
        session[:user_id] =  user.id
        render json: user, status: :created
    end

    def store_recipe
        #Create new Recipe and UserRecipe instances of the recipe
        newRecipe = Recipe.create!(recipe_params)
        newUserRecipe = UserLibrary.create!(user_id: session[:user_id], recipe_id: newRecipe.id)
        render json: newUserRecipe.recipe
    end
    
    def create_new_pantry
        newPantry = Pantry.create!(pantry_params)
        newUserPantry = UserPantry.create!(user_id: session[:user_id], pantry_id: newPantry.id)
        render json: newUserPantry.pantry
    end
    def show_recipe_library
        current_user = User.find_by(id: session[:user_id])
        render json: current_user.recipes
    end

    def show_user_pantries
        current_user = User.find_by(id: session[:user_id])
        render json: current_user.pantries
    end

    private

    def find_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :password, :password_confirmation, :first_name, :last_name, :birthday, :new_username, :new_password, :created_at, :email)
    #can a user assign their own default club id?
    end
    def recipe_params
        params.permit(:recipe_name, :cuisine, :time_to_cook_min, :diet, :description, :image, :steps)
    end
    def pantry_params
        params.permit(:pantry_name, :pantry_description, :image, :created_at, :updated_at)
    end
end
