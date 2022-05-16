class ChangeMetricFromIntegerToString < ActiveRecord::Migration[6.1]
  def change
    change_column :ingredients, :metric, :string
  end
end
