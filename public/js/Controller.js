var Controller = (function () {
  var buildCloudUsername = function (user) {
    console.log(user);
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
    console.log(users);
    users.forEach(function (user) {
      var li = buildCloudUsername.call(self, user);
      $('#usernameCloud ul.usernames').append(li);
    });
  };

  var renderUserOnLeft = function (user) {
    console.log('left');
    console.log(user);
  };

  var renderUserOnRight = function (user) {
    console.log('right');
    console.log(user);
  };

  return function (client) {
    var self, left, right;
    self = this;


    client.bind('ranking-received', function (args) {
      renderUsernameCloud.apply(self, [args]);
    });

    client.bind('user-received', function (args) {
      var user = args[0];
      console.log(user);
      if (undefined == left) {
        renderUserOnLeft.apply(self, user);
        left = user;
      } else {
        renderUserOnRight.apply(self, user);
        right = user;
      }
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
    }
  };
}());