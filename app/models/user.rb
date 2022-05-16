class User < ApplicationRecord
    has_many :user_libraries
    has_many :pantries
    has_many :user_pantries
    has_many :ingredients

    has_many :recipes, through: :user_libraries
    has_many :ingredients, through: :pantries
    has_many :pantries, through: :user_pantries
end
