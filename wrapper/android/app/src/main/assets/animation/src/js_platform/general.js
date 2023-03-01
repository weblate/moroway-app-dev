function followLink(input1, input2, input3) {
    var followLink = true;
    switch (input3) {
        case LINK_STATE_NORMAL:
            break;
        case LINK_STATE_INTERNAL_HTML:
            var hash, queryString;
            if (input1.indexOf("#") != -1) {
                hash = input1.substr(input1.indexOf("#"));
                input1 = input1.substr(0, input1.length - (input1.length - input1.indexOf("#")));
            }
            if (input1.indexOf("?") != -1) {
                queryString = input1.substr(input1.indexOf("?"));
                input1 = input1.substr(0, input1.length - (input1.length - input1.indexOf("?")));
            }
            input1 = input1.length == 0 ? "./index.html" : input1.substr(input1.length - 1, 1) == "/" ? input1 + "index.html" : input1.substr(input1.length - 5, 5) == ".html" ? input1 : input1 + "/index.html";
            if (queryString !== undefined) {
                input1 += queryString;
            }
            if (hash !== undefined) {
                input1 += hash;
            }
            break;
        case LINK_STATE_INTERNAL_LICENSE_FILE:
            break;
    }
    if (followLink) {
        window.open(input1, input2);
    }
}

function setSettingsHTMLLocal(elem, standalone) {
    if (typeof window.localStorage != "undefined") {
        var elems = elem.querySelectorAll("#langoption .langvalue");
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].id != "clang") {
                elems[i].addEventListener("click", function (src) {
                    WebJSInterface.setLang(src.target.dataset.langCode);
                });
            }
        }
        var settings = getSettings().values;
        for (var i = 0; i < Object.keys(settings).length; i++) {
            var key = Object.keys(settings)[i];
            WebJSInterface.setSetting(key, getSetting(Object.keys(settings)[i]));
            var settingElem = elem.querySelector('li[data-settings-id="' + key + '"]');
            if (settingElem !== null) {
                var leftButton = settingElem.querySelector(".settings-opts-left-button");
                var textButton = settingElem.querySelector(".settings-opts-text-button");
                leftButton.addEventListener("click", function (event) {
                    var currentKey = event.target.parentNode.parentNode.dataset.settingsId;
                    WebJSInterface.setSetting(currentKey, getSetting(currentKey));
                });
                textButton.addEventListener("click", function (event) {
                    var currentKey = event.target.parentNode.parentNode.dataset.settingsId;
                    WebJSInterface.setSetting(currentKey, getSetting(currentKey));
                });
            }
        }
    }
}

window.addEventListener("load", function () {
    var elems = document.querySelectorAll(".internal-link");
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = "none";
    }
    getServerNote(function (serverMsg) {
        var link = null;
        if (serverMsg.link != undefined && serverMsg.link != null && typeof serverMsg.link == "string") {
            link = getServerRedirectLink(serverMsg.link);
        }
        var image = null;
        var imageLink = null;
        if (serverMsg.imageSrc != undefined && typeof serverMsg.imageSrc == "string") {
            image = serverMsg.imageSrc;
            if (serverMsg.imageLink != undefined && serverMsg.imageLink != null && typeof serverMsg.imageLink == "string") {
                imageLink = getServerRedirectLink(serverMsg.imageLink);
            }
        }
        var backgroundImage = null;
        if (serverMsg.backgroundImageSrc != undefined && typeof serverMsg.backgroundImageSrc == "string") {
            backgroundImage = serverMsg.backgroundImageSrc;
        }
        WebJSInterface.saveServerNote(serverMsg.id, serverMsg.title, serverMsg.text, serverMsg.validUntil, link, image, imageLink, backgroundImage);
    });
});
