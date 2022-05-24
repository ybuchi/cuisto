class PantrySerializer < ActiveModel::Serializer
  attributes :id, :pantry_name, :pantry_description

  has_many :ingredients, through: :pantry_ingredients
  has_many :user_pantries
end
