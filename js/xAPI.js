var home = "https://www.mcafee.com/us/"
var mod = "vsko_2018_1";
var activityID = home + mod;

// Test Site only
var profileIdLeaderboard = "VSKOLeaderboard";
var profileIdUserPerformance = "testVSKOUserPerformance";

// Production Site
//var profileIdLeaderboard = "VSKOLeaderboard";
//var profileIdUserPerformance = "VSKOUserPerformance";

var userAccount = null;
var tmpObj = null;
var endpoint = 'https://saas.learninglocker.net/data/xAPI/';
var username = '9c3651b6ad8ee3bf26aacefda645c1f2f00ccbdd';
var password = '28cd6aee7c2a018fcef893540ae0a787ce84795d';
var basicAuth = "OWMzNjUxYjZhZDhlZTNiZjI2YWFjZWZkYTY0NWMxZjJmMDBjY2JkZDoyOGNkNmFlZTdjMmEwMThmY2VmODkzNTQwYWUwYTc4N2NlODQ3OTVk";
var newUser = false;
var existingLeaderboard = false;
//var aryLeaderboard = new Array();

var usersForLeaderboardAry = new Array();