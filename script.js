// ==========================================
// GUMWORLD CONFIG
// ==========================================

const SERVER_IP = "gumworld.noob.club";

const SERVER_API =
    "https://api.mcsrvstat.us/3/" +
    SERVER_IP;


// ==========================================
// ELEMENTS
// ==========================================

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


const heroStatusText =
    document.getElementById(
        "heroStatusText"
    );


const heroStatusDot =
    document.getElementById(
        "heroStatusDot"
    );


const currentYear =
    document.getElementById(
        "currentYear"
    );


// ==========================================
// YEAR
// ==========================================

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


// ==========================================
// SERVER ADDRESS
// ==========================================

if (serverAddress) {

    serverAddress.textContent =
        SERVER_IP;

}


// ==========================================
// COPY IP
// ==========================================

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


// ==========================================
// COPY EVENTS
// ==========================================

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


// ==========================================
// ONLINE STATE
// ==========================================

function showOnline(data) {

    if (serverStatus) {

        serverStatus.classList.remove(
            "offline"
        );


        serverStatus.innerHTML =
            `
            <span class="status-dot"></span>
            <span>ONLINE</span>
            `;

    }


    if (heroStatusText) {

        heroStatusText.textContent =
            "GUMWORLD ONLINE";

    }


    if (heroStatusDot) {

        heroStatusDot.classList.remove(
            "offline"
        );

    }


    if (playerCount) {

        const online =
            data.players?.online ?? 0;


        const max =
            data.players?.max ?? "?";


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


// ==========================================
// OFFLINE STATE
// ==========================================

function showOffline() {

    if (serverStatus) {

        serverStatus.classList.add(
            "offline"
        );


        serverStatus.innerHTML =
            `
            <span class="status-dot offline"></span>
            <span>OFFLINE</span>
            `;

    }


    if (heroStatusText) {

        heroStatusText.textContent =
            "GUMWORLD OFFLINE";

    }


    if (heroStatusDot) {

        heroStatusDot.classList.add(
            "offline"
        );

    }


    if (playerCount) {

        playerCount.textContent =
            "0 / —";

    }

}


// ==========================================
// UNKNOWN STATE
// ==========================================

function showUnknown() {

    if (serverStatus) {

        serverStatus.innerHTML =
            `
            <span>⚪</span>
            <span>НЕТ ДАННЫХ</span>
            `;

    }


    if (heroStatusText) {

        heroStatusText.textContent =
            "GUMWORLD";

    }


    if (playerCount) {

        playerCount.textContent =
            "— / —";

    }

}


// ==========================================
// UPDATE SERVER STATUS
// ==========================================

async function updateServerStatus() {

    try {

        const response =
            await fetch(
                SERVER_API,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Server API error"
            );

        }


        const data =
            await response.json();


        if (data.online) {

            showOnline(data);

        }

        else {

            showOffline();

        }

    }

    catch (error) {

        console.error(
            "Не удалось получить статус сервера:",
            error
        );


        showUnknown();

    }

}


// ==========================================
// START
// ==========================================

updateServerStatus();


// Обновляем раз в минуту

setInterval(
    updateServerStatus,
    60000
);