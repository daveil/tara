<?php
header('Content-type:application/json');
require '../vendor/autoload.php';
use Mailgun\Mailgun;
use Pbc\Premailer;

$MG_KEY = 'key-b6ac1021af9712bed066c06fd8f1c7ca';
$MG_DOMAIN = 'appd964bcc2465a4236b7ceb35b59daaf44.mailgun.org';
$MG_EMAIL = 'postmaster@appd964bcc2465a4236b7ceb35b59daaf44.mailgun.org';
$adminEmail = 'daveadev@gmail.com';

$mg = Mailgun::create($MG_KEY);
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
//$mg->messages()->send($mgDomain,$mgParams);


//Send Order Confirmation to Admin
$mgParams['to']=$adminEmail;
$mgParams['subject']='Order Admin Copy';
$mgParams['text'] =  $adminPre['plain'];
$mgParams['html'] =  $adminPre['html'];
$mg->messages()->send($mgDomain,$mgParams);

echo json_encode(['OK']);
return;