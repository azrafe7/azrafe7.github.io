'use strict';

let responseA = {
  data: [
    {distance: 5, radius:2.5, label:'Safety', labelPt:DEFAULT_SPOKE_LABELS_PTS[0]},
    {distance: 6, radius:1.5, label:'Climate', labelPt:DEFAULT_SPOKE_LABELS_PTS[1]},
    {distance: 7, radius:2.2, label:'Attainment', labelPt:DEFAULT_SPOKE_LABELS_PTS[2]},
    {distance: 5, radius:3.5, label:'Leadership', labelPt:DEFAULT_SPOKE_LABELS_PTS[3]},
    {distance: 4, radius:3.2, label:'Engagement', labelPt:DEFAULT_SPOKE_LABELS_PTS[4]},
  ],
  style: {
    width:500,
    height:500,
    spokeLength:180,
    lineWidth:3,
    spokeColor:'rgb(255, 0, 0)',
    circleColor:'#000',
  }
};
responseA.style = {...STYLE_DEFAULTS, ...responseA.style};

let textA = document.querySelector('#textA');
let canvas = document.querySelector('canvas#chart');

let downloadButton = document.querySelector('#download-button');
let updateButton = document.querySelector('#update-button');
let formatButton = document.querySelector('#format-button');
let randomizeButton = document.querySelector('#randomize-button');
let randomizeCheckbox = document.querySelector('#randomize-check');
let randomizeLabel = document.querySelector('label[for="randomize-check"]');
let autofitCheckbox = document.querySelector('#autofit-check');
let autofitLabel = document.querySelector('label[for="autofit-check"]');

let outputEl = document.querySelector('#output');

// randomizeCheckbox.style.display = "none";
// randomizeLabel.style.display = "none";

textA.value = JSON.stringify(responseA, undefined, '  ');

function setupEventListeners() {
  formatButton.addEventListener('click', (evt) => {
    responseA = parseJson();

    textA.value = JSON.stringify(responseA, undefined, '  ');
    outputEl.innerHTML = `Textarea JSON formatted (${responseA.data.length} data points).`;
  });

  randomizeButton.addEventListener('click', (evt) => {
    let {data, style} = getRandomizedChartValues({randomizeColor:randomizeCheckbox.checked, autofit:autofitCheckbox.checked});
    
    responseA = {
      data: data,
      style: style,
    };

    textA.value = JSON.stringify(responseA);
    formatButton.click();
    updateChart();
  });

  autofitCheckbox.addEventListener('change', (evt) => {
    responseA = parseJson();
    responseA.style.autofit = autofitCheckbox.checked;

    textA.value = JSON.stringify(responseA);
    formatButton.click();
    updateChart();
  });
  
  updateButton.addEventListener('click', (evt) => {
    updateChart();
  });
  
  document.addEventListener('keydown', (evt) => {
    if ((evt.ctrlKey || evt.metaKey) && (evt.keyCode == 13 || evt.keyCode == 10)) {
      // Command + Enter or Ctrl + Enter pressed
      updateChart();
    }
    if (evt.altKey && evt.which == 82) {
      // Alt + R
      randomizeButton.click();
    }
    if (evt.altKey && evt.which == 65) {
      // Alt + A
      autofitCheckbox.click();
    }

  });
}

function parseJson() {
  let res = null;
  try {
    res = JSON.parse(textA.value);
  } catch(e) {
    outputEl.innerHTML = "Error parsing json. " + e;
    throw e;
    // console.error(e);
  }

  return res;
}

function updateChart() {
  let res = parseJson();

  let data = res.data;
  let style = res.style;
  let chartInfo = createSpokeChart(canvas, data, style);
  // console.log('chartInfo:', chartInfo);
  
  autofitCheckbox.checked = style.autofit;
  autofitLabel.classList.toggle('red', chartInfo.isPartiallyOnScreen);
  autofitLabel.classList.toggle('green', !chartInfo.isPartiallyOnScreen);
  outputEl.innerHTML = `${data.length} data points drawn (isPartiallyOnScreen:<b>${chartInfo.isPartiallyOnScreen}</b>).`;
  
  let dataUrl = canvas.toDataURL('image/png');
  downloadButton.href = dataUrl;
}

setupEventListeners();
updateChart();