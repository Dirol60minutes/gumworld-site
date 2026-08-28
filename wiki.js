const SERVER_IP = "gumworld.noob.club";


/* =========================================
   COPY IP
========================================= */

const copyIpButton =
    document.getElementById("copyIpButton");

const copyMessage =
    document.getElementById("copyMessage");


if (copyIpButton) {

    copyIpButton.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    SERVER_IP
                );


                copyIpButton.textContent =
                    "✅ Скопировано";


                if (copyMessage) {

                    copyMessage.classList.add(
                        "visible"
                    );

                }


                setTimeout(
                    () => {

                        copyIpButton.textContent =
                            "📋 Скопировать IP";


                        if (copyMessage) {

                            copyMessage.classList.remove(
                                "visible"
                            );

                        }

                    },
                    2000
                );

            }

            catch (error) {

                console.error(
                    "Не удалось скопировать IP:",
                    error
                );


                copyIpButton.textContent =
                    SERVER_IP;

            }

        }
    );

}



/* =========================================
   SCREENSHOT MODAL
========================================= */

const screenshots =
    document.querySelectorAll(".screenshot");

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const modalClose =
    document.getElementById("modalClose");


function openImage(imagePath) {

    if (
        !imageModal ||
        !modalImage
    ) {
        return;
    }


    modalImage.src =
        imagePath;


    imageModal.classList.add(
        "open"
    );


    imageModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function closeImage() {

    if (
        !imageModal ||
        !modalImage
    ) {
        return;
    }


    imageModal.classList.remove(
        "open"
    );


    imageModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    setTimeout(
        () => {

            modalImage.src = "";

        },
        200
    );

}


screenshots.forEach(
    (screenshot) => {

        screenshot.addEventListener(
            "click",
            () => {

                const imagePath =
                    screenshot.dataset.image;


                if (imagePath) {

                    openImage(
                        imagePath
                    );

                }

            }
        );

    }
);


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeImage
    );

}


if (imageModal) {

    imageModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === imageModal
            ) {

                closeImage();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            imageModal &&
            imageModal.classList.contains("open")
        ) {

            closeImage();

        }

    }
);