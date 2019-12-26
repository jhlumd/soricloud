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

class Track < ApplicationRecord
  validates :title, presence: true
  validate :ensure_audio_file

  has_one_attached :photo
  has_one_attached :audio_file

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'User'

  def ensure_audio_file
    unless self.audio_file.attached?
      errors[:audio_file] << "must be attached"
    end
  end
end
