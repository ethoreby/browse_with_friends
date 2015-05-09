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
  }
}

var imgSrc = chrome.extension.getURL('images/elliott.png');

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
  var newFriend = $(getFriendTemplate(activeFriends.elliott));
  $('body').append(newFriend);
});
