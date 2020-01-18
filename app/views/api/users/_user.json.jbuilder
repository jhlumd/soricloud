json.extract! user, :id, :username, :email
if user.photo.attached? 
  json.photoUrl url_for(user.photo)
else
  json.photoUrl image_url('default-photo.png')
end
