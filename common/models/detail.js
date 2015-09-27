module.exports = function(Detail) {

    /**
     * Find latest update (date) and filter results by it.
     * @param cb
     * @param err
     * @param results
     * @returns {*}
     * @private
     */
    function _latest(cb, err, results) {
        if (results.length) {
            //get all the dates
            var dates = results.map(function(x) {
                return x.date;
            });
            //get the max date
            var maxDate = new Date(Math.max.apply(null, dates));
            //get the latest details
            var latest = results.filter(function(r) {
                return +r.date === +maxDate;
            });
            return cb(err, latest);
        }
        cb(err, {});
    }

    /**
     * Get latest details by player id
     * @param playerId
     * @param cb
     */
    Detail.latest = function(playerId, cb) {
        Detail.find({where: {playerId: playerId}}, _latest.bind(null, cb));
    };

    /**
     * Get latest details for all players
     * @param cb
     */
    Detail.latestAll = function(cb) {
        Detail.find(null, _latest.bind(null, cb));
    };

    Detail.remoteMethod(
        'latest',
        {
            accepts: {arg: 'playerId', type: 'number'},
            returns: {arg: 'latest', type: 'object'},
            http: {path: '/latest/:playerId', verb: 'get'}
        }
    );

    Detail.remoteMethod(
        'latestAll',
        {
            returns: {arg: 'latest', type: 'array'},
            http: {path: '/latest/', verb: 'get'}
        }
    );
};
