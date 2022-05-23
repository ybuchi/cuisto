class Recipe < ApplicationRecord
    has_many :recipe_ingredients, dependent: :destroy
    has_many :user_libraries, dependent: :destroy
    
    has_many :ingredients, through: :recipe_ingredients
    has_many :users, through: :user_libraries
end
