class UsersController < ApplicationController
    skip_before_action :authorize, only: [:index]
    
    def index
        users = User.all
        render json: users
    end
end
