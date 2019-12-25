# == Schema Information
#
# Table name: tracks
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  private     :boolean          default(FALSE)
#  user_id     :integer          not null
#  genre       :string
#  description :string
#  tags        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class TrackTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
