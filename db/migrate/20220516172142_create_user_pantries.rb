class CreateUserPantries < ActiveRecord::Migration[6.1]
  def change
    create_table :user_pantries do |t|
      t.integer :user_id
      t.integer :pantry_id

      t.timestamps
    end
  end
end
