# == Schema Information
#
# Table name: comments
#
#  id            :bigint           not null, primary key
#  body          :string           not null
#  user_id       :integer          not null
#  track_id      :integer          not null
#  parent_cmt_id :integer
#  track_time    :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :track,
    primary_key: :id,
    foreign_key: :track_id,
    class_name: 'Track'
  
  belongs_to :parent_comment, optional: true,
    primary_key: :id,
    foreign_key: :parent_cmt_id,
    class_name: 'Comment'
  
  has_many :child_comments, dependent: :destroy,
    primary_key: :id,
    foreign_key: :parent_cmt_id,
    class_name: 'Comment'

  def username
    self.user.username
  end
end
