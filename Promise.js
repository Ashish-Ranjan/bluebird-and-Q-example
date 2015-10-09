var Q = require('q');
var Promise = require('bluebird');
var GitHubApi = require('github');

var github = new GitHubApi({
    version: '1.0.0'
});

/**
 * using normal callback
 */

var getUserAvatarWithCallback = function (user, callback) {
    github.search.users({
        q: user
    }, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            var avatarUrl = res.items[0].avatar_url;
            callback(null, avatarUrl);
        }
    });
};

getUserAvatarWithCallback("Ashish-Ranjan", function (err, avatar) {
    if (err) {
        console.log('failed to receive Url', err);
    } else {
        console.log('got url with callback pattern', avatar);
    }
});

/**
 * using bluebird
 */

var getUserAvatarWithBluebird = function (user) {
    return new Promise(function (resolve, reject) {
        github.search.users({
            q: user
        }, function (err, res) {
            if (err) {
                reject(err);
            } else {
                var avatarUrl = res.items[0].avatar_url;
                resolve(avatarUrl);
            }
        });
    });
};

getUserAvatarWithBluebird('Ashish-Ranjan')
    .then(function (avatarURL) {
        console.log('got url with bluebird', avatarURL);
    })
    .catch(function (error) {
        console.log('failed to receive Url', error);
    });

/**
 * using Q
 */

var getUserAvatarWithQ = function (user) {
    var deferred = Q.defer();
    github.search.users({
        q: user
    }, function (err, res) {
        if (err) {
            deferred.reject(err);
        } else {
            var avatarUrl = res.items[0].avatar_url;
            deferred.resolve(avatarUrl);
        }
    });
    return deferred.promise;
};

getUserAvatarWithQ('Ashish-Ranjan')
    .then(function (avatarURL) {
        console.log('got url with bluebird', avatarURL);
    })
    .catch(function (error) {
        console.log('failed to receive Url', error);
    });
