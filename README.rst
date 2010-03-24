This fork is based on work done by mrdoob and rhyolight. I have restructured
it heavily to suit my purposes. :)

IMPORTANT! If you want to test the application, please give the tagged versions
a go! They are considered relatively stable.

- better palette (bounds + slots interpolated between those)
- faster undo!
- playback
- gradient background (x/y/others?)
- scanfill brush
- rethought UI (pads+panels)

Currently it provides following extra functionality:

- mirroring (x, y, radial)
- "sticky" palette (shift). Note that it's not possible to paint under the
  palette!
- vertical constraint (hit s while painting)
- horizontal constraint (hit a while painting)
- perspective constraint (hit d while painting, set target with f)
- undo/redo (undo is slow as it redraws everything!)

You can find more information about Harmony at http://mrdoob.com/blog/post/689.

See also http://rhyolight.posterous.com/new-brushes-for-harmony-canvas-app.

To run, just open harmony.html in a canvas-enabled web browser.
