json.extract! track, :id, :title, :private, :user_id, :genre, :description, :tags, :created_at
json.trackUrl url_for(track.audio_file)
if track.photo.attached? 
  json.photoUrl url_for(track.photo)
else
  json.photoUrl image_url('default-photo.png')
end

# json.comments track.comments.where(parent_cmt_id: nil).pluck(:id)