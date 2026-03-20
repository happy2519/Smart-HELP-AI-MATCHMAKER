<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Smart Help</title>

<style>
    body {
        margin: 0;
        background-color: #0a0a0a;
        color: #e6d6ff;
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
    }

    .container {
        max-width: 600px;
    }

    img {
        width: 80px;
        margin-bottom: 20px;
    }

    h1 {
        border-bottom: 2px solid #b57edc;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

    .line {
        opacity: 0;
        animation: fadeIn 1s forwards;
    }

    .line:nth-child(1) { animation-delay: 0.5s; }
    .line:nth-child(2) { animation-delay: 1.5s; }
    .line:nth-child(3) { animation-delay: 2.5s; }
    .line:nth-child(4) { animation-delay: 3.5s; }
    .line:nth-child(5) { animation-delay: 4.5s; }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
</style>

</head>

<body>

<div class="container">

    <!-- Sapling Image -->
    <img src="https://cdn-icons-png.flaticon.com/512/2909/2909765.png" alt="sapling">

    <h1 class="line">Smart Help</h1>

    <p class="line">Connecting volunteers with NGOs.</p>
    <p class="line">Discover. Contribute. Make an impact.</p>
    <p class="line">Track activities in real-time.</p>
    <p class="line">Simple. Secure. Meaningful.</p>

</div>

</body>
</html>
