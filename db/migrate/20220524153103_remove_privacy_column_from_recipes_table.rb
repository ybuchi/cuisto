class RemovePrivacyColumnFromRecipesTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :recipes, :privacy
  end
end
