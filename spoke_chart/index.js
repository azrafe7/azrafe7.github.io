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
    lineWidth:4, 
    spokeColor:'#f00', 
    circleColor:'#000', 
  }
};

let text_A = document.querySelector('#text_A');
let canvas = document.querySelector('canvas#chart');

let compare_button = document.querySelector('#compare-button');
let format_button = document.querySelector('#format-button');
let strict_checkbox = document.querySelector('#strict_order_check');
let strict_label = document.querySelector('label[for="strict_order_check"]');

let output_el = document.querySelector('#output');

strict_checkbox.style.display = "none";
strict_label.style.display = "none";

text_A.value = JSON.stringify(responseA, undefined, '  ');


function setupEventListeners() {
  format_button.addEventListener('click', (evt) => {
    responseA = parseJson();
    
    text_A.value = JSON.stringify(responseA, undefined, '  ');
  });

  compare_button.addEventListener('click', (evt) => {
    updateChart();
  });
}

function createSpokeChart(canvas, data, style={}) {
  const defaults = { width:400, height:400, lineWidth:4, spokeColor:'#f00', circleColor:'#000', spokeLength:180 };
  style = { ...defaults, ...style };
  canvas.width = style.width;
  canvas.height = style.height;

  let centerPt = {x:style.width/2, y:style.height/2};
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = style.lineWidth;
  let dataLength = data.length;
  let i = 0;
  let angleStep = (2 * Math.PI) / dataLength;
  let startAngle = -Math.PI / 2;
  for (let entry of data) {
    
    let cos = Math.cos(startAngle + angleStep * i);
    let sin = Math.sin(startAngle + angleStep * i);
    
    // lines
    ctx.beginPath();
    ctx.strokeStyle = style.spokeColor;
    ctx.moveTo(centerPt.x, centerPt.y);
    ctx.lineTo(centerPt.x + style.spokeLength * cos, centerPt.y + style.spokeLength * sin);
    ctx.stroke();
    ctx.closePath();
    
    // circles
    ctx.beginPath();
    ctx.strokeStyle = style.circleColor;
    let circleCenterPt = {x:centerPt.x + entry.distance * cos, y:centerPt.y + entry.distance * sin};
    let circleStartPt = {x:circleCenterPt + entry.distance, y:circleCenterPt.y};
    ctx.moveTo(circleStartPt.x, circleStartPt.y);
    ctx.arc(circleCenterPt.x, circleCenterPt.y, entry.radius, 0, Math.PI * 2, true)
    ctx.stroke();
    ctx.closePath();

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