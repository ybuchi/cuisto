class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :recipe_name
      t.string :cuisine
      t.string :steps
      t.string :diet
      t.integer :time_to_cook_min
      t.integer :author
      t.string :privacy
      t.float :rating

      t.timestamps
    end
  end
end
