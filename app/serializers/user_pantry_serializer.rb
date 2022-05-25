class UserPantrySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :pantry_id, :active
end
