class PantryIngredientSerializer < ActiveModel::Serializer
  attributes :id, :ingredient_id, :pantry_id, :amount, :metric
end
