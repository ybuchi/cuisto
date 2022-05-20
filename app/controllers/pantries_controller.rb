class PantriesController < ApplicationController
    before_action :find_pantry, only: [:show]
    def show
        render json: @pantry
    end
    private
    def find_pantry
        @pantry = Pantry.find_by(id: params[:id])
    end
end
