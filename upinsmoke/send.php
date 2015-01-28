<?php

$send = isset( $_POST['send'] ) ? $_POST['send'] : null;

$status = false;
$emails = array('Info@up-in-smoke.ru');

if( !$send ){
	throw new Exception('Bad request!');
}else{	
	$error  = array();
	$result = array();
	$filter = array(
		'name'  => array( 'required' => true, 'regexp' => '/^[ \wа-яА-Я]+$/i' ),
		'tel'   => array( 'required' => true, 'regexp' => '/^\d\(\d{3,3}\)\d{3,3}-\d{2,2}-\d{2,2}$/i' ),
		'email' => array( 'required' => true, 'regexp' => '/^[a-zA-Z0-9._\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/i' ),
		'text'  => array( 'required' => true ),
		'type'  => array( 'required' => true, 'regexp' => '/^(Кальян|Каталог)$/i' )
	);
	
	foreach( $send as $key => $value ){
		if ( $filter[$key]['required'] ){
			if ( isset( $filter[$key]['regexp'] ) && preg_match( $filter[$key]['regexp'], $value ) ) $result[ $key ] = $value;
			else $result[ $key ] = strip_tags( trim( $value ));
		}else{
			$error[] = 'Неверно заполнено поле '.$key;
		}
	}
	
	if ( $error ){
		$msg = 'Пожалуйста, исправьте ошибки:'.PHP_EOL;
		$status = false;
	}else{
		$subject = 'ZAKAZ: UP IN SMOKE';
		foreach( $result as $key => $value ){
			$body .= $key . ' : ' . $value . PHP_EOL;
		}		
		
		require_once 'PHPMailer/PHPMailerAutoload.php';
		
		$mail = new PHPMailer;
		$mail->CharSet = 'UTF-8';
		
		$mail->From = $result['email'];
		if ( is_array( $emails )){
			foreach( $emails as $email ){
				$mail->addAddress($email);
			}
		}else{
			$mail->addAddress($emails);
		}
		
		$mail->Subject = $subject;
		$mail->Body    = $body;
		
		if(!$mail->send()) {
			$msg = 'Ошибка, что-то пошло не так.'.PHP_EOL;
			$status = false;
		} else {
			$msg = 'Спасибо! Заказ принят, мы Вам перезвоним.'.PHP_EOL;
			$status = true;
		}
	}
	
	echo json_encode(array(
		'status' => $status,
		'error'	 => $error,
		'msg' 	 => $msg
	));
}