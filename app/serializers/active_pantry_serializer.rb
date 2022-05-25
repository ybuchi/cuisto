class ActivePantrySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :pantry_id, :active

  belongs_to :pantry
end
