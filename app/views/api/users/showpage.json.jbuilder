json.user do 
  json.partial! '/api/users/user', user: @user
  json.tracks @user.tracks.pluck(:id)
end

json.tracks do
  json.array! @user.tracks.each do |track|
    json.partial! '/api/tracks/track', track: track
    json.extract! track.user, :username
  end
end
