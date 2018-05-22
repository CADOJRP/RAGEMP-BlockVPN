// Requirements
var request = require('request');



// Configuration
var ownerEmail = 'avery627@gmail.com';             // Owner Email (Required) - No account needed (Used Incase of Issues)
var kickThreshold = 0.99;        // Anything equal to or higher than this value will be kicked. (0.99 Recommended as Lowest)
var kickReason = 'We\'ve detected that you\'re using a VPN or Proxy. If you belive this is a mistake please contact the administration team.';
var printFailed = true;


// The Code
mp.events.add("playerReady", (player) => {
  var playerIP = player.ip;
  request('http://check.getipintel.net/check.php?ip=' + playerIP + '&contact=' + ownerEmail, function (error, response, body) {
    if (!error) {
      if(parseFloat(body) >= kickThreshold) {
        player.kick(kickReason);
        if(printFailed) {
          console.log('[BlockVPN][BLOCKED] ' + player.name + ' has been blocked from joining with a percent of ' + parseFloat(body));
        }
      }
    } else {
      console.log('[BlockVPN][ERROR] Web Request Error: ' + error);
      console.log('[BlockVPN][ERROR] Web Request Response: ' + response);
      console.log('[BlockVPN][ERROR] Web Request Body: ' + parseFloat(body));
    }
  });
});
