var activeFriends = {
  elliott: {
    eyes: {
      color: '#772222',
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
      l_x: 157,
      l_y: 63,
      r_x: 212,
      r_y: 64
    },
    height: 220,
    img: 'nic.png'
  }
}

var friendsContainerTemplate = '<div class="friendsContainer"></div>';

var getFriendTemplate = function(friend) {
  var imgSrc = chrome.extension.getURL('images/' + friend.img);
  var l_eyePos = 'top:' + friend.eyes.l_y + 'px; left:' + friend.eyes.l_x + 'px;';
  var r_eyePos = 'top:' + friend.eyes.r_y + 'px; left:' + friend.eyes.r_x + 'px;';

  var template =
  '<div class="friendContainer">' +
    '<img src="' + imgSrc + '" style="height:' + friend.height + 'px;">' +

    '<div class="eye" style="'+ l_eyePos + '">' +
      '<div class="iris" style="background-color:' + friend.eyes.color + ';">' +
        '<div class="pupil"></div>' +
      '</div>' +
    '</div>' +

    '<div class="eye" style="' + r_eyePos + '">' +
      '<div class="iris" style="background-color:' + friend.eyes.color + ';">' +
        '<div class="pupil"></div>' +
      '</div>' +
    '</div>' +
  '</div>'

  return template;
};

$(document).ready(function() {
  var friendsContainer = $(friendsContainerTemplate);
  var newFriend = $(getFriendTemplate(activeFriends.sanic));
  var newFriend2 = $(getFriendTemplate(activeFriends.elliott));
  friendsContainer.prepend(newFriend);
  friendsContainer.prepend(newFriend2);
  $('body').append(friendsContainer);
});
