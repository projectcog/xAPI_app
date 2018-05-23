<html>
    <head>
    </head>
    <body>
        <script src="js/jquery-2.0.3.min.js"></script>
        <script src="js/base64.js"></script>
        <script src="js/leaderboard.js"></script>
        <script src="js/xAPI.js"></script>
        <script>
            var config = new Object();
            config.mod = "test_2_0";
            config.testLeaderboardID = "testLeaderboard_2_0";
            config.testUserStateID = "testUserStateID_2_0";
            config.testGenericStateID = "testGenericStateID_2_0";
            config.prodLeaderboardID = "prodLeaderboard_2_0";
            config.prodUserStateID = "prodUserStateID_2_0";
            config.prodGenericStateID = "prodGenericStateID_2_0";
            
            //console.log(leaderboard);
            /*(new xAPI()).setLeaderboard(config, leaderboard, function(data){
                //console.log(eval(data))
                console.log(data);
            });*/
            (new xAPI()).getLeaderboard(config, function(data){
                //console.log(eval(data))
                console.log(data);
            });
            //console.log(new xAPI().test("foobar", function(){return true;}));
        </script>
    </body>
</html>