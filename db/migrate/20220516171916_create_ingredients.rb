class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :ingredient_name
      t.string :ingredient_type
      t.integer :metric

      t.timestamps
    end
  end
end
