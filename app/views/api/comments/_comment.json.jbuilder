json.extract! comment, :id, :body, :track_time, :created_at, :username, :user_id, :track_id, :parent_cmt_id
if comment.user.photo.attached? 
  json.photoUrl url_for(comment.user.photo)
else
  json.photoUrl image_url('default-photo.png')
end
json.childComments comment.child_comments.pluck(:id)
