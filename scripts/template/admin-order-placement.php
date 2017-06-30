<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Order Confirmation</title>
<style type="text/css">
	body{font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;;color:#0e2248;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: none;width: 100%!important;height: 100%;}
	div.email-container{width:100%; margin:0 auto;}
	h1,p{font-size:13pt;text-align:center;}
	img{width: auto;margin: 0 auto;display: block;}
	h2,hr{width:75%;margin:0 auto;}
	table{width:65%;margin:0 auto;padding-left:7%;font-size:11pt;}
	h2{font-size:13pt;text-align:center;text-transform:uppercase;padding:8pt 0pt;border-top:1pt solid #0e2248;border-bottom:1pt solid #0e2248;}
	table td{text-align:left;padding:12pt;}
	table thead th{text-align:left;text-transform:uppercase;font-size:12pt;padding:6pt 0pt;}
	table tbody td:nth-child(3){text-align:center;}
	table thead th:nth-child(3){text-align:center;}
	hr{border:0;border-bottom: 1pt solid #0e2248;}
	table tfoot td[colspan]{text-align:right;padding-right:10pt;}
	footer p{width:75%; margin:15pt auto;font-size:12pt;}
</style>
</head>

<body itemscope itemtype="http://schema.org/EmailMessage">
	<?php 
		if(!isset($client)) $client = "client";
		if(!isset($email)) $email = "no-reply@example.com";
		if(!isset($address)) $address = "Sample Address";
		if(!isset($ref_no)) $ref_no = "12345";
		if(!isset($date)) $date =date('F d, Y',time());
		if(!isset($total))  $total = "2088";
		if(!isset($order_summary))
			$order_summary = "
				<tr>
					<td>Mari</td>
					<td>2088</td>
					<td>1</td>
					<td>2088</td>
				</tr>";
	?>
	<div class="email-container">
		<img src="cid:logo" alt="TARA" />
		<h2>Order Summary</h2>
		<table>
			<thead>
				<tr> 
					<th>Ref No</th>
					<td><?php echo $ref_no;?></td>
					<th>Date</th>
					<td><?php echo $date;?></td>
				</tr>
				<tr>
					<th>Client</th>
					<td  colspan="2"><?php echo "$client ($email)";?></td>
				</tr>
				<tr>
					<th>ADDRESS</th>
					<td colspan="3"><?php echo $address;?></td>
				</tr>
			</thead>
		</table>
		<hr />
		<table>
			<thead>
				<tr>
					<th>Item</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				<?php echo $order_summary;?>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3"><b>Total</b></td>
					<td><b><?php echo $total;?></b></td>
				</tr>
			</tfoot>
		</table>
	</div>
</body>
</html>