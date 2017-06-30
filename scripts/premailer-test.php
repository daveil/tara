<?php
header('Content-type:application/json');
require '../vendor/autoload.php';
use Pbc\Premailer;
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
$vars = array(
	'client'=>'Jessica',
	'total'=>100,
	'order_summary'=>"<tr>
					<td>Mari</td>
					<td>2088</td>
					<td>1</td>
					<td>2088</td>
				</tr>"
);
$clientBody = template('template/email.php', $vars);
$clientPre = Premailer::html($clientBody);
print_r($clientPre);