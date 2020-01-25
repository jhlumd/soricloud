export const fetchUser = id =>
  $.ajax({
    method: "GET",
    url: `/api/users/${id}`
  });

export const updateUser = (formData, userId) =>
  $.ajax({
    method: "PATCH",
    url: `/api/users/${userId}`,
    data: formData,
    contentType: false,
    processData: false
  });
