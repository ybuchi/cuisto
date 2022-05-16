class User < ApplicationRecord
    has_secure_password 
    
    has_many :user_libraries
    has_many :pantries
    has_many :user_pantries

    has_many :recipes, through: :user_libraries
    has_many :ingredients, through: :pantries
    has_many :pantries, through: :user_pantries


    def User.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                      BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
      end
end
