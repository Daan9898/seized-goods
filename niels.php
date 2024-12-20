<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Banner met Tekst</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .banner-container {
            position: relative;
            text-align: center;
            color: white;
            width: 100%;
            height: 290px;
            background-image: url('https://triplejonline.nl/wp-content/uploads/2024/08/Geef-retouren-een-nieuw-leven.-Maak-duurzaamheid-jouw-eerste-keuze.-3000-x-800-px.jpg');
            background-size: cover;
            background-position: center;
        }

        .banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Zwarte semi-transparante overlay */
            z-index: 1;
        }

        .banner-content {
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .banner-text {
            font-size: 2.5em;
            font-weight: bold;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
            max-width: 100%;
            margin-bottom: 10px;
            text-align: center;
        }

        .banner-subtext {
            font-size: 1.5em;
            max-width: 80%;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
            text-align: center;
            margin-bottom: 20px;
        }

        .banner-button {
            background-color: #ff6600;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2em;
            border-radius: 5px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
            display: inline-block;
        }

        .banner-button:hover {
            background-color: #e65c00;
        }

        /* Media Queries */
        @media (max-width: 1024px) {
            .banner-text {
                font-size: 2em;
            }

            .banner-subtext {
                font-size: 1.2em;
            }

            .banner-button {
                padding: 12px 25px;
                font-size: 1.1em;
            }
        }

        @media (max-width: 768px) {
            .banner-container {
                height: 220px;
            }

            .banner-text {
                font-size: 1.8em;
            }

            .banner-subtext {
                font-size: 1em;
            }

            .banner-button {
                padding: 10px 20px;
                font-size: 1em;
            }
        }

        @media (max-width: 480px) {
            .banner-container {
                height: 180px;
            }

            .banner-text {
                font-size: 1.4em;
            }

            .banner-subtext {
                font-size: 0.9em;
            }

            .banner-button {
                padding: 8px 16px;
                font-size: 0.9em;
            }
        }

    </style>
</head>
<body>

    <div class="banner-container">
        <div class="banner-overlay"></div> <!-- Overlay laag -->
        <div class="banner-content"> <!-- Content die bovenop de overlay komt -->
            <div class="banner-text">
                Triple J Online geeft retouren een nieuw leven.<br>
            </div>
            <div class="banner-subtext">
                Maak daarom duurzaamheid jouw eerste keuze.
                Verander de manier waarop je winkelt. Kies voor producten met een verhaal.
            </div>
            <a href="https://triplejonline.nl/winkel/" class="banner-button">Bekijk alle producten</a>
        </div>
    </div>

</body>
</html>
