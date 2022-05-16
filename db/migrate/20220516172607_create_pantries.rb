class CreatePantries < ActiveRecord::Migration[6.1]
  def change
    create_table :pantries do |t|
      t.string :pantry_name
      t.string :pantry_description
      t.boolean :is_shared

      t.timestamps
    end
  end
end
