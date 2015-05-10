var friendsRoster = {
  preCreated: {
    elliott: {
      eyes: {
        color: '#8a2e00',
        l_x: 100,
        l_y: 123,
        r_x: 171,
        r_y: 125
      },
      height: 264,
      img: 'elliott.png'
    },
    sanic: {
      eyes: {
        color: '#ffffff',
        l_x: 157,
        l_y: 63,
        r_x: 212,
        r_y: 64
      },
      height: 220,
      img: 'sanic.png'
    },
    nic: {
      eyes: {
        color: '#5cb8e6',
        l_x: 127,
        l_y: 95,
        r_x: 185,
        r_y: 99
      },
      height: 234,
      img: 'nic.png'
    },
    zoidberg: {
      eyes: {
        color: '#ffffff',
        l_x: 94,
        l_y: 71,
        r_x: 149,
        r_y: 82
      },
      height: 205,
      img: 'zoidberg.png'
    },
    emma: {
      eyes: {
        color: '#531c00',
        l_x: 117,
        l_y: 110,
        r_x: 174,
        r_y: 112
      },
      height: 263,
      img: 'emma.png'
    },
    barak: {
      eyes: {
        color: '#8a2e00',
        l_x: 105,
        l_y: 112,
        r_x: 167,
        r_y: 110
      },
      height: 242,
      img: 'barak.png'
    },
    george: {
      eyes: {
        color: '#5cb8e6',
        l_x: 81,
        l_y: 97,
        r_x: 137,
        r_y: 95
      },
      height: 351,
      img: 'george.png'
    },
    sterling: {
      eyes: {
        color: '#5cb8e6',
        l_x: 118,
        l_y: 104,
        r_x: 179,
        r_y: 104
      },
      height: 310,
      img: 'sterling.png'
    }
  },
  activeFriends: {}
};

var initializeRoster = function(data) {
  if(data.createdFriends) {
    console.log(data.createdFriends);
  }
  var keys = Object.keys(friendsRoster);
  for(var i = 0; i < keys.length; i++) {
    var key = keys[i];
    writeToStorage({ key: friendsRoster[key] });
  };
};

chrome.storage.sync.get(['activeFriends', 'preCreatedFriends'], initializeRoster);

var getCheckboxTemplate = function(name) {
  var friend = friendsRoster.preCreated[name];
  var template =
  '<div class="toggleFriendCheckbox">' +
    '<span class="friendThumbnailContainer"><img src="images/' + friend.img + '"></span>' +
    '<input type="checkbox" value="'+ name + '">' +
    '<span class="label">' + name + '</span>' +
  '</div>'

  return template;
};

var buildCheckboxes = function() {
  var keys = Object.keys(friendsRoster.preCreated);
  var checkboxContainer = $('#friendCheckboxContainer');
  for(var i = 0; i < keys.length; i++) {
    var name = keys[i];
    var template = $(getCheckboxTemplate(name));
    checkboxContainer.append(template);
  }
};

var toggleFriend = function(event) {
  var context = $(this);
  if (context.is(':checked')) {
    console.log(context.val())
    friendsRoster.activeFriends[context.val()] = true;
  } else {
    delete friendsRoster.activeFriends[context.value];
  }
  writeToStorage({ activeFriends: friendsRoster.activeFriends });
}

var writeToStorage = function(item) {
  chrome.storage.sync.set(item
    // , function() {
    // chrome.storage.sync.get(['activeFriends', 'preCreatedFriends']
    // ,
    // function(data) {
    //   console.log(data);
    // });
  });
};

document.addEventListener('DOMContentLoaded', function() {
  buildCheckboxes();
  $('.toggleFriendCheckbox input').click(toggleFriend);
});
