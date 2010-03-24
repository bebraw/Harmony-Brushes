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
