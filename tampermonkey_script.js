// ==UserScript==
// @name         Jira Sprint Board Enhancements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Make important dates more prominent on Jira sprint board
// @author       ben.b
// @match        *://prodege.atlassian.net/jira/software/c/projects/DIS/boards/130*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(updateDates, 1000);

    function updateDates() {
        const newCardDivs = document.getElementsByClassName("ghx-newcard");
        const dateElements = [];
        for (const div of newCardDivs) {
            const extraFieldContentSpans = div.getElementsByClassName("ghx-extra-field-content");
            for (const span of extraFieldContentSpans) {
                dateElements.push(span);
            }
        }
        var now = new Date();

        for (var i = 0; i < dateElements.length; i++) {
            var date = extractDate(dateElements[i].textContent);
            if (!date) {
                continue;
            }

            var daysUntil = (date - now) / (1000 * 60 * 60 * 24);

            if (daysUntil <= 0) {
                dateElements[i].style.color = "green";
                dateElements[i].style.fontWeight = "bold";
            } else if (daysUntil <= 7) {
                dateElements[i].style.color = "red";
                dateElements[i].style.fontWeight = "bold";
            } else if (daysUntil >= 7) {
                dateElements[i].style.color = "blue";
                dateElements[i].style.fontWeight = "bold";
            }
        }
    }

    function extractDate(dateString) {
        const regex = /^(\d{4}-\d{2}-\d{2})(?:_unplanned)?$/;
        const match = dateString.match(regex);
        if (match) {
            const strippedDate = match[1];
            return new Date(strippedDate);
        }
        return null;
    }
})();
