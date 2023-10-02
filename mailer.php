<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Oups ! Il semble y avor eu un problème. Veuillez compléter le formulaire et réessayer.";
            exit;
        }
        /***********************************/
        /*     Update Your Mail Below      */
        /***********************************/
        $recipient = "marc.williame@hotmail.com";

        $subject = "New contact from $name";
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";
        $email_headers = "From: $name <$email>";
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            http_response_code(200);
            echo "Merci ! Votre message a été envoyé";
        } else {
            http_response_code(500);
            echo "Oups ! Un problème s'est produit et votre message n'a pu être envoyé.";
        }
    } else {
        http_response_code(403);
        echo "Il y a eu un problème avec votre message, veuillez réessayer.";
    }
?>
