'use strict';

const STYLE_DEFAULTS = { width:500, height:500, lineWidth:2, spokeColor:'rgb(255, 0, 0, .5)', circleColor:'#000',
                         bigCircleColor:'#74FBEA', bigCircleLineWidth:10,
                         spokeLength:180, spokeFont:'bold 14px monospace', circleFont:'12px monospace', backgroundColor: 'white' };

const DEFAULT_SPOKE_LABELS = [
  'Safety',
  'Climate',
  'Attainment',
  'Leadership',
  'Engagement',
]

let responseA = {
  data: [
    {distance: 100, radius:30, label:'Safety'},
    {distance: 50, radius:10, label:'Climate'},
    {distance: 60, radius:30, label:'Attainment'},
    {distance: 90, radius:50, label:'Leadership'},
    {distance: 110, radius:50, label:'Engagement'},
  ],
  style: {
    width:500,
    height:500,
    spokeLength:180,
    lineWidth:3,
    spokeColor:'rgb(255, 0, 0, .5)',
    circleColor:'#000',
  }
};
responseA.style = {...STYLE_DEFAULTS, ...responseA.style};

let text_A = document.querySelector('#text_A');
let canvas = document.querySelector('canvas#chart');

let compare_button = document.querySelector('#compare-button');
let format_button = document.querySelector('#format-button');
let randomize_button = document.querySelector('#randomize-button');
let strict_checkbox = document.querySelector('#strict_order_check');
let strict_label = document.querySelector('label[for="strict_order_check"]');

let output_el = document.querySelector('#output');

// strict_checkbox.style.display = "none";
// strict_label.style.display = "none";

text_A.value = JSON.stringify(responseA, undefined, '  ');


function setupEventListeners() {
  format_button.addEventListener('click', (evt) => {
    responseA = parseJson();

    text_A.value = JSON.stringify(responseA, undefined, '  ');
    output_el.innerHTML = `Textarea JSON formatted (${responseA.data.length} data points).`;
  });

  randomize_button.addEventListener('click', (evt) => {
    let style = {};
    style.width = 400 + parseInt(Math.random() * 400);
    style.height = 400 + parseInt(Math.random() * 200);
    style.spokeLength = +(style.width * .4).toFixed(2);
    let randomizeColor = strict_checkbox.checked;
    if (randomizeColor) {
      style.spokeColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '80';
      style.circleColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      style.bigCircleColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    style.bigCircleLineWidth = 7 + parseInt(Math.random() * 10);
    style.lineWidth = 1 + parseInt(Math.random() * 6);
    style = {...STYLE_DEFAULTS, ...style};

    let dataLength = 3 + parseInt(1 + Math.random() * 5);
    if (Math.random() < .4) dataLength = 5;
    let data = [];
    for (let d = 0; d < dataLength; d++) {
      let entry = {};
      entry.distance = +(Math.random() * style.spokeLength).toFixed(2);
      entry.radius = +(Math.random() * style.spokeLength * .8).toFixed(2);
      entry.label = DEFAULT_SPOKE_LABELS[d % DEFAULT_SPOKE_LABELS.length];
      data.push(entry);
    }

    responseA = {
      data: data,
      style: style,
    };

    text_A.value = JSON.stringify(responseA);
    format_button.click();
    updateChart();
  });

  compare_button.addEventListener('click', (evt) => {
    updateChart();
  });
}

function getRGBA(htmlColor) {
  let temp = document.createElement('span');
  temp.style.color = htmlColor;
  document.body.appendChild(temp);
  let style = getComputedStyle(temp);
  let rgbaStr = style.color;
  let rgba = Array.from(rgbaStr.matchAll(/\d+\.?\d*/g), c=> +c[0]) // style.color gives RGB string
  temp.remove();
  return {rgbaStr, rgba};
}

function RGBAFromArray(rgba) {
  return `rgb(${rgba.join(', ')})`;
}

function createSpokeChart(canvas, data, style={}) {
  const defaults = STYLE_DEFAULTS;
  style = { ...defaults, ...style };
  canvas.width = style.width;
  canvas.height = style.height;

  const AXIS_TEXT_GAP = 18;
  const CIRCLE_TEXT_GAP = 10;
  const PRECISION = 0;

  let centerPt = {x:style.width/2, y:style.height/2};
  const ctx = canvas.getContext("2d");
  let dataLength = data.length;
  let angleStep = (2 * Math.PI) / dataLength;
  let startAngle = -Math.PI / 2;

  // fill background color
  ctx.fillStyle = style.backgroundColor;
  ctx.fillRect(0, 0, style.width, style.height);

  // draw big circle
  ctx.lineWidth = style.bigCircleLineWidth;
  ctx.beginPath();
  ctx.strokeStyle = style.bigCircleColor;
  ctx.moveTo(centerPt.x + style.spokeLength, centerPt.y);
  ctx.arc(centerPt.x, centerPt.y, style.spokeLength, 0, Math.PI * 2, true)
  ctx.stroke();
  ctx.closePath();

  // draw axes
  let i = 0;
  for (let entry of data) {

    let cos = Math.cos(startAngle + angleStep * i);
    let sin = Math.sin(startAngle + angleStep * i);

    ctx.lineWidth = style.lineWidth;

    // lines
    ctx.beginPath();
    ctx.strokeStyle = style.spokeColor;
    ctx.moveTo(centerPt.x, centerPt.y);
    ctx.lineTo(centerPt.x + style.spokeLength * cos, centerPt.y + style.spokeLength * sin);
    ctx.stroke();
    ctx.closePath();

    // spoke labels
    ctx.textAlign = 'center';
    ctx.textBaseline='middle';
    ctx.fillStyle = style.spokeColor;
    ctx.font = style.spokeFont;
    const spokeLengthFactor = 1
    let rightVec = {x:sin, y:-cos};
    let spokeLabelPt = {x:centerPt.x + (AXIS_TEXT_GAP + style.spokeLength * spokeLengthFactor) * cos, y:centerPt.y + (AXIS_TEXT_GAP + style.spokeLength * spokeLengthFactor) * sin};
    ctx.fillText(`${entry.label}`, spokeLabelPt.x, spokeLabelPt.y);
    
    // distance lines
    ctx.lineWidth = style.lineWidth + 1.5;
    ctx.beginPath();
    let rgba = getRGBA(style.spokeColor).rgba;
    if (rgba.length == 3) rgba.push(1);
    rgba[3] = 1;
    let distanceColor = RGBAFromArray(rgba);
    ctx.strokeStyle = distanceColor;
    ctx.moveTo(centerPt.x, centerPt.y);
    ctx.lineTo(centerPt.x + entry.distance * cos, centerPt.y + entry.distance * sin);
    ctx.stroke();
    ctx.closePath();

    i++;
  }

  // draw data
  i = 0;
  for (let entry of data) {

    let cos = Math.cos(startAngle + angleStep * i);
    let sin = Math.sin(startAngle + angleStep * i);

    ctx.lineWidth = style.lineWidth;

    // circles
    ctx.beginPath();
    ctx.strokeStyle = style.circleColor;
    let circleCenterPt = {x:centerPt.x + entry.distance * cos, y:centerPt.y + entry.distance * sin};
    let circleStartPt = {x:circleCenterPt.x + entry.radius, y:circleCenterPt.y};
    ctx.moveTo(circleStartPt.x, circleStartPt.y);
    ctx.arc(circleCenterPt.x, circleCenterPt.y, entry.radius, 0, Math.PI * 2, true)
    ctx.stroke();
    ctx.closePath();

    // circle ticks
    ctx.beginPath()
    ctx.moveTo(circleStartPt.x, circleStartPt.y);
    // ctx.lineTo(circleStartPt.x + CIRCLE_TEXT_GAP * .7, circleStartPt.y);
    ctx.stroke();
    ctx.closePath()

    // distance labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.strokeStyle = style.circleColor;
    ctx.fillStyle = 'white';
    ctx.font = style.circleFont;
    ctx.lineWidth = 2;
    ctx.save();
    ctx.translate(circleCenterPt.x, circleCenterPt.y);
    ctx.rotate(Math.PI + startAngle + angleStep * i);
    // ctx.strokeText(`${entry.distance.toFixed(PRECISION)}`, 0, -style.lineWidth / 2 - 1);
    // ctx.fillText(`${entry.distance.toFixed(PRECISION)}`, 0, -style.lineWidth / 2 - 1);
    ctx.restore();

    // circle labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = style.circleColor;
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.font = style.circleFont;
    // let circleLabelPt = {x:circleStartPt.x + CIRCLE_TEXT_GAP, y:circleStartPt.y};
    let circleLabelPt = {x:circleCenterPt.x + (CIRCLE_TEXT_GAP + entry.radius) * cos, y:circleCenterPt.y + (CIRCLE_TEXT_GAP + entry.radius) * sin};
    // ctx.strokeText(`${entry.radius.toFixed(PRECISION)}`, circleLabelPt.x, circleLabelPt.y);
    // ctx.fillText(`${entry.radius.toFixed(PRECISION)}`, circleLabelPt.x, circleLabelPt.y);

    i++;
  }
}

function parseJson() {
  let res = null;
  try {
    res = JSON.parse(text_A.value);
  } catch(e) {
    output_el.innerHTML = "Error parsing json. " + e;
    throw e;
    // console.error(e);
  }

  return res;
}

function updateChart() {
  let res = parseJson();

  let data = res.data;
  let style = res.style;
  createSpokeChart(canvas, data, style);
  output_el.innerHTML = `${data.length} data points drawn.`;
}

setupEventListeners();
updateChart();