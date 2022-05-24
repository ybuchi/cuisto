class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :recipe_name, :cuisine, :steps, :diet, :time_to_cook_min, :author, :privacy, :rating, :favorite, :gluten_Free, :peanut_free, :lactose_free, :visibility, :created_at, :updated_at
  
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  
end
