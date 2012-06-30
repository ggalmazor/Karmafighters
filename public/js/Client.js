var Client = (function () {
  return function (apikey, urls) {
    var client = this;

    this.queryRanking = function () {
      $.getJSON(urls.ranking + '?appkey=' + apikey, function (json) {
        client.onRankingReceived(json.data.user);
      });
    };

    this.queryUser = function (username) {
      $.getJSON(urls.user + username + '/?kcy=1&appkey=' + apikey, function (json) {
        client.onUserReceived(json.data.user);
      });
    };

    this.queryDomainsOf = function (username) {
      $.getJSON(urls.domainsOf + '?u=' + username + '&appkey=' + apikey, function (json) {
        client.onDomainsReceived(username, json.data.domain);
      });
    };

    this.queryCircleOf = function (username) {
      $.getJSON(urls.circleOf + '?u=' + username + '&appkey=' + apikey, function (json) {
        client.onCircleReceived(username, json.data.circle);
      });
    };

    this.onRankingReceived = function (ranking) {
      this.trigger('ranking-received', ranking);
    };

    this.onUserReceived = function (user) {
      this.trigger('user-received', user);
    };

    this.onDomainsReceived = function (username, domains) {
      this.trigger('domains-received', [username, domains]);
    };

    this.onCircleReceived = function (username, circle) {
      this.trigger('circle-received', [username, circle]);
    };
  };
}());

MicroEvent.mixin(Client);