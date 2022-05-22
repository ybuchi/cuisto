class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :recipe_name, :cuisine, :steps, :diet, :time_to_cook_min, :author, :privacy, :rating
  
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  
end
