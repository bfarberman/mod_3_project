class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :username
      t.integer :score
      t.integer :card_set_id

      t.timestamps
    end
  end
end
