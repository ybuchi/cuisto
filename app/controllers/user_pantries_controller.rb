class UserPantriesController < ApplicationController
    before_action :find_user_pantry, only: [:handle_activate_pantry]
    before_action :find_current_user, only: [:handle_activate_pantry]

    def handle_activate_pantry
        current_user_pantries = @user.pantries
        @user_pantry.update!(active: !@user_pantry.active)
        pantry_to_render = Pantry.find_by(id: @user_pantry.pantry_id)
        # We want to return all of the user's pantries to make it easier to set state in the front-end
        render json: pantry_to_render, status: 202
    end

    private

    def find_user_pantry
        @user_pantry = UserPantry.find_by(id: params[:id])
    end

    def find_current_user
        @user = User.find_by(id: session[:user_id])
    end
end
