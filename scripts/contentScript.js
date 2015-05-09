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

var friendsContainer = $(friendsContainerTemplate);
var keys = Object.keys(activeFriends);
for(var i = 0; i < keys.length; i++) {
  var name = keys[i];
  var friend = activeFriends[name];
  var template = $(getFriendTemplate(friend));
  friendsContainer.append(template);
};

$(document).ready(function() {
  $('body').append(friendsContainer);

  var eyes = $('.eye');
  var followMouse = function(index, eye){
      eye = $(eye);
      var offset = eye.offset();
      var center_x = (offset.left) + (eye.width()/2);
      var center_y = (offset.top) + (eye.height()/2);
      var mouse_x = event.pageX;
      var mouse_y = event.pageY;
      var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
      var degree = (radians * (180 / Math.PI) * -1) + 225;
      eye.css('-moz-transform', 'rotate('+degree+'deg)');
      eye.css('-webkit-transform', 'rotate('+degree+'deg)');
      eye.css('-o-transform', 'rotate('+degree+'deg)');
      eye.css('-ms-transform', 'rotate('+degree+'deg)');
    };

    var updateEyes = function(event) {
      $.each(eyes, followMouse);
    };

    $(document).mousemove(updateEyes);
});
