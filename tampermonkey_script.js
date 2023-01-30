// ==UserScript==
// @name         Jira Sprint Board Enhancements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make important dates more prominent on Jira sprint board
// @author       ben.b
//TODO: @match        *://*/secure/RapidBoard.jspa* 
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(updateDates, 1000);

    function updateDates() {
        var dateElements = document.getElementsByClassName("ghx-end");
        var now = new Date();

        for (var i = 0; i < dateElements.length; i++) {
            var date = new Date(dateElements[i].textContent);
            var daysUntil = (date - now) / (1000 * 60 * 60 * 24);

            if (daysUntil <= 0) {
                dateElements[i].style.color = "green";
                dateElements[i].style.fontWeight = "bold";
            } else if (daysUntil <= 7) {
                dateElements[i].style.color = "red";
                dateElements[i].style.fontWeight = "bold";
            } else if (daysUntil <= 7) {
                dateElements[i].style.color = "blue";
                dateElements[i].style.fontWeight = "bold";
            }
        }
    }
})();
