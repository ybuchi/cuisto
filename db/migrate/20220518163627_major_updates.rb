class MajorUpdates < ActiveRecord::Migration[6.1]
  def change
    # Remove metric from ingredients table
    remove_column :ingredients, :metric

    #Remove isShared from pantries table
    remove_column :pantries, :is_shared
    add_column :pantries, :image, :string

    #Add amount to pantry_ingredients
    add_column :pantry_ingredients, :amount, :float

    #Add metric to recipe_ingredients
    add_column :recipe_ingredients, :metric, :string

    #Change steps data type from string to array
    change_column :recipes, :steps, :text, array: true, default: [], using: "(string_to_array(steps, ','))"

  end
end
