<?php
header('Content-type:application/json');
require '../vendor/autoload.php';
use Pbc\Premailer;
use phpmailer\PHPMailerAutoload;
if(!defined('IS_LOCAL'))   define('IS_LOCAL',$_SERVER['HTTP_HOST']=='localhost');
if(IS_LOCAL)
	$_ENV = json_decode(file_get_contents('../env.json'),true);

$adminEmail = $_ENV['ADMIN_EMAIL'];
$adminName = $_ENV['ADMIN_NAME'];
$adminReply = $_ENV['ADMIN_REPLY'];
$clientId = $_ENV['CLIENT_ID'];
$clientSecret = $_ENV['CLIENT_SECRET'];
$refreshToken = $_ENV['CLIENT_TOKEN'];

$mail = new PHPMailerOAuth;
$mail->IsSMTP(); // enable SMTP
$mail->Host = "smtp.gmail.com";
$mail->Port = 587; // or 465
$mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'tls'; // Set the encryption system to use - ssl (deprecated) or tls
$mail->AuthType = 'XOAUTH2';
$mail->oauthUserEmail = $adminEmail;
$mail->oauthClientId = $clientId;
$mail->oauthClientSecret = $clientSecret;
$mail->oauthRefreshToken = $refreshToken;

$mail->IsHTML(true);
$mail->setFrom($adminEmail, $adminName);


function template($file, $vars=array()) {
    if(file_exists($file)){
        // Make variables from the array easily accessible in the view
        extract($vars);
        // Start collecting output in a buffer
        ob_start();
        require($file);
        // Get the contents of the buffer
        $applied_template = ob_get_contents();
        // Flush the buffer
        ob_end_clean();
        return $applied_template;
    }
}
//Client Order Details
$clientName = $_POST['name'];
$clientEmail = $_POST['email'];
$ref_no = "13245";
$date =  date("F d, Y",time());
$address = explode(';',$_POST['address']);
$address_1 = $address[0];
$address_2 = $address[1];
$address_3 = $address[2];

// Build Order Summary Table
$order = $_POST['orderSummary'];
$order_summary  = "";
$total = "";
setlocale(LC_MONETARY, 'en_US');
foreach($order as $O){
	if(isset($O['itemCode'])){
		$Name = $O['name'];
		$Price = $O['price'];
		$Qty = $O['quantity'];
		$Amt = money_format('%0.2n', $O['amount']);
		$order_summary.="<tr>";
		$order_summary.="<td>$Name</td>";
		$order_summary.="<td>$Price</td>";
		$order_summary.="<td>$Qty</td>";
		$order_summary.="<td>$Amt</td>";
		$order_summary.="</tr>";
	}else{
		$total = $O['total'];
	}
}

//Email template
$vars = array(
	'client'=>$clientName,
	'email'=>$clientEmail,
	'ref_no'=>$ref_no,
	'date'=>$date,
	'address'=>implode(', ',array($address_1,$address_2,$address_3)),
	'total'=>money_format('%0.2n',$total),
	'order_summary'=>$order_summary
);
$clientBody = template('template/client-order-placement.php', $vars);
$adminBody = template('template/admin-order-placement.php',$vars);
$clientPre = Premailer::html($clientBody);
$adminPre = Premailer::html($adminBody);
$log = array();
$mail->AddEmbeddedImage('template/img/logo.png', 'logo');
$mail->AddAddress($clientEmail,$clientName);
$mail->AddReplyTo($adminReply,$adminName);
$mail->Subject = "Order confirmation";
$mail->Body = $clientPre['html'];
$mail->AltBody = $clientPre['plain'];

if (!$mail->send()) {
	$log['client']=$mail->ErrorInfo;
} else {
   $log['client']=  "Client Message sent!";
}

$mail->ClearAllRecipients();
$mail->AddAddress($adminEmail,$adminName);
$mail->Subject = "Order from $clientName ($clientEmail)";
$mail->Body = $adminPre['html'];
$mail->AltBody = $adminPre['plain'];

if (!$mail->send()) {
	$log['admin']=$mail->ErrorInfo;
} else {
   $log['admin']=  "Admin Message sent!";
}
echo json_encode($log);
return;