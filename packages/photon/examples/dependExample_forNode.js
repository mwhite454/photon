import * as photon from 'photon';
import smile from './smile.js';
import m from './m.js';

function dependExample() {

   const m1 = photon.model.scale(new m(1.5, 0.7, .46, .65, .3, .65, .5, .2, .2), 3);

   const smile1 = new smile(45, .3, .8, 2, .4, .8);
    smile1.origin = [3, 7.5];

    this.models = {
        m1: m1,
        smile1: smile1
    };

    this.units = photon.unitType.Inch;
}

export default dependExample;

console.log('dependExample is running!');
console.log(photon.exporter.toSVG(new dependExample()));

/*to make this run from node, use this command line (from the root of your git):
node ./examples/dependExample_forNode.js
*/

/*to make this run in the browser, use this command line (from the root of your git):
browserify -r ./examples/dependExample_forNode.js:dependExample --exclude ../target/js/node.maker.js > ./examples/dependExample_forBrowser.js
*/