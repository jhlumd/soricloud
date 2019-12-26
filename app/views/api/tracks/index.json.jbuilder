json.array! @tracks do |track|
  json.extract! track, :id, :title, :user_id, :genre, :tags, :created_at
  json.trackUrl url_for(track.audio_file)
  if track.photo.attached?
    json.photoUrl url_for(track.photo)
  else
    json.photoUrl image_url('default-photo.png')
  end
end