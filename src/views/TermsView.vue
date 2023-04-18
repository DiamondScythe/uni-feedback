<template>
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Service</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
    <section id="terms-of-service">
        <div class="card">
            <h1 class="primary-heading">Terms and Condition</h1>
            <p class="paragraph">
                1) Acceptance of Terms: By accessing or using this website, you acknowledge
    that you have read, understood, and agreed to be bound by these terms and
    conditions, as well as any additional terms and conditions that may apply to
    specific sections of the website or to particular services offered through
    the website. If you do not agree to these terms and conditions, you should
    not use this website.
                <br><br><br>
                2) User Accounts: In order to use certain features of this website, you may
    be required to create a user account. You are responsible for maintaining
    the confidentiality of your account information, including your username and
    password, and for all activity that occurs under your account. You agree to
    notify UNF immediately of any unauthorized use of your account or any other
    breach of security.
                <br><br><br>
                3)  User Content: You are solely responsible for any content that you post,
    upload, or otherwise submit to this website ("User Content"). You represent
    and warrant that you have all necessary rights to submit your User Content
    and that your User Content does not infringe on the intellectual property
    rights or other rights of any third party. You grant UNF a non-exclusive,
    transferable, sub-licensable, royalty-free, worldwide license to use,
    reproduce, modify, adapt, publish, translate, create derivative works from,
    distribute, perform, and display your User Content in connection with the
    operation of this website and the provision of services to users.
                <br><br><br>
                4) Intellectual Property: All content on this website, including but not
    limited to text, graphics, logos, images, and software, is the property of
    [Web Application Name] or its content suppliers and is protected by United
    States and international copyright laws. You may not reproduce, modify,
    distribute, or otherwise use any content on this website without the express
    written permission of UNF.
                <br><br><br>
                5) Limitation of Liability: To the fullest extent permitted by law, [Web
    Application Name] disclaims all warranties, express or implied, including
    but not limited to implied warranties of merchantability, fitness for a
    particular purpose, and non-infringement. UNF will not be liable for any
    direct, indirect, incidental, special, consequential, or punitive damages
    arising out of or relating to your use of this website or any services
    provided through this website, even if UNF has been advised of the
    possibility of such damages.
                <br><br><br>
                6) Indemnification:You agree to indemnify, defend, and hold harmless [Web
    Application Name], its officers, directors, employees, agents, and
    affiliates from and against any and all claims, damages, losses,
    liabilities, and expenses (including reasonable attorneys' fees) arising out
    of or relating to your use of this website or any breach of these terms and
    conditions.
                7)  Modifications to Terms and Conditions: UNF reserves the right to modify
    these terms and conditions at any time without prior notice. Your continued
    use of this website after any such modifications constitutes your acceptance
    of the revised terms and conditions. Governing Law
                <br><br><br>
                8) You <span class="bold">agree</span> that beCoditive may <span class="bold">terminate</span> your access to beCoditive 
                API for violations of the TOS and/or requests by authorized law enforcement or other government agencies.
                <br><br><br>
                9) You acknowledge that beCoditive may establish general practices and limits concerning use of beCoditive API, including without limitation the maximum number of days that email messages, 
                message board postings or other uploaded Content will be retained by beCoditive API. 
                You further acknowledge that beCoditive reserves the right to modify these general practices and limits from time to time. 
            </p>
        </div>
    </section>
    <footer>
        <p class="footer-heading">© Copyright 2020-2021 beCoditive. All rights reserved.</p>
    </footer>
</body>
</html>
  </template>
  
  <script></script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500;700&display=swap');

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #242836;
}

::-webkit-scrollbar-thumb {
    background: #333541;
}

* {

    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

body,html {

    width: 100%;
    min-height: 100%;
    background-color: #242836;

}

.main-header {

    width: 100%;
    height: 75px;
    background-color: #181A24;
    display: block;

}

.main-header ul.header-options {

    width: 100%;
    height: 100%;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-right: 100px;

}

.main-header ul.header-options li {
    display: inline-block;
}

.main-header ul.header-options li.title {

    font-size: 18px;
    color: #fff;
    font-family: Arial;
    cursor: pointer;

}

.header-mobile {

    width: 100%;
    height: 75px;
    background-color: #181A24;
    text-align: center;
    display: none;
}

.title-mobile {
    font-size: 18px;
    color: #fff;
    font-family: Arial;
    cursor: pointer;
    padding-top: 30px;
}

a {
    text-decoration: none;
    font-size: 16px;
    color: #6D6F79;
    font-family: Arial;
    cursor: pointer;
}

a:hover {
    font-size: 16px;
    color: #9598a7;
}


.card {
    margin-top: 100px;
    margin-bottom: 100px;
    height : 1950px;
    width: 1200px;
    border-radius: 30px;
    background-color: #333541;
    margin-left: auto;
    margin-right: auto;
}

.card .primary-heading {
    text-align: center;
    font-family: josefin sans;
    color: white;
    padding-top: 50px ;
    font-size: 4em;
}

.paragraph {
    font-family: josefin sans;
    color: rgb(179, 179, 179);
    margin-left: 50px;
    margin-right: 25px;
    padding-top: 50px;
    font-size: 1.5em;
    line-height: 1.3em;
    font-weight: 500;
}

.bold {
    font-weight: 700;
    color: white;
}

.footer-heading {
    text-align: center;
    font-family: josefin sans;
    color: white;
    margin-bottom: 50px;
    font-size: 2em;
    line-height: 35px;
}

@media only screen and (max-width: 1218px) {
    .card {
        margin-top: 100px;
        margin-bottom: 100px;
        height : 2050px;
        width: 1000px;
        border-radius: 30px;
        background-color: #333541;
        margin-left: auto;
        margin-right: auto;
    }
}

@media only screen and (max-width: 1012px) {
    .card {
        margin-top: 100px;
        margin-bottom: 100px;
        height : 2350px;
        width: 800px;
        border-radius: 30px;
        background-color: #333541;
        margin-left: auto;
        margin-right: auto;
    }
}

@media only screen and (max-width: 832px) {
    .card {
        margin-top: 100px;
        margin-bottom: 100px;
        height : 2950px;
        width: 600px;
        border-radius: 30px;
        background-color: #333541;
        margin-left: auto;
        margin-right: auto;
    }
    .card .primary-heading {
        font-size: 3.5em;
    }

    .footer-heading {
        font-size: 1.5em;
    }
}

@media only screen and (max-width: 626px) {
    .card {
        margin-top: 100px;
        margin-bottom: 100px;
        height : 3850px;
        width: 450px;
        border-radius: 30px;
        background-color: #333541;
        margin-left: auto;
        margin-right: auto;
    }

    .header-mobile {
        display: block;
    }

    .main-header {
        display: none;
    }

    .card .primary-heading {
        font-size: 3em;
    }
}

@media only screen and (max-width: 480px) {
    .card {
        margin-top: 100px;
        margin-bottom: 100px;
        height : 5050px;
        width: 350px;
        border-radius: 30px;
        background-color: #333541;
        margin-left: auto;
        margin-right: auto;
    }

    .card .primary-heading {
        font-size: 2em;
    }
}

@media only screen and (max-width: 365px) {
    .card {
        margin-top: 100px;
        margin-bottom: 100px;
        height : 6300px;
        width: 290px;
        border-radius: 30px;
        background-color: #333541;
        margin-left: auto;
        margin-right: auto;
    }

    .card .primary-heading {
        font-size: 2em;
    }
}
</style>