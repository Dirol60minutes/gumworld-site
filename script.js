// ==========================================
// GUMWORLD — НАСТРОЙКИ
// ==========================================

const SERVER_ADDRESS = "gumworld.noob.club";

const DISCORD_INVITE =
    "https://discord.gg/zU57nHHbJE";


// ==========================================
// ЭЛЕМЕНТЫ САЙТА
// ==========================================

const playerCount =
    document.getElementById("playerCount");

const serverVersion =
    document.getElementById("serverVersion");

const serverAddress =
    document.getElementById("serverAddress");

const serverStatus =
    document.getElementById("serverStatus");

const copyIpButton =
    document.getElementById("copyIpButton");

const copyMessage =
    document.getElementById("copyMessage");

const discordButton =
    document.getElementById("discordButton");

const teamDiscordButton =
    document.getElementById("teamDiscordButton");

const donateButton =
    document.getElementById("donateButton");

const currentYear =
    document.getElementById("currentYear");


// ==========================================
// АДРЕС СЕРВЕРА
// ==========================================

if (serverAddress) {
    serverAddress.textContent =
        SERVER_ADDRESS;
}


// ==========================================
// DISCORD-КНОПКИ
// ==========================================

function setupDiscordButton(button) {

    if (!button) {
        return;
    }

    button.href =
        DISCORD_INVITE;

    button.target =
        "_blank";

    button.rel =
        "noopener noreferrer";
}

setupDiscordButton(discordButton);
setupDiscordButton(teamDiscordButton);


// ==========================================
// ДОНАТ
// Пока ссылки нет
// ==========================================

if (donateButton) {

    donateButton.addEventListener(
        "click",
        (event) => {

            if (
                !donateButton.href ||
                donateButton.getAttribute("href") === "#"
            ) {

                event.preventDefault();

                alert(
                    "Ссылка на донат пока не подключена."
                );
            }
        }
    );
}


// ==========================================
// КОПИРОВАНИЕ IP
// ==========================================

if (copyIpButton) {

    copyIpButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    SERVER_ADDRESS
                );

                if (copyMessage) {

                    copyMessage.textContent =
                        "✓ IP сервера скопирован: "
                        + SERVER_ADDRESS;
                }

                copyIpButton.textContent =
                    "✓ IP скопирован";

                setTimeout(
                    () => {

                        if (copyMessage) {
                            copyMessage.textContent = "";
                        }

                        copyIpButton.textContent =
                            "🎮 Скопировать IP";

                    },
                    2500
                );

            } catch (error) {

                if (copyMessage) {

                    copyMessage.textContent =
                        "IP сервера: "
                        + SERVER_ADDRESS;
                }
            }
        }
    );
}


// ==========================================
// СТАТУС MINECRAFT-СЕРВЕРА
// ==========================================

async function loadServerStatus() {

    try {

        const response =
            await fetch(
                `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`
            );

        if (!response.ok) {

            throw new Error(
                "Ошибка получения статуса Minecraft"
            );
        }

        const data =
            await response.json();


        // ==================================
        // СЕРВЕР ОНЛАЙН
        // ==================================

        if (data.online) {

            if (serverStatus) {

                serverStatus.innerHTML = `
                    <span class="status-dot"></span>
                    Онлайн
                `;
            }


            const onlinePlayers =
                data.players?.online ?? 0;

            const maxPlayers =
                data.players?.max ?? 0;


            if (playerCount) {

                playerCount.textContent =
                    `${onlinePlayers} / ${maxPlayers}`;
            }


            if (serverVersion) {

                serverVersion.textContent =
                    data.version ?? "Неизвестно";
            }

        }


        // ==================================
        // СЕРВЕР ОФЛАЙН
        // ==================================

        else {

            if (serverStatus) {

                serverStatus.textContent =
                    "🔴 Офлайн";
            }

            if (playerCount) {

                playerCount.textContent =
                    "0 / 0";
            }

            if (serverVersion) {

                serverVersion.textContent =
                    "Недоступно";
            }
        }

    } catch (error) {

        console.error(
            "Ошибка Minecraft status:",
            error
        );

        if (serverStatus) {

            serverStatus.textContent =
                "⚪ Нет данных";
        }

        if (playerCount) {

            playerCount.textContent =
                "— / —";
        }

        if (serverVersion) {

            serverVersion.textContent =
                "Нет данных";
        }
    }
}


// ==========================================
// ГОД В FOOTER
// ==========================================

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}


// ==========================================
// ЗАПУСК
// ==========================================

loadServerStatus();

setInterval(
    loadServerStatus,
    60000
);