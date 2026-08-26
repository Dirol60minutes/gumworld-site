const SERVER_IP =
    "gumworld.noob.club";


const copyIpButton =
    document.getElementById(
        "copyIpButton"
    );


const serverAddressButton =
    document.getElementById(
        "serverAddressButton"
    );


const copyMessage =
    document.getElementById(
        "copyMessage"
    );


const playerCount =
    document.getElementById(
        "playerCount"
    );


const serverVersion =
    document.getElementById(
        "serverVersion"
    );


const serverStatus =
    document.getElementById(
        "serverStatus"
    );


const serverAddress =
    document.getElementById(
        "serverAddress"
    );


const currentYear =
    document.getElementById(
        "currentYear"
    );



if (serverAddress) {

    serverAddress.textContent =
        SERVER_IP;

}



if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}



async function copyServerIp() {

    try {

        await navigator.clipboard.writeText(
            SERVER_IP
        );


        if (copyMessage) {

            copyMessage.textContent =
                "✓ IP сервера скопирован: " +
                SERVER_IP;

        }


        if (copyIpButton) {

            copyIpButton.textContent =
                "✓ IP скопирован";

        }


        setTimeout(() => {

            if (copyMessage) {

                copyMessage.textContent =
                    "";

            }


            if (copyIpButton) {

                copyIpButton.textContent =
                    "🎮 Скопировать IP";

            }

        }, 2500);

    }

    catch (error) {

        if (copyMessage) {

            copyMessage.textContent =
                "IP сервера: " +
                SERVER_IP;

        }

    }

}



if (copyIpButton) {

    copyIpButton.addEventListener(
        "click",
        copyServerIp
    );

}



if (serverAddressButton) {

    serverAddressButton.addEventListener(
        "click",
        copyServerIp
    );

}



async function updateServerStatus() {

    try {

        const response =
            await fetch(
                "https://api.mcsrvstat.us/3/" +
                SERVER_IP
            );


        if (!response.ok) {

            throw new Error(
                "Server API error"
            );

        }


        const data =
            await response.json();


        if (data.online) {


            if (serverStatus) {

                serverStatus.innerHTML =
                    `
                    <span class="status-dot"></span>
                    ONLINE
                    `;

            }


            if (
                playerCount &&
                data.players
            ) {

                const online =
                    data.players.online ?? 0;


                const max =
                    data.players.max ?? "?";


                playerCount.textContent =
                    online + " / " + max;

            }


            if (
                serverVersion &&
                data.version
            ) {

                serverVersion.textContent =
                    data.version;

            }

        }


        else {


            if (serverStatus) {

                serverStatus.textContent =
                    "🔴 OFFLINE";

            }


            if (playerCount) {

                playerCount.textContent =
                    "0 / —";

            }


            if (serverVersion) {

                serverVersion.textContent =
                    "Недоступно";

            }

        }

    }


    catch (error) {


        console.error(
            "Не удалось получить статус сервера:",
            error
        );


        if (serverStatus) {

            serverStatus.textContent =
                "⚪ НЕТ ДАННЫХ";

        }


        if (playerCount) {

            playerCount.textContent =
                "— / —";

        }

    }

}



updateServerStatus();


setInterval(
    updateServerStatus,
    60000
);