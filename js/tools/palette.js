function Palette() {
    var f, e, b, a, q = 0,
        h = 90,
        o = 1080 / 2,
        n = 30,
        m, d = Math.PI / 180,
        l, k, p, g, r;
    f = document.createElement("canvas");
    f.width = 250;
    f.height = 250;
    b = f.width / 2;
    a = f.height / 2;
    m = (h - q) / n;
    e = f.getContext("2d");
    e.lineWidth = 3;

    function s(z, v, u) {
        var w, x, B, y, A, j, c, C;
        if (u == 0) {
            return [0, 0, 0]
        }
        z /= 60;
        v /= 100;
        u /= 100;
        y = Math.floor(z);
        A = z - y;
        j = u * (1 - v);
        c = u * (1 - (v * A));
        C = u * (1 - (v * (1 - A)));
        switch (y) {
        case 0:
            w = u;
            x = C;
            B = j;
            break;
        case 1:
            w = c;
            x = u;
            B = j;
            break;
        case 2:
            w = j;
            x = u;
            B = C;
            break;
        case 3:
            w = j;
            x = c;
            B = u;
            break;
        case 4:
            w = C;
            x = j;
            B = u;
            break;
        case 5:
            w = u;
            x = j;
            B = c;
            break
        }
        return [w, x, B]
    }
    for (l = 0; l < o; l++) {
        p = s(Math.floor((l / o) * 360), 100, 100);
        g = l / (o / 360) * d;
        for (k = 0; k < n; k++) {
            r = 255 - (k / n) * 255;
            e.strokeStyle = "rgb(" + Math.floor(p[0] * 255 + r) + "," + Math.floor(p[1] * 255 + r) + "," + Math.floor(p[2] * 255 + r) + ")";
            e.beginPath();
            e.moveTo(Math.cos(g) * (m * k + q) + b, Math.sin(g) * (m * k + q) + a);
            e.lineTo(Math.cos(g) * (m * (k + 1) + q) + b, Math.sin(g) * (m * (k + 1) + q) + a);
            e.stroke()
        }
    }
    return f
}
