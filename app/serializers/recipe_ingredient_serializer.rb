class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :ingredient_id, :recipe_id, :amount, :metric
end
