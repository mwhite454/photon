import * as photon from 'photon';

function truckBolts() {
   const tx = 1 + 5 / 8;
   const ty = 1 + 1 / 8;
   const bolts = new photon.models.BoltRectangle(tx, ty, 7 / 32 / 2);
    bolts.origin = [tx / -2, ty / -2];

    this.units = photon.unitType.Inch;
    this.models = {
        bolts: bolts
    };
}

function skatedeck(width, length, truckOffset) {
    
    this.units = photon.unitType.Centimeter;

   const board = new photon.models.Oval(length, width);
    board.origin = [0, width / -2];

   const truck1 = photon.model.convertUnits(new truckBolts(), this.units);
    truck1.origin = [truckOffset, 0];

   const truck2 = photon.model.convertUnits(new truckBolts(), this.units);
    truck2.origin = [length - truckOffset, 0];

    this.models = {
        board:board, truck1: truck1, truck2: truck2
    };
}

skatedeck.metaParameters = [
    { title: "width", type: "range", min: 12, max: 25, value: 20 },
    { title: "length", type: "range", min: 40, max: 120, value: 80 },
    { title: "truck offset", type: "range", min: 4, max: 20, value: 18 },
];

export default skatedeck;
