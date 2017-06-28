<?php
header('Content-type:application/json');
require '../vendor/autoload.php';
use Mailgun\Mailgun;
use Pbc\Premailer;
use phpmailer\PHPMailerAutoload;

$redirectUri = 'http://localhost/tara/scripts/oauth.php';
$clientId = '387048371816-4up3mmigkh18g2hut3bpu3ouhdc0kh6l.apps.googleusercontent.com';
$clientSecret = 'mklHhrns6eF-qjwuiLpSB4DL';
$phpmailer = new PHPMailerOAuth();
$phpmailer->IsSMTP();
$phpmailer->SMTPDebug  = 2;
$phpmailer->Host       = "ssl://smtp.gmail.com";
$phpmailer->SMTPAuth   = true;
$phpmailer->SMTPSecure = 'ssl';
$mail->AuthType = 'XOAUTH2';
$phpmailer->Port       = 465;

$phpmailer->oauthClientId = clientId;
$phpmailer->oauthClientSecret = "***";
$phpmailer->oauthRefreshToken = "***";
$phpmailer->oauthUserEmail="***";
exit;

$mail = new PHPMailer;
$mail->IsSMTP(); // enable SMTP
$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "no-reply@ishoptara.com";
$mail->Password = "CreateYourTara";
$mail->SetFrom("no-reply@ishoptara.com");
$mail->Subject = "Test";
$mail->Body = "hello";
$mail->AddAddress("daveadev@gmail.com");

 if(!$mail->Send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
 } else {
    echo "Message has been sent";
 }
exit;

define('USE_MG',false);
if(USE_MG):
	$MG_KEY = 'key-b6ac1021af9712bed066c06fd8f1c7ca';
	$MG_DOMAIN = 'appd964bcc2465a4236b7ceb35b59daaf44.mailgun.org';
	$MG_EMAIL = 'postmaster@appd964bcc2465a4236b7ceb35b59daaf44.mailgun.org';
	$mg = Mailgun::create($MG_KEY);
endif;

$adminEmail = 'daveadev@gmail.com';
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
$client = $_POST['name'];
$clientEmail = $_POST['email'];
$po_no = "13245";
$date =  date("F d, Y",time());
$address = explode(';',$_POST['address']);
$address_1 = $address[0];
$address_2 = $address[1];
$address_3 = $address[2];

// Build Order Summary Table
$order = $_POST['orderSummary'];
$order_summary  = "";
$total = "";
foreach($order as $O){
	if(isset($O['itemCode'])){
		$Name = $O['name'];
		$Price = $O['price'];
		$Qty = $O['quantity'];
		$Amt = $O['amount'];
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
	'client'=>$client,
	'po_no'=>$po_no,
	'date'=>$date,
	'address_1'=>$address_1,
	'address_2'=>$address_2,
	'address_3'=>$address_3,
	'total'=>$total,
	'order_summary'=>$order_summary
);
$clientBody = template('template/client-order-placement.php', $vars);
$adminBody = template('template/admin-order-placement.php',$vars);
$clientPre = Premailer::html($clientBody);
$adminPre = Premailer::html($adminBody);
$mgDomain = $MG_DOMAIN;
$mgParams = [
			'from'    => $MG_EMAIL, 
			];
//Send Order Confirmation to Client
$mgParams['to']=$clientEmail;
$mgParams['subject']='Order Confirmation';
$mgParams['text'] =  $clientPre['plain'];
$mgParams['html'] =  $clientPre['html'];
if(USE_MG) $mg->messages()->send($mgDomain,$mgParams);


//Send Order Confirmation to Admin
$mgParams['to']=$adminEmail;
$mgParams['subject']='Order Admin Copy';
$mgParams['text'] =  $adminPre['plain'];
$mgParams['html'] =  $adminPre['html'];
if(USE_MG)  $mg->messages()->send($mgDomain,$mgParams);

echo json_encode(['OK']);
return;