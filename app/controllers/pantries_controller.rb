class PantriesController < ApplicationController
    before_action :find_pantry, only: [:show, :show_pantry_ingredients]
    def show
        render json: @pantry
    end
    def show_pantry_ingredients
        render json: @pantry.ingredients
    end
    private
    def find_pantry
        @pantry = Pantry.find_by(id: params[:id])
    end
end
