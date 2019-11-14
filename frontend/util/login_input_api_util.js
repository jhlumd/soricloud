export const checkLoginInput = loginInput => (
    $.ajax({
        method: 'GET',
        url: '/api/users/check_email',
        data: { loginInput }
    })
);
