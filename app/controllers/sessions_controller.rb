class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create, :show, :destroy]

    def show
        current_user = User.find(session[:user_id])
        if current_user
            render json: current_user
        else
            render json: { error: "No user logged in" }, status: :unauthorized
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: {login: "Invalid Username or Password"}}, status: :unauthorized
        end
    end
    
    def destroy
        session.delete :user_id
      end
end
