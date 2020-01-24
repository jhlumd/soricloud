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
end
