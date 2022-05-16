class UserPantry < ApplicationRecord
    belongs_to :user
    belongs_to :pantry
end
