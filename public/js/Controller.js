var Controller = (function () {
  var buildCloudUsername = function (user) {
    var self = this;
    var li = $('<li/>');
    var a = $('<a/>');
    a.attr('href', '#');
    a.attr('data-username', user.username);
    a.on('click', function (e) {
      e.preventDefault();
      self.onUsernameClicked(this);
    });
    // var avatar = $('<img/>');
    // avatar.attr('src', user.img);
    // a.append(avatar);
    a.append(user.username);
    li.append(a);
    return li;
  };

  var renderUsernameCloud = function (users) {
    var self = this;
    $('#user-cloud').html('');
    users.forEach(function (user) {
      var li = buildCloudUsername.call(self, user);
      $('#user-cloud').append(li);
    });
  };

  var renderUserRing = function (left, right) {
    var r = $('#ring');
    console.log(left);
    $('li', r).each(function (idx, statLi) {
      var stat = $(statLi).attr('data-stat');
      $('.izquierda', statLi).html(left.stats[stat]);
      $('.derecha', statLi).html((undefined != right) ? right.stats[stat] : '');
    });
    $('img.izquierda').attr('src', left.img);
    $('h2.izquierda').html(left.username);
    left.kcys.forEach(function (kcy) {
      $('.kcys.izquierda').append('<li><a href="' + kcy.shorturl + '">' + kcy.title + '</a></li>');
    });

    if (undefined != right) {
      $('img.derecha').attr('src', right.img);
      $('h2.derecha').html(right.username);
      right.kcys.forEach(function (kcy) {
        $('.kcys.derecha').append('<li><a href="' + kcy.shorturl + '">' + kcy.title + '</a></li>');
      });
    }
  };

  var renderUserOnRight = function (user) {
    console.log(user);
  };

  return function (client) {
    var self, left, right, users;
    self = this;
    users = {};

    client.bind('ranking-received', function (args) {
      renderUsernameCloud.apply(self, [args]);
    });

    client.bind('user-received', function (args) {
      var user = args[0];
      users[user.username] = user;
      self.augmentWithDomains(user);
    });

    client.bind('domains-received', function (args) {
      var username, domains, user;
      username = args[0];
      domains = args[1];
      users[username].domains = domains;
      user = users[username];
      self.augmentWithCircle(user);
    });

    client.bind('circle-received', function (args) {
      var username, circle, user;
      username = args[0];
      circle = args[1];
      users[username].circle = circle;
      user = users[username];
      if (undefined == left)
        left = user;
      else
        right = user;
      renderUserRing.call(self, left, right);
    });

    this.loadRankingUsers = function () {
      client.queryRanking();
    };

    this.onUsernameClicked = function (a) {
      var username = $(a).attr('data-username');
      this.loadUsername(username);
    };

    this.loadUsername = function (username) {
      client.queryUser(username);
    };

    this.augmentWithDomains = function (user) {
      client.queryDomainsOf(user.username);
    };

    this.augmentWithCircle = function (user) {
      client.queryCircleOf(user.username);
    };
  };
}());