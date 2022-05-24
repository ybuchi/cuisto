class ExtraAttributesToSeveralTables < ActiveRecord::Migration[6.1]
  def change
    add_column :user_libraries, :times_cooked, :integer
    add_column :users, :recipes_cooked, :integer
    add_column :recipes, :visibility, :string
    add_column :recipes, :favorite, :boolean, default: false
    add_column :recipes, :lactose_free, :boolean, default: false
    add_column :recipes, :peanut_free, :boolean, default: false
    add_column :recipes, :gluten_Free, :boolean, default: false
    change_column :recipes, :author, :string
  end
end
