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
    private

    def find_user
        @user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :birthday, :new_username, :new_password)
    #can a user assign their own default club id?
    end
end
