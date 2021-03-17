# window-pixi

In Vitessce, we want to lazy-load HiGlass, to reduce the bundle size, since we only need to use HiGlass when visualizing data with genomic coordinates.

It is difficult or impossible to use lazy loading when the consumer library (in this case Vitessce) also needs to be bundled and lazy loaded itself (in this case in the HuBMAP Portal).

One option is to use dynamic imports with absolute / external URLs to the HiGlass JavaScript bundle. However, HiGlass depends on PIXI.js. The PIXI JavaScript bundle is not compatible with dynamic imports because it sets PIXI as a module-scope variable (`var PIXI = ...`) [reference](https://lea.verou.me/2020/07/import-non-esm-libraries-in-es-modules-with-client-side-vanilla-js/).

So we just need to append the following line:

```js
window.PIXI = PIXI;
```