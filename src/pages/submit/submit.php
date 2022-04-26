<?php 
  $host_name = 'db5005827079.hosting-data.io';
  $database = 'dbs4888603';
  $user_name = 'dbu1597698';
  $password = 'Wj@t7iKsWraiw@9';

  $link = new mysqli($host_name, $user_name, $password, $database);
  if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
  }
    $email  = $_POST['email'];
    $wallet  = $_POST['wallet'];
    $title  = $_POST['designTitle'];
    $ipfs  = $_POST['ipfs'];
    $manufacturer  = $_POST['manufacturer_r'];
    $itemID = $_POST['itemID'];
    $royalty  = $_POST['royalty'];
    //$stmt = "INSERT INTO Submissions(`email`, `wallet`, `title`, `ipfs`, `manufacturer`, `itemID`, `royalty`) VALUES ( $email, $wallet, $title, $ipfs, $manufacturer, $itemID, $royalty);";
  
    if($link->connect_error){
		echo "$link->connect_error";
		die("Connection Failed : ". $link->connect_error);
	} else {
		$stmt = $link->prepare("insert into Submissions(`email`, `wallet`, `title`, `ipfs`, `manufacturer`, `itemID`, `royalty`) values(?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssssiii", $email, $wallet, $title, $ipfs, $manufacturer, $itemID, $royalty);
		$execval = $stmt->execute();
      	echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$link->close();
	}
?>