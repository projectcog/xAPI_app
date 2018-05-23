var xAPI = (function($) {
    var config = new Object();
    var latestLeaderboard = null;
    var xAPILeaderboard = null;
    var backupLeaderboard = null;
    
    config.homePage = "https://www.mcafee.com/us/users/";
    config.home = "https://www.mcafee.com/us/";
    config.mod = "vsko_2018_1";
    config.activityID = config.home + config.mod;
    config.production = false;
    config.min = 0;
    config.max = 100;
    config.raw = 0;
    config.scaled = 0;
    
    config.testLeaderboardID = "testLeaderboard"; // can be use only for test environment leaderboard or to any data
    config.testUserStateID = "testUserStateID"; // can be use only for test environment personal/user data
    config.testGenericStateID = "testGenericStateID"; // can be use only for test environment generic data. this can also be useful in any data that needs to be in the LRS
    
    config.prodLeaderboardID = "prodLeaderboard"; // can be use only for production environment leaderboard or to any data
    config.prodUserStateID = "prodUserStateID"; // can be use only for production environment personal/user data
    config.prodGenericStateID = "prodGenericStateID"; // can be use only for test environment generic data. this can also be useful in any data that needs to be in the LRS
    
    config.leaderboard = config.production ? config.prodLeaderboardID : config.testLeaderboardID;
    config.userPerformance = config.production ? config.prodUserStateID : config.testUserStateID;
    config.database = config.production ? "production" : "test";
    config.userAccount = null;
    config.endpoint = "https://saas.learninglocker.net/data/xAPI/";
    config.username = "9c3651b6ad8ee3bf26aacefda645c1f2f00ccbdd";
    config.password = "28cd6aee7c2a018fcef893540ae0a787ce84795d";
    config.basicAuth = "OWMzNjUxYjZhZDhlZTNiZjI2YWFjZWZkYTY0NWMxZjJmMDBjY2JkZDoyOGNkNmFlZTdjMmEwMThmY2VmODkzNTQwYWUwYTc4N2NlODQ3OTVk";
    config.name = "User Name";
    config.userID = "001";
    config.region = "none";
    config.country = "none";
    config.badges = new Array();
    config.status = "unknown";
    config.response = "None";
    config.userStatement = new Object();
    config.user = new Object();
    
    function insertBackup(name, content)
    {
        return $.ajax({
			url: "https://projectcog.com/user_files/McAfee/resources/php/xAPI/php/xAPIbackup.php",
			type: "POST",
            cache: true,
            data: {name: name, database: config.database, action: "insert", content: content}
		}).promise();
    }
    function retrieveBackup(name, content)
    {
        return $.ajax({
			url: "https://projectcog.com/user_files/McAfee/resources/php/xAPI/php/xAPIbackup.php",
			type: "POST",
			cache: true,
            data: {name: name, database: config.database, action: "retrieve", content: content}
		}).promise();
    }
    function getxAPI(url)
    {
        return $.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			headers: {
				'Authorization': 'Basic ' + Base64.encode(config.username + ":" + config.password),
				'x-experience-api-version': '1.0.1',
				'content-type': 'application/json'
			}
		}).promise();
    }
    function setxAPI(url, content)
    {
        return $.ajax({
            url: url,
            type: "PUT",
            dataType: "json",
            headers: {
                'Authorization': 'Basic ' + Base64.encode(config.username + ":" + config.password),
                'x-experience-api-version': '1.0.0',
                'content-type': 'application/json'
            },
            data: content
        }).promise()
    }
    
    function xAPI(){}
    
    xAPI.prototype.configuration = function(obj){
        config = $.extend(config, obj);
        config.activityID = (config.home + config.mod);
        config.leaderboard = (config.production ? config.prodLeaderboardID : config.testLeaderboardID);
        config.userPerformance = (config.production ? config.prodUserStateID : config.testUserStateID);
        config.database = config.production ? "production" : "test";
        
        config.userStatement = {
            "actor": {
                "objectType": "Agent",
                "name": config.name,
                "account": {
                    "name": config.userID,
                    "homePage": config.homePage
                }
            },
            "verb": {
                "id": "http://adlnet.gov/expapi/verbs/" + config.status,
                "display": {
                    "en": config.status
                }
            },
            "object": {
                "objectType": "Activity",
                "id": config.activityID
            },
            "result": {
                "response": config.response,
                "score": {
                    "scaled": config.scaled,
                    "min": config.min,
                    "max": config.max,
                    "raw": config.raw
                }
            }
        };
        config.user = {
            "userPerformance": {
                "name": config.name,
                "id": config.userID,
                "region": config.region,
                "country": config.country,
                "result": {
                    "response": config.response,
                    "score": {
                        "raw": config.raw,
                        "max": config.max,
                        "scaled": config.scaled
                    }
                },
                "badge": config.badges
            }
        };
        return config;
    }
    xAPI.prototype.setUserPerformance = function(obj, userPerformance, callback, failCallback){
        var url = "";
        var xapi = this;
        xapi.configuration(obj);
        url = config.endpoint + 'activities/state?activityId=' + config.activityID + '&agent={"account": {"name": "' + config.userID + '","homePage": "https://www.mcafee.com/us/users/"}}&stateId=' + config.userPerformance;
            
        (setxAPI(url, JSON.stringify(userPerformance))).then(function(data, status, jqXHR){
            if(callback)
            {
                callback();
            }
            console.log("Getting User Performance success.");
            // Reserve code
            /*(insertBackup(config.userID, JSON.stringify(obj))).then(function(data, status, jqXHR){
                if(callback)
                {
                    callback();
                }
                console.log("Getting User Performance success.");
            },function(jqXHR, status, error) {
                console.log(jqXHR);
                console.log(status);
                console.log(error);

                console.log("Setting User Performance Backup fail.");
                //throw new Error("Error in Setting User Performance into LRS.");
            });*/
        },function(jqXHR, status, error) {
            console.log(jqXHR);
            console.log(status);
            console.log(error);
            console.log("Setting User Performance fail.");
            if(failCallback)
            {
                failCallback();
            }
            //throw new Error("Error in Setting User Performance into LRS.");
        });
    }
    xAPI.prototype.getUserPerformance = function(obj, callback, failCallback){
        var url = "";
        var xapi = this;
        xapi.configuration(obj);
        url = config.endpoint + 'activities/state?activityId=' + config.activityID + '&agent={"account": {"name": "' + config.userID + '","homePage": "https://www.mcafee.com/us/users/"}}&stateId=' + config.userPerformance;
        (getxAPI(url)).then(function(data, status, jqXHR){
            if(callback)
            {
                callback(data);
            }
            console.log("Getting User Performance success.");
        },function(jqXHR, status, error) {
            console.log(jqXHR);
            console.log(status);
            console.log(error);
            console.log("Getting User Performance fail.");
            
            if(failCallback)
            {
                failCallback();
            }
            //throw new Error("Error in Gtting User Performance into LRS.");
        });
    }
    xAPI.prototype.setLeaderboard = function(obj,leaderboard, callback, failCallback){
        var url = "";
        var xapi = this;
        xapi.configuration(obj);
        url = config.endpoint + 'activities/state?activityId=' + config.activityID + '&agent={"account":{"homePage":"http://example.com","name":"dummy"}}&stateId=' + config.leaderboard;
        console.log(config);
        console.log(leaderboard);
        (setxAPI(url, JSON.stringify(leaderboard))).then(function(data, status, jqXHR){
            (insertBackup(config.leaderboard, JSON.stringify(leaderboard))).then(function(data, status, jqXHR){
                if(callback)
                {
                    callback();
                }
                console.log("Generate new Leaderboard from backup success.");
            },function(jqXHR, status, error){
                console.log(jqXHR);
                console.log(status);
                console.log(error);
                console.log("Generate new Leaderboard from backup fail.");
            });
            console.log("Setting Leaderboard success.");
        },function(jqXHR, status, error) {
            console.log(jqXHR);
            console.log(status);
            console.log(error);
            console.log("Setting Leaderboard fail.");
            if(failCallback)
            {
                failCallback();
            }
            //throw new Error("Error in Setting Leaderboard into LRS.");
        });
    }
    xAPI.prototype.getLeaderboard = function(obj, callback, failCallback){
        var url = "";
        var xapi = this;
        xapi.configuration(obj);
        console.log(config);
        url = config.endpoint + 'activities/state?activityId=' + config.activityID + '&agent={"account":{"homePage":"http://example.com","name":"dummy"}}&stateId=' + config.leaderboard;
        (getxAPI(url)).then(function(data, status, jqXHR){
            xAPILeaderboard = data;
            (retrieveBackup(config.leaderboard, JSON.stringify(xAPILeaderboard))).then(function(data2, status2, jqXHR2){
                backupLeaderboard = JSON.parse(data2);
                
                if(JSON.stringify(xAPILeaderboard).length > JSON.stringify(backupLeaderboard).length)
                {
                    // xAPILeaderboard is updated. starting to update what's in the backup
                    console.log("xAPILeaderboard is updated");
                    (insertBackup(config.leaderboard, JSON.stringify(xAPILeaderboard))).then(function(data, status, jqXHR){
                        if(callback)
                        {
                            latestLeaderboard = xAPILeaderboard;
                            callback(xAPILeaderboard);
                        }
                        console.log("Generate new Leaderboard from backup success.");
                    },function(jqXHR, status, error){
                        console.log(jqXHR);
                        console.log(status);
                        console.log(error);
                        console.log("Generate new Leaderboard from backup fail.");
                        //throw new Error("Error in Generating new Leaderboard from backup");
                    });
                }
                else if(JSON.stringify(xAPILeaderboard.leaderboard).length < JSON.stringify(backupLeaderboard.leaderboard).length)
                {
                    var count = xAPILeaderboard.leaderboard.length;
                    var loop = 0;
                    console.log("xAPILeaderboard is outdated");
                    for(var i = 0; i < xAPILeaderboard.leaderboard.length; i++)
                    {
                        for(var j = 0; j <  backupLeaderboard.leaderboard.length; j++)
                        {
                            if(xAPILeaderboard.leaderboard[i].id == backupLeaderboard.leaderboard[j].id)
                            {
                                backupLeaderboard.leaderboard[j] = xAPILeaderboard.leaderboard[i];
                                break;
                            }
                        }
                        if(i == (xAPILeaderboard.leaderboard.length - 1))
                        {
                            latestLeaderboard = backupLeaderboard;
                            console.log(config);
                            console.log(latestLeaderboard);
                            xapi.setLeaderboard(obj, latestLeaderboard, function(){
                                callback(latestLeaderboard);
                            });
                        }
                    }
                }
                else if(JSON.stringify(xAPILeaderboard.leaderboard).length == JSON.stringify(backupLeaderboard.leaderboard).length)
                {
                    console.log("Leaderboard is updated");
                    callback(xAPILeaderboard);
                }
                console.log("Leaderboard from backup success.");
            },function(jqXHR, status, error){
                console.log(jqXHR);
                console.log(status);
                console.log(error);
                console.log("Leaderboard from backup fail.");
                //throw new Error("Error in retrieving backup Leaderboard");
            });
            console.log("Leaderboard from xAPI success.");
        },function(jqXHR, status, error){
            console.log(jqXHR);
            console.log(status);
            console.log(error);
            console.log("Leaderboard from xAPI fail.");
            
            if(failCallback)
            {
                failCallback();
            }
            //throw new Error("Error in retrieving API Leaderboard");
        });
    }
    xAPI.prototype.setStatement = function(obj, callback){
        this.configuration(obj);
        
        $.ajax({
			url: config.endpoint + "statements",
			type: "POST",
			dataType: "json",
			headers: {
				'Authorization': 'Basic ' + Base64.encode(config.username + ":" + config.password),
				'x-experience-api-version': '1.0.1',
				'content-type': 'application/json'
			},
			data: JSON.stringify(userStatement)
		}).promise().then(function(data, status, jqXHR){
            if(callback)
            {
                callback();
            }
            console.log("statement success");
            
        },function(jqXHR, status, error){
            console.log(jqXHR);
            console.log(status);
            console.log(error);
            console.log("statement fail");
            //throw new Error("Error in saving Statement");
        });
    }
    xAPI.prototype.test = function(str, callback){
        return callback ? callback() : "bar";
    }
    return xAPI;
})($);