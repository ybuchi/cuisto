class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :ingredient_name, :ingredient_type

  has_many :pantry_ingredients
end
