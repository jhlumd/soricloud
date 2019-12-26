export const fetchAllTracks = () =>
  $.ajax({
    method: "GET",
    url: "/api/tracks"
  });

export const fetchTrack = id =>
  $.ajax({
    method: "GET",
    url: `/api/tracks/${id}`
  });

export const uploadTrack = formData =>
  $.ajax({
    method: "POST",
    url: "/api/tracks",
    data: formData,
    contentType: false,
    processData: false
  });

export const updateTrack = formData =>
  $.ajax({
    method: "PATCH",
    url: `/api/tracks/${formData.id}`,
    data: formData,
    contentType: false,
    processData: false
  });

export const deleteTrack = id =>
  $.ajax({
    method: "DELETE",
    url: `/api/tracks/${id}`
  });
