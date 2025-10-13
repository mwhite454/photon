import * as photon from 'photon';

function TextOnPath(font, fontSize, topText, topSpan, bottomText, bottomSpan, baseline, contain, rotate, showPath) {

   const topTextModel = new photon.models.Text(font, topText, fontSize);
   const bottomTextModel = new photon.models.Text(font, bottomText, fontSize);

   const topArc = new photon.paths.Arc([0, 0], 100, 90 - topSpan / 2, 90 + topSpan / 2);
   const bottomArc = new photon.paths.Arc([0, 0], 100, 270 - bottomSpan / 2, 270 + bottomSpan / 2);

    photon.layout.childrenOnPath(topTextModel, topArc, baseline, true, contain, rotate);
    photon.layout.childrenOnPath(bottomTextModel, bottomArc, baseline, false, contain, rotate);

    this.models = {
        topText: topTextModel,
        bottomText: bottomTextModel
    };

    if (showPath) {
        this.paths = {
            topArc: topArc,
            bottomArc: bottomArc
        };
    }
}

TextOnPath.metaParameters = [
    { title: "font", type: "font", value: '*' },
    { title: "font size", type: "range", min: 1, max: 200, value: 24 },
    { title: "top text", type: "text", value: 'This is on top' },
    { title: "top span", type: "range", min: 10, max: 270, value: 150 },
    { title: "bottom text", type: "text", value: 'This is on bottom' },
    { title: "bottom span", type: "range", min: 10, max: 270, value: 150 },
    { title: "baseline", type: "range", min: -1, max: 2, step: 0.1, value: 0.5 },
    { title: "contain", type: "bool", value: true },
    { title: "rotate text", type: "bool", value: true },
    { title: "show path", type: "bool", value: true }
];

export default TextOnPath;
