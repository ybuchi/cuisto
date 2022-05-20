class RecipesController < ApplicationController
    before_action :find_recipe, only: [:show]

    def show
      render json: @recipe
    end

    private

    def find_recipe
        @recipe = Recipe.find_by(id: params[:id])
    end
end
