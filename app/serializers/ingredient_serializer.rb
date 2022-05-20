class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :ingredient_name, :ingredient_type
end
