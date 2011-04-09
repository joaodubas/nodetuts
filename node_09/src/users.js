var user_list = {
    'joaodubas': {'username': 'joaodubas', 'password': 'io020045', 'role': ['admin']}
    , 'dubas': {'username': 'dubas', 'password': 'io020045', 'role': 'publisher'}
};

module.exports.authenticate = function (user, callback) {
    var username = user.username
        , password = user.password
        , user = user_list[username]
        ;

    if (user && user.password === password) {
        callback(user);
        return;
    } else {
        callback(null);
        return;
    }
};
