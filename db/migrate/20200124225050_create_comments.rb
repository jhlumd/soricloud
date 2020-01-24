class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.integer :user_id, null: false
      t.integer :track_id, null: false
      t.integer :parent_cmt_id
      t.string :track_time

      t.timestamps
    end

    add_index :comments, :user_id
    add_index :comments, :track_id
    add_index :comments, :parent_cmt_id
  end
end
