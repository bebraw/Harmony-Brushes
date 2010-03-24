function setToggle(e, state) {
    // XXX: could be nicer (set via css class or so)
    if(state) {
        e.style.color = '#00DD00';
    }
    else {
        e.style.color = '#000000';
    }
}
function onMenuXMirror(a) {
    mirrorsDown['x'] = !mirrorsDown['x'];

    setToggle(this, mirrorsDown['x']);
}
function onMenuYMirror() {
    mirrorsDown['y'] = !mirrorsDown['y'];

    setToggle(this, mirrorsDown['y']);
}
function onMenuXYMirror() {
    mirrorsDown['xy'] = !mirrorsDown['xy'];

    setToggle(this, mirrorsDown['xy']);
}
