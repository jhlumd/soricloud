export const fetchComments = trackId =>
  $.ajax({
    method: "GET",
    url: `/api/tracks/${trackId}/comments`
  });

export const createComment = comment =>
  $.ajax({
    method: "POST",
    url: "/api/comments",
    data: { comment }
  });

export const deleteComment = id =>
  $.ajax({
    method: "DELETE",
    url: `/api/comments/${id}`
  });
