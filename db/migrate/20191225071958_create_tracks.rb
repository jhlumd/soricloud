class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.boolean :private, default: false
      t.integer :user_id, null: false
      t.string :genre
      t.string :description
      t.string :tags

      t.timestamps
    end

    add_index :tracks, :user_id
    add_index :tracks, :genre
  end
end
