function init_local(){
    var pics = document.querySelector("#website-pics");
    pics.style.display = "none";
    handleServerJSONValues("webpics", function(res){
        if(typeof(res.pics) == "object") {
            res.pics.forEach(function(pic){
                var img = document.createElement("div");
                img.onclick = function(){followLink(pic.links.normal,"_blank", LINK_STATE_NORMAL);};
                img.style.backgroundImage = "url('" + pic.urls.thumb.url + "')";
                pics.appendChild(img);
            });
            pics.style.display = "";
        }
    });

    document.querySelector("#privacy-statement-link").addEventListener("click", function(){notify("#help-notifier", getString("helpScreenPrivacyStatementBackupLinkNotification", "."), NOTIFICATION_PRIO_DEFAULT, 900, null, null, window.innerHeight); followLink( getServerHTMLLink("privacy"),"_blank", LINK_STATE_NORMAL);});
    handleServerJSONValues("privacy", function(res){
        var privacy = document.querySelector("#privacy-statement");
        privacy.innerHTML = "";
        Object.keys(res).forEach(function(key){
            var span = document.createElement("span");
            span.textContent = res[key];
            privacy.innerHTML += "<br>";
            privacy.appendChild(span);
        });
    });

    var about = document.querySelector("#website-about");
    handleServerJSONValues("about", function(res){
        if(typeof(res) == "object" && Array.isArray(res)) {
            res.forEach(function(aboutText){
                var p = document.createElement("p");
                p.textContent = aboutText;
                about.querySelector("#website-about-text").appendChild(p);
            });
            about.style.display = "block";
        }
    });
}
