class CreatePantryIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :pantry_ingredients do |t|
      t.integer :ingredient_id
      t.integer :pantry_id

      t.timestamps
    end
  end
end
