class Recipe < ApplicationRecord
    has_many :recipe_ingredients
    has_many :user_libraries
    
    has_many :ingredients, through: :recipe_ingredients
    has_many :users, through: :user_libraries
end
