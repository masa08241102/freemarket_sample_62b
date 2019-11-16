class CreateSnsAuthentications < ActiveRecord::Migration[5.2]
  def change
    create_table :sns_authentications do |t|
      t.references :user, null: false, foreign_key: true
      t.string :provider, null: false
      t.string :uid, null: false
      t.timestamps
    end
  end
end
