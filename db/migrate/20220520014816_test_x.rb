class TestX < ActiveRecord::Migration[6.1]
  def change
    drop_table :recipes 

    create_table :recipes do |t|
    t.string :recipe_name
    t.string :cuisine
    t.string :steps, array: true, default: []
    t.string :diet
    t.integer :time_to_cook_min
    t.integer :author
    t.string :privacy
    t.float :rating
    t.datetime :created_at, precision: 6, null: false
    t.datetime :updated_at, precision: 6, null: false
    t.string :description
    t.string :image
    end
    
    add_index :recipes, :steps, using: 'gin'
  end
end
