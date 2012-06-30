var Client = (function () {
  return function (apikey, urls) {
    var client = this;

    this.queryRanking = function () {
      $.getJSON(urls.ranking + '?appkey=' + apikey, function (json) {
        client.onRankingReceived(json.data.user);
      });
    };

    this.queryUser = function (username) {
      $.getJSON(urls.user + username + '/?appkey=' + apikey, function (json) {
        client.onUserReceived(json.data.user);
      });
    };

    this.onRankingReceived = function (ranking) {
      this.trigger('ranking-received', ranking);
    };

    this.onUserReceived = function (user) {
      this.trigger('user-received', [user]);
    };
  };
}());

MicroEvent.mixin(Client);