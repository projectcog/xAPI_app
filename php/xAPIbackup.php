<?php
	
    /*
        xapi
        id, name, content, created_at
        id      -       Self-explanatory
        name    -       Generally this is the name for the "stateId" on some other data such as
                        Leaderboard, but not in UserPerformance. In UserPerformance config.userID
                        is used to differentiate one UserPerformance from the other UserPerformance
                        unlike Leaderboard. Leaderboard can have one "name" but can have different
                        versions.
        created_at -    Self-explanatory
    */

    if($_POST['database'] == "production")
    {
        $servername = "mysql.projectcog.com";
        $dbname = "xapi_mcafee";
        $username = "projectcog_dev";
        $password = "pr0j3ctc0gd3v";
    }
    else
    {
        $servername = "mysql.test.projectcog.com";
        $dbname = "xapi_test_mcafee";
        $username = "projectcog_dev";
        $password = "pr0j3ctc0gd3v";
    }
	
	// Create connection
	$conn = mysql_connect($servername, $username, $password) or die("cannot connect to the database");
	$db = mysql_select_db($dbname);
    $content = '';
    $addedContent = null;
    
    // Just incase there's nothing in the database or making a series of backup
    $addContent = 'INSERT INTO xapi(name, content) VALUES("' . $_POST['name'] .'", "' . addslashes($_POST['content']) . '")';
    //$addContent = 'INSERT INTO xapi(name, content) VALUES("' . $_POST['name'] .'", "{\"' . $_POST['property'] . '\": []}")';
    
    // Retrieving an existing data
    $selectID = 'SELECT * FROM xapi WHERE name="' .  $_POST["name"] . '" ORDER BY created_at DESC LIMIT 1';
	
	// Know if the user exist
	$selectedID = mysql_query( $selectID, $conn );

    if($_POST['action'] == 'retrieve')
    {
        if(mysql_num_rows($selectedID) > 0)
        {
            while($row = mysql_fetch_array($selectedID))
            {
                $content = $row['content'];
            }
        }
        else
        {
            $addedContent = mysql_query( $addContent, $conn );
            $content = $_POST['content'];
        }
    }
    else if($_POST['action'] == 'insert')
    {
        $addedContent = mysql_query( $addContent, $conn );
        $content = $_POST['content'];
    }
	
	echo stripslashes($content);
    mysql_close($conn);
?>