<!doctype html>
<?php error_reporting(0) ?>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1"><!-- Place favicon.ico in the root directory -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="sweetalert.all.min.js"></script>

</head>
<style>
    .col-md-3 {
        margin-bottom: 15px;
    }
</style>
<style>
    .col-md-3 {
        margin-bottom: 15px;
    }

    .shareBtns {
        text-align: center;
        /*margin-top: 50vh;*/
    }

    .fa {
        padding: 15px;
        font-size: 20px;
        width: 50px;
        text-align: center;
        text-decoration: none;
        margin: 5px 2px;
        border-radius: 50%;
    }

    .fa:hover {
        opacity: 0.7;
    }

    .fa-facebook {
        background: #3B5998;
        color: white;
    }

    .fa-twitter {
        background: #55ACEE;
        color: white;
    }

    .fa-google {
        background: #dd4b39;
        color: white;
    }

    .fa-linkedin {
        background: #007bb5;
        color: white;
    }

    .fa-youtube {
        background: #bb0000;
        color: white;
    }

    .fa-instagram {
        background: #125688;
        color: white;
    }

    .mshare {
        font-size: 0;
        white-space: nowrap;
        overflow: hidden;
        /*!owner element*/
    }

    .mshare--pane {
        position: absolute;
        top: -45px;
        left: 50%;
        z-index: 1;
    }

    .mshare-item {
        padding: 0 10px;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        line-height: 36px;
        text-decoration: none;
        user-select: none;
        touch-action: manipulation;
    }

    .mshare-item:hover, .mshare-item:visited {
        text-decoration: none;
    }

    .mshare-item-text {
        font-size: 13px;
        color: #fff;
        vertical-align: middle;
    }

    .mshare-item-text:not(:empty) {
        margin-left: 10px;
    }

    .mshare-item-icon {
        height: 1.4em;
        width: 1.4em;
        font-size: 15px;
        fill: #fff;
        vertical-align: middle;
    }

    .mshare-item-icon:first-child:last-child {
        padding: 0 5px;
    }

    .mshare-item--email, .mshare-item--email:visited, .mshare-item--email:hover {
        background-color: #4a586f;
        color: #4a586f;
    }

    .mshare-item--facebook, .mshare-item--facebook:visited, .mshare-item--facebook:hover {
        background-color: #3b5998;
        color: #3b5998;
    }

    .mshare-item--facebook .mshare-item-icon, .mshare-item--facebook:visited .mshare-item-icon, .mshare-item--facebook:hover .mshare-item-icon {
        margin-top: -0.1em;
    }

    .mshare-item--googleplus, .mshare-item--googleplus:visited, .mshare-item--googleplus:hover {
        background-color: #e34429;
        color: #e34429;
    }

    .mshare-item--googleplus .mshare-item-icon, .mshare-item--googleplus:visited .mshare-item-icon, .mshare-item--googleplus:hover .mshare-item-icon {
        width: 1.7em;
        height: 1.7em;
    }

    .mshare-item--linkedin, .mshare-item--linkedin:visited, .mshare-item--linkedin:hover {
        background-color: #027bb6;
        color: #027bb6;
    }

    .mshare-item--linkedin .mshare-item-icon, .mshare-item--linkedin:visited .mshare-item-icon, .mshare-item--linkedin:hover .mshare-item-icon {
        margin-top: -0.25em;
    }

    .mshare-item--pinterest, .mshare-item--pinterest:visited, .mshare-item--pinterest:hover {
        background-color: #c5282f;
        color: #c5282f;
    }

    .mshare-item--pinterest .mshare-item-icon, .mshare-item--pinterest:visited .mshare-item-icon, .mshare-item--pinterest:hover .mshare-item-icon {
        width: 1.25em;
        height: 1.25em;
        margin-top: 0.2em;
    }

    .mshare-item--reddit, .mshare-item--reddit:visited, .mshare-item--reddit:hover {
        background-color: #a1caf2;
        color: #a1caf2;
    }

    .mshare-item--reddit .mshare-item-icon, .mshare-item--reddit:visited .mshare-item-icon, .mshare-item--reddit:hover .mshare-item-icon {
        width: 1.7em;
        height: 1.7em;
    }

    .mshare-item--stumbleupon, .mshare-item--stumbleupon:visited, .mshare-item--stumbleupon:hover {
        background-color: #eb4823;
        color: #eb4823;
    }

    .mshare-item--stumbleupon .mshare-item-icon, .mshare-item--stumbleupon:visited .mshare-item-icon, .mshare-item--stumbleupon:hover .mshare-item-icon {
        width: 1.5em;
        height: 1.5em;
    }

    .mshare-item--twitter, .mshare-item--twitter:visited, .mshare-item--twitter:hover {
        background-color: #27aae1;
        color: #27aae1;
    }

    .mshare-item--whatsapp, .mshare-item--whatsapp:visited, .mshare-item--whatsapp:hover {
        background-color: #25d366;
        color: #25d366;
    }

    .mshare-item--sms, .mshare-item--sms:visited, .mshare-item--sms:hover {
        background-color: #63908d;
        color: #63908d;
    }

    .mshare-native {
        display: inline-block;
        font-size: 1rem;
        vertical-align: top;
        padding: 4px 6px;
        min-width: 52px;
    }

    .mshare__container {
        position: relative;
    }

    .mshare--open:not(.mshare--native) {
        height: 40px;
        visibility: visible;
        transform: translate3d(0, 0, 0);
        opacity: 1;
        transition: transform 450ms cubic-bezier(0.515, 0.57, 0.11, 0.98), opacity 450ms cubic-bezier(0.515, 0.57, 0.11, 0.98), height 0ms;
    }

    .mshare--close:not(.mshare--native) {
        height: 0px;
        transform: translate3d(0, 20px, 0);
        opacity: 0;
        transition: transform 350ms cubic-bezier(0.515, 0.57, 0.11, 0.98), opacity 350ms cubic-bezier(0.515, 0.57, 0.11, 0.98), height 0ms 350ms;
        pointer-events: none;
    }

    .mshare--open.mshare--native {
        height: 40px;
        visibility: visible;
        transform: translate3d(-50%, 0, 0);
        opacity: 1;
        transition: transform 450ms cubic-bezier(0.515, 0.57, 0.11, 0.98), opacity 450ms cubic-bezier(0.515, 0.57, 0.11, 0.98), height 0ms;
    }

    .mshare--close.mshare--native {
        height: 0px;
        transform: translate3d(-50%, 20px, 0);
        opacity: 0;
        transition: transform 350ms cubic-bezier(0.515, 0.57, 0.11, 0.98), opacity 350ms cubic-bezier(0.515, 0.57, 0.11, 0.98), height 0ms 350ms;
        pointer-events: none;
    }

    .mshare--button {
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
    }

    .mshare--expanded {
        margin: 1em;
    }

    .mshare--expanded .mshare-item {
        margin: 0 5px;
        padding: 0 12px;
    }

    .mshare--small {
        height: 30px;
        top: -35px;
    }

    .mshare--small .mshare-item {
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
    }

    .mshare--small .mshare-item-text {
        font-size: 11px;
    }

    .mshare--small .mshare-item-icon {
        font-size: 13px;
    }

    .mshare--small.mshare--expanded .mshare-item {
        padding: 0 14px;
    }
    .mshare.mshare--expanded.mshare-nonative.mshare--small{
        display: contents;
    }

    @media (max-width: 767px) {
        .mshare-item-text {
            display: none;
        }
    }

</style>
<body>
<?php
//Gets the IP Address from the visitor
$PublicIP = $_SERVER['REMOTE_ADDR'];
//Uses ipinfo.io to get the location of the IP Address, you can use another site but it will probably have a different implementation
$json = file_get_contents("https://api.ipdata.co?api-key=8705b56ff5920952268a8d4ed5ec8883ae91d185c46e685ac17e74bc");
//Breaks down the JSON object into an array
$json = json_decode($json, true);
//This variable is the visitor's city
$ip = $json['ip'];
$config = file_get_contents('config.json');
$config = json_decode($config, true);

$randomUsers = file_get_contents("https://randomuser.me/api/?results=" . $config['count']);
$randomUsers = json_decode($randomUsers, true);

$nearby = file_get_contents("http://www.geoplugin.net/extras/nearby.gp?ip=" . $ip . "&limit=".$config['count']."&format=json");
$nearby = json_decode($nearby, true);


?>
<h2>Your Ip is <span id='ip'></span> and City is <span id="city"></span>
</h2>
<!-- Add your site or application content here -->
<div class="row">

    <?php foreach ($randomUsers['results'] as $key => $randomUser) { ?>
        <div class="col-6 col-md-3">
            <div class="card">
                <img class="card-img-top" src="<?php echo $randomUser['picture']['large'] ?>" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title"><?php echo $randomUser['name']['title'] . " " . $randomUser['name']['first'] . " " . $randomUser['name']['last'] ?></h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><?php echo $nearby[$key]['geoplugin_place'] ?></li>
                        <li class="list-group-item">
                            Distance: <?php echo $nearby[$key]['geoplugin_distanceKilometers'] ?> Kms
                        </li>

                        <li class="list-group-item"><?php echo $randomUser['email'] ?></li>
                        <li class="list-group-item"><?php echo $randomUser['cell'] ?></li>
                    </ul>
                    <div class="shareBtns" id="shareId<?php echo $key ?>" data-id="<?php echo $key ?>" data-mshare-url="http://google.com"
                         data-mshare-title="Custom Title"
                         data-mshare-description="Custom Content Description"
                         data-mshare-image="http://lorempixel.com/400/200">
                        <div class="demo"></div>
                    </div>
                    <a id="contact<?php echo $key ?>" class="d-none" href="<?php echo $config['redirect'] ?>">
                        <button class="btn btn-lg btn-block btn-primary">Contact Us</button>
                    </a>
                </div>
                <!--                <a href="redirectFile.php" >
                                    <button class="btn btn-lg btn-block btn-primary">Share</button>
                                </a>
                -->            </div>
        </div>
    <?php } ?>
</div>

</body>
<script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
        crossorigin="anonymous"></script>
<script src="mkg-share.min.js"
</script>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"
        integrity="sha384-LtrjvnR4Twt/qOuYxE721u19sVFLVSA4hf/rRt6PrZTmiPltdZcI7q7PXQBYTKyf"
        crossorigin="anonymous"></script>
<script>
    new mShare('.demo', {size:'small',"url":"https://google.com"});

    $.get("https://api.ipdata.co?api-key=8705b56ff5920952268a8d4ed5ec8883ae91d185c46e685ac17e74bc", function (response) {
        $("#ip").html(response.ip);
        $("#city").html(response.city);
    }, "jsonp")
        .fail(function () {
            $.get('http://ip-api.com/json/', function (response) {
                $("#ip").html(response.query);
                $("#city").html(response.city);
            })
        });
    var timer = 0;
    var popupCheck = ""
    $(".shareBtns a.mshare-item--popup").find("*").off();

    $(".shareBtns a").on('click', function (e) {
        e.preventDefault();
        let url = $(this).attr('href');
        let id = $(this).closest('.shareBtns').data('id');
        openPopup(url, id,500,500);
    });

    function openPopup(url, id, width, height) {

        var leftPosition, topPosition;
        //Allow for borders.
        leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
        //Allow for title and status bars.
        topPosition = (window.screen.height / 2) - ((height / 2) + 50);
        //Open the window.
        var win = window.open(url, "Window2",
            "status=no,height=" + height + ",width=" + width + ",resizable=yes,left="
            + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
            + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");

        timer = 0
        popupCheck = setInterval(function () {
            timer++;
            let delay = <?php echo $config['delay'] ?>;
            if (win.closed) {
                checkCheat(id);
            }
            if (timer >= delay) {
                clearInterval(popupCheck)
                $("#shareId" + id).addClass('d-none');
                $("#contact" + id).removeClass('d-none');

            } else {
                $("#shareId" + id).removeClass('d-none');
                $("#contact" + id).addClass('d-none');

            }
        }, 1000)
        return false;
    }

    function checkCheat(id) {
        clearInterval(popupCheck);
        popupCheck = '';
        if (timer < <?php echo $config['delay'] ?>) {
            $("#shareId"+id).removeClass('d-none');
            $("#contact"+id).addClass('d-none');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You closed the popup immediately',
            })
        } else {
            $("#shareId"+id).addClass('d-none');
            $("#contact"+id).removeClass('d-none');
        }

    }
</script>
</html>
