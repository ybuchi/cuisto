class FixArrayInStepsRecipe < ActiveRecord::Migration[6.1]
  def change
    change_column :recipes, :steps, :text, array: true, default: []
  end
end
