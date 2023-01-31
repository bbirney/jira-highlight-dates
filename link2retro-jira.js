// ==UserScript==
// @name         Jira Sprint Board Link2Retro
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Make important dates more prominent on Jira sprint board
// @author       ben.b
// @match        *://prodege.atlassian.net/jira/software/c/projects/DIS/boards/130*
// @downloadURL https://github.com/bbirney/tampermonkey-scripts/blob/main/link2retro-jira.js
// ==/UserScript==


(function() {
    let done = false;

    const checkStringInURL = async (url, stringToCheck) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
            const text = await response.text();
            return text.includes(stringToCheck);
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const insertButton = () => {

        const base_url = "https://easyretro.io/publicboard/3BR6cwv3ttP4OI1WLAR8qB8GxKi2/";
        const board_ids = [
            "78695c80-c297-4872-8100-7e70fafee354",
            "f74623ec-db4a-4182-a428-08058131d498",
            "d0ead8eb-11f7-4098-8580-2c7a1cf60789"
        ];

        const sprintNameElement = document.querySelectorAll('span.subnavigator-title');

        if (!sprintNameElement.length) {
            return;
        }

        const sprint_name = sprintNameElement[0].textContent.trim();

        let link = null;
        for (let i in board_ids) {
            console.log(base_url + board_ids[i]);
            if (checkStringInURL(base_url + board_ids[i], sprint_name)) {
                link = base_url + board_ids[i];
                break;
            }
        }

        if (!link) {
            console.error("easy retro link not found");
            return;
        }

        // Create the button
        const button = document.createElement("button");
        button.innerText = "Easy Retro";
        button.style.backgroundColor = "#5AAC44";
        button.style.color = "white";
        button.style.padding = "10px 20px";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.margin = "10px 10px 0 0";
        button.style.display = "inline-block";
        button.onclick = () => window.open(link, "_blank");

        // Append the button to the span with the class ".subnav-container"
        const subnavContainer = document.querySelector(".subnav-container");
        subnavContainer.appendChild(button);
        clearInterval(interval_id);
    }

    const interval_id = setInterval(insertButton, 1000);

})();
