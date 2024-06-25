'use strict';

let responseA = {
  data: [
    {distance: 100, radius:30},
    {distance: 50, radius:10},
    {distance: 60, radius:30},
    {distance: 90, radius:50},
    {distance: 120, radius:50},
  ],
  style: {
    width:400, 
    height:400, 
    spokeLength:180,
    lineWidth:3, 
    spokeColor:'#f00', 
    circleColor:'#000', 
  }
};

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
    style.spokeLength = style.width * .4;
    let randomizeColor = strict_checkbox.checked;
    if (randomizeColor) {
      style.spokeColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      style.circleColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    style.lineWidth = 1 + parseInt(Math.random() * 6);
    
    let dataLength = 3 + parseInt(1 + Math.random() * 7);
    if (Math.random() < .4) dataLength = 5;
    let data = [];
    for (let d = 0; d < dataLength; d++) {
      let entry = {};
      entry.distance = Math.random() * style.spokeLength;
      entry.radius = Math.random() * style.spokeLength * .8;
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

function createSpokeChart(canvas, data, style={}) {
  const defaults = { width:400, height:400, lineWidth:2, spokeColor:'#f00', circleColor:'#000', spokeLength:180, 
                     spokeFont:'bold 14px monospace', circleFont:'12px monospace' };
  style = { ...defaults, ...style };
  canvas.width = style.width;
  canvas.height = style.height;

  const AXIS_TEXT_GAP = 8;
  const CIRCLE_TEXT_GAP = 5;
  const PRECISION = 0;
  
  let centerPt = {x:style.width/2, y:style.height/2};
  const ctx = canvas.getContext("2d");
  let dataLength = data.length;
  let angleStep = (2 * Math.PI) / dataLength;
  let startAngle = -Math.PI / 2;

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
    
    // spoke label
    ctx.textAlign = 'center';
    ctx.textBaseline='middle';
    ctx.fillStyle = style.spokeColor;
    ctx.font = style.spokeFont;
    ctx.save();
    ctx.translate(centerPt.x + (AXIS_TEXT_GAP + style.spokeLength) * cos, centerPt.y + (AXIS_TEXT_GAP + style.spokeLength) * sin);
    ctx.rotate(Math.PI * .5 + startAngle + angleStep * i);
    ctx.fillText(`axis ${i}`, 0, 0);
    ctx.restore();

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
    
    // distance label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.strokeStyle = style.circleColor;
    ctx.fillStyle = 'white';
    ctx.font = style.circleFont;
    ctx.lineWidth = 2;
    ctx.save();
    ctx.translate(circleCenterPt.x, circleCenterPt.y);
    ctx.rotate(Math.PI + startAngle + angleStep * i);
    ctx.strokeText(`${entry.distance.toFixed(PRECISION)}`, 0, -1);
    ctx.fillText(`${entry.distance.toFixed(PRECISION)}`, 0, -1);
    ctx.restore();

    // circle label
    ctx.textAlign = 'start';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = style.circleColor;
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.font = style.circleFont;
    ctx.strokeText(`${entry.radius.toFixed(PRECISION)}`, (circleStartPt.x + CIRCLE_TEXT_GAP), circleStartPt.y);
    ctx.fillText(`${entry.radius.toFixed(PRECISION)}`, (circleStartPt.x + CIRCLE_TEXT_GAP), circleStartPt.y);

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