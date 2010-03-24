function cleanPopUps() {
    if (isForegroundColorSelectorVisible) {
        foregroundColorSelector.hide();
        isForegroundColorSelectorVisible = false
    }
    if (isBackgroundColorSelectorVisible) {
        backgroundColorSelector.hide();
        isBackgroundColorSelectorVisible = false
    }
    if (isAboutVisible) {
        about.hide();
        isAboutVisible = false
    }
};

function importScript(url) {
    // http://www.webmaster-talk.com/javascript-forum/87702-import-javascript-in-javascript.html
    var tag = document.createElement("script");
    tag.type="text/javascript";
    tag.src = url;
    document.body.appendChild(tag);
}

function importDirectory(files, dir) {
    for (var i in files) {
        var name = files[i];

        if(name) {
            importScript("js/" + dir + "/" + name + ".js");
        }
    }
}
