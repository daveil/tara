<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Order Confirmation</title>

</head>

<body itemscope itemtype="http://schema.org/EmailMessage">
	<table>
		<thead>
			<tr> 
				<td rowspan="2"><h1>PO#</h1></td>
				<td rowspan="2"><h1><?php echo $po_no;?></h1></td>
				<td>Date</td>
			</tr>
			<tr>
				<td><?php echo $date;?></td>
			</tr>
			
		</thead>
		<tbody>
			<tr>
				<td>Customer</td>
				<td colspan="2"><?php echo $client;?></td>
			</tr>
			<tr>
				<td rowspan="3">Shipping<br/>Address</td>
				<td ><?php echo $address_1;?></td>
			</tr>
			<tr><td><?php echo $address_2;?></td></tr>
			<tr><td><?php echo $address_3;?></td></tr>
		</tbody>
	</table>
	<table>
		<thead>
			<tr>
				<td>Item</td>
				<td>Price</td>
				<td>Quantity</td>
				<td>Amount</td>
			</tr>
		</thead>
		<tbody>
			 <?php echo  $order_summary ?>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="3">TOTAL</td>
				<td><?php echo  $total ?></td>
			</tr>
		</tfoot>
	</table>
</body>
</html>