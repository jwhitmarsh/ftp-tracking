var app = require('../../server/server');

module.exports = function(Player) {

    Player.on('attached', function(obj) {
        Player.find = function(filter, cb) {
            app.models.Detail.latestAll(cb);
        }
    });

};
