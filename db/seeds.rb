# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Harvesting Ingredients..."
Ingredient.create!(ingredient_name: "basmati rice", ingredient_type: "pasta, rice, and pulses", metric: "cup")
puts "Ingredients harvested!"

puts "Creating Cuistos..."
User.create!(first_name: "Bob", last_name: "Charonne", email: "b.charonne@wikiwiki.com", username: "bchar", password: "password", birthday: "1995-08-14", bio: "I love to cook!")
puts "Cuistos are ready to cook!"

puts "Creating Pantries for food storage..."
Pantry.create!(pantry_name: "Bob's Pantry", pantry_description: "Bob's Pantry!", is_shared: false)
puts "Pantry created!"

puts "Relating Ingredients to Pantries..."
PantryIngredient.create!(ingredient_id: 1, pantry_id: 1)
puts "Pantries are filled with food :)"

puts "Creating Recipes..."
Recipe.create!(recipe_name: "Recipe 1", cuisine: "Indian", steps: "-Boil the water. -Boil rice for 20min. -Enjoy!", diet: "vegetarian", time_to_cook_min: 120, author: 1, privacy: "private", rating: 8)
puts "Created Recipes"

puts "Relating Ingredients to Recipes..."
RecipeIngredient.create!(ingredient_id: 1, recipe_id: 1, amount: 2)
puts "Recipes are now dynamic!"

puts "Relating Recipes to Users..."
UserLibrary.create!(user_id: 1, recipe_id: 1)
puts "User's recipe library now populated"

puts "Relating Pantries to Users..."
UserPantry.create!(user_id: 1, pantry_id: 1)
puts "Pantries now belong to Cuistos!"






