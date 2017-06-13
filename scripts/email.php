<?php
require '../vendor/autoload.php';
use Mailgun\Mailgun;
$mg = Mailgun::create('key-b6ac1021af9712bed066c06fd8f1c7ca');

# Now, compose and send your message.
$mg->messages()->send('appd964bcc2465a4236b7ceb35b59daaf44.mailgun.org', [
  'from'    => 'postmaster@appd964bcc2465a4236b7ceb35b59daaf44.mailgun.org', 
  'to'      => 'daveadev@gmail.com', 
  'subject' => 'The PHP SDK is awesome!', 
  'text'    => 'It is so simple to send a message.'
]);