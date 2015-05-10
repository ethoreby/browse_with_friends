var activeFriends = {
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
}
var friendContainerHeight = 180;
var friendContainerWidth = 300;

var friendsContainerTemplate = '<div class="friendsContainer"></div>';

var getFriendTemplate = function(friend) {
  var imgSrc = chrome.extension.getURL('images/' + friend.img);
  var l_eyePos = 'top:' + friend.eyes.l_y + 'px; left:' + friend.eyes.l_x + 'px;';
  var r_eyePos = 'top:' + friend.eyes.r_y + 'px; left:' + friend.eyes.r_x + 'px;';

  var template =
  '<div class="friendContainer">' +
    '<div class="friendInnerContainer">' +
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
    '</div>' +
  '</div>'

  return template;
};

var friendsContainer = $(friendsContainerTemplate);
var friendsInverseContainer = $(friendsContainerTemplate);
friendsInverseContainer.addClass('friendsInverseContainer');
var keys = Object.keys(activeFriends);
var maxWidth = $(window).width();
for(var i = 0; i < keys.length; i++) {
  var name = keys[i];
  var friend = activeFriends[name];
  var template = $(getFriendTemplate(friend));
  var template2 = $(getFriendTemplate(friend));
  var workingWidth = (i + 1) * friendContainerWidth;
  if(workingWidth < maxWidth) {
    friendsContainer.append(template);
  } else if (workingWidth < maxWidth * 2) {
    friendsInverseContainer.append(template);
  }
};

$(document).ready(function() {
  $('body').append(friendsInverseContainer);
  $('body').append(friendsContainer);

  var eyes = $('.eye');
  var mouse_x;
  var mouse_y;

  var updateEye = function(index, eye) {
    eye = $(eye);
    var offset = eye.offset();
    var center_x = (offset.left) + (eye.width()/2);
    var center_y = (offset.top) + (eye.height()/2);
    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    var degree = (radians * (180 / Math.PI) * -1) + 225;
    eye.css('-webkit-transform', 'rotate(' + degree + 'deg)');
  };

  var followMouse = function(event) {
    mouse_x = event.pageX;
    mouse_y = event.pageY;
    $.each(eyes, updateEye);
  };

  var toggleVisibility = function(event, hiding, delay) {
    var modifier = hiding ? '+=' : '-=';
    var container = $(event.currentTarget).find('.friendInnerContainer').animate({
      top: modifier + friendContainerHeight
    }, delay);

    if(hiding) {
      var outerContainer = $(event.currentTarget);
      outerContainer.css('pointer-events', 'none');
      setTimeout(function() {
        $(event.currentTarget).css('pointer-events', 'all');
      }, 2800);
    }
  };
  var hideFriend = function(event) { toggleVisibility(event, true, 300); };
  var showFriend = function(event) { toggleVisibility(event, false, 2500); };

  $(document).mousemove(followMouse);
  $('.friendContainer').hover(hideFriend, showFriend);
});
