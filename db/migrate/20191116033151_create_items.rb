class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.references :user, foreign_key: true
      t.string :name, null: false
      t.text :body, null: false
      t.integer :price, null: false
      t.integer :status, null: false
      t.integer :order_status, null: false
      t.string :prefecture
      t.string :method
      t.string :cost_burden, null: false
      t.string :period_before_shipping, null: false
      t.integer :prefecture_id
      t.string :city
      t.timestamps
    end
  end
end