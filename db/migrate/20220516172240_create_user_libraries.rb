class CreateUserLibraries < ActiveRecord::Migration[6.1]
  def change
    create_table :user_libraries do |t|
      t.integer :user_id
      t.integer :recipe_id

      t.timestamps
    end
  end
end
