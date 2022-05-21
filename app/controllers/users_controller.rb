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

    def create_new_pantry_ingredient
        newIngredient = Ingredient.create!(ingredient_name: params[:ingredient_name], ingredient_type: params[:ingredient_type])
        puts "Ingredient Created!"
        newPantryIngredient = PantryIngredient.create!(ingredient_id: newIngredient.id, pantry_id: params[:pantry_id], amount: params[:amount], metric: params[:metric])
        puts "New Ingredient added itself to the Pantry!"

        render json: newIngredient, status: :accepted
    end

    def create_new_recipe
        #First, create a new recipe and link it to user
        newRecipe = Recipe.create!(recipe_name: params[:recipe_name], cuisine: params[:cuisine], steps: params[:steps], diet: params[:diet], time_to_cook_min: params[:time_to_cook_min], author: session[:user_id], description: params[:description], image: params[:image])
        newUserRecipe = UserLibrary.create!(user_id: session[:user_id], recipe_id: newRecipe.id)

        params[:recipe_ingredients_array].each do |ing_obj|
            #Change this so that we first verify if ingredients exists
            newIngredient = Ingredient.create!(ingredient_name: ing_obj[:ingredient_name], ingredient_type: ing_obj[:ingredient_type])
            puts "Ingredient #{ing_obj[:ingredient_name]} created!"
            newRecipeIngredient = RecipeIngredient.create!(ingredient_id: newIngredient.id, recipe_id: newRecipe.id, amount: params[:amount], metric: params[:metric])
            puts "New Recipe Ingredient created!"
        end

        render json: newRecipe
        #NExt create new ingredients and link them to recipe
        
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
    def new_recipe_params
        params.permit( :recipe_name, :cuisine, :time_to_cook_min, :diet, :description, :image, :steps, :recipe_ingredients_array )
    end
end
