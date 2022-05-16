class Pantry < ApplicationRecord
    has_many :user_pantries
    has_many :pantry_ingredients
    
    has_many :users, through: :user_pantries
    has_many :ingredients, through: :pantry_ingredients
end
