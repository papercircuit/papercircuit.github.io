const endTime = new Date();
const minutesPerPoint = 12;// SSCweb data for ACE and DSCOVR is resolution 720 = 12 minutes
const millisPerMinute = 60 * 1000;
const distanceToSun = 93000000; // miles
const radiusSun = 432690; // sun radius in miles
const distanceToL1 = 1000000; // distance to l1 from earth
const E = 8;
const sunGSE = [[155000000, 0, 0]]; // GSE coordinates of the sun
const earthGSE = [[0, 0, 0]]; // GSE coordinates of Earth
const sunEarthLine = [[0, 0, 0], [155000000, 0, 0]] // line from sun to earth with earth at origin
const l1 = 1600000; // L1 distance in miles
const sez2rad = Math.tan(toRadians(2)) * l1; // SEZ2 radius
const sez4rad = Math.tan(toRadians(4)) * l1; // SEZ4 radius
const sez2Deg = buildCircle(sez2rad, l1); // SEZ2 boundary
const sez4Deg = buildCircle(sez4rad, l1); // Build a circle for the SEZ4 boundary
let weeksPerOrbit = 26;  // # of samples, e.g., 26 weeks = months = 1 orbit
let radiusSunPx;
let startTime;
let aceData = [];
let dscovrData = [];
let dscovrBackgroundColor = [];
let aceBackgroundColor = [];
let pointsPerWeek = 7 * 24 * (60 / minutesPerPoint); // 7 days * 24 hours * 60 minutes / 12 minutes per point
let pointsPerDay = 7 * 24; // 7 days * 24 hours
let aceData3d;
let dscovrData3d;
let chart;
let alpha = Math.atan(radiusSun / distanceToSun);
let radiusSunAtL1 = distanceToL1 * Math.tan(alpha) * 1.6;



// Build a circle for the SEZ2 and SEZ4 boundaries
function buildCircle(radius, x) {
  let circleData = [];
  // this is the angle in radians
  for (let i = 0; i <= 360; i = i + 10) {  // <== Set circle resolution here
    // this is the x,y of the circle
    circleData.push([x, radius * Math.cos(toRadians(i)), radius * Math.sin(toRadians(i))]);
  }
  return circleData;
}

// convert degrees to radians
function toRadians(angle) {
  return angle * (Math.PI / 180);
}

// set how far back in time to go
function defineEndTime() {
  let end = endTime.getTime();
  // offset is made by the number of weeks per orbit * the number of milliseconds per week
  let offset = weeksPerOrbit * pointsPerWeek * minutesPerPoint * millisPerMinute;
  //convert hours to milliseconds. hours back in time.
  let start = end - offset;
  startTime = new Date(start);
}

// concatinate string to access SSC api
function convertTime(time) {
  let d = '' + time.getUTCFullYear() + zeroPad(time.getUTCMonth() + 1) + zeroPad(time.getUTCDate());
  let t = 'T' + zeroPad(time.getUTCHours()) + zeroPad(time.getUTCMinutes()) + zeroPad(time.getUTCSeconds()) + 'Z';
  return '' + d + t;
}

// pad single digit numbers with a leading zero
function zeroPad(num) {
  // if num is less than 10, add a leading zero
  return (num >= 0 && num < 10) ? '0' + num : num;
}

// compute the time range of data to request from NASA
defineEndTime();
const start = convertTime(startTime);
const end = convertTime(endTime);
let sscUrl = 'https://sscweb.gsfc.nasa.gov/WS/sscr/2/locations/ace,dscovr/' + start + ',' + end + '/';
// get the data from the SSC api
$.get(sscUrl, fetchData, 'json');


/**
 * 
 * @param {Array} positionData Spacecraft position data
 * 
 */

// fetch the data from the SSC api 
// https://sscweb.gsfc.nasa.gov/

function fetchData(positionData) {
  // get the ACE data
  // "size" in ACEsize and DSCOVRsize refers to the number of points in the data set
  // https://sscweb.gsfc.nasa.gov/WebServices/REST/#Get_Observatories
  let ace = {};
  let ACEsize = positionData.Result.Data[1][0].Time[1].length;
  ace.time_tag = positionData.Result.Data[1][0].Time[1];
  ace.x_gse = positionData.Result.Data[1][0].Coordinates[1][0].X[1];
  ace.y_gse = positionData.Result.Data[1][0].Coordinates[1][0].Y[1];
  ace.z_gse = positionData.Result.Data[1][0].Coordinates[1][0].Z[1];

  // push the data into the aceData array
  for (let i = 0; i < ACEsize; i++) {
    aceData.push({ source: 'ace', time: ace.time_tag[i][1], x_gse: ace.x_gse[i], y_gse: ace.z_gse[i], z_gse: ace.y_gse[i] });
  }

  // get the DSCOVR data
  let dscovr = {};
  let DSCOVRsize = positionData.Result.Data[1][0].Time[1].length;
  dscovr.time_tag = positionData.Result.Data[1][1].Time[1];
  dscovr.x_gse = positionData.Result.Data[1][1].Coordinates[1][0].X[1];
  dscovr.y_gse = positionData.Result.Data[1][1].Coordinates[1][0].Y[1];
  dscovr.z_gse = positionData.Result.Data[1][1].Coordinates[1][0].Z[1];

  // Swap Y GSE for Z to convert from GSE to local
  for (let i = 0; i < DSCOVRsize; i++) {
    dscovrData.push({ source: 'dscovr', time: dscovr.time_tag[i], x_gse: dscovr.x_gse[i], y_gse: dscovr.z_gse[i], z_gse: dscovr.y_gse[i] });
  }

  // clean up the data and reverse the time order      
  let tempAce = skipDuplicates(aceData);
  let tempDscovr = skipDuplicates(dscovrData);

  // subsample the data to improve rendering performance 
  aceData = subsample(tempAce);
  dscovrData = subsample(tempDscovr);


  // Convert an array of coordinate objects to an array of arrays
  function convertTo3d(data) {
    let result = [];
    for (const item of data) {
      // X = Y GSE
      // Y = Z GSE
      // Z = X GSE
      result.push([item.x_gse, item.y_gse, item.z_gse]);
    }
    return result;
  }

  aceData3d = convertTo3d(aceData);
  dscovrData3d = convertTo3d(dscovrData);

  // FEED DATA TO HIGHCHARTS
  chart.series[0].setData(aceData3d);
  chart.series[1].setData(dscovrData3d);
  chart.series[2].setData(earthGSE);
  chart.series[3].setData(sunGSE);
  chart.series[4].setData(sez2Deg);
  chart.series[5].setData(sez4Deg);
  chart.series[6].setData(sunEarthLine)
}

function skipDuplicates(input) {
  let results = [];  // the cleaned up and reversed array to be returned
  let i;
  let last;  // used to keep the last element examined

  // walk through the array in reverse order
  for (i = input.length - 1; i >= 0; i--) {

    // is this element is not the same as the last one? (assumes that dupliates are adjacent)
    if (input[i] !== last) {
      // not the same, so keep it by assigning to the array to be returned
      results.push(input[i]);
    }
    // retain this element for the next pass through the loop
    last = input[i];
  }

  // return the reversed array which does not contain duplicates
  return results;
}

function subsample(inputData) {
  let i;
  let outputData = [];


  for (i = 0; i < pointsPerWeek * weeksPerOrbit; i += pointsPerWeek) {
    outputData.push(inputData[i]);
  }
  return outputData;
}



// HIGHCHARTS CONFIGURATION BEGINS HERE

(function (H) {
  function create3DChart() {

    // Theme loads before data 
    Highcharts.theme = {
      title: {
        style: {
          color: 'rgb(220, 220, 220)',
          font: 'bold 30px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      subtitle: {
        style: {
          color: '#666666',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      legend: {
        itemStyle: {
          font: '10pt Trebuchet MS, Verdana, sans-serif',
          color: 'rgb(220, 220, 220)'
        },
        itemHoverStyle: {
          color: 'gray'
        }
      },
      chart: {
        // set background color to black
        backgroundColor: {
          color: 'rgb(0, 0, 0)'
        }
      }

    };
    Highcharts.setOptions(Highcharts.theme);

    // Set up the chart
    chart = new Highcharts.Chart({
      chart: {
        type: 'scatter3d',
        renderTo: 'container', // Target element id
        fitToPlot: 'true',
        reflow: 'false',

        // Spacing effects titles and legend only
        spacingTop: 20,
        spacingBottom: 10,
        spacingRight: 15,
        spacingLeft: 15,

        // Margin effects grid only 
        // KEEP SQUARE!
        marginTop: 80,
        marginBottom: 80,
        marginRight: 20,
        marginLeft: 20,

        // Final chart size in px 
        // KEEP SQUARE!
        height: 800,
        width: 800,

        // Chart background image
        // plotBackgroundImage: './imgs/twinkle.jpg',

        allowMutatingData: false,
        animation: true,

        // Set loading screen
        events: {
          load() {
            const chart = this;
            chart.showLoading('Fetching data from NASA...');
            setTimeout(function () {
              chart.hideLoading();
              chart.series[0].setData()
            }, 1700);
          }
        },

        options3d: {
          enabled: true,

          // Setting alpha and beta to zero puts earth on left and satellites on right. alpha rotates on the vertical axis. beta rotates on the horizontal axis.
          alpha: 0,
          beta: -90,

          // Depth effects scale!
          depth: 620,
          viewDistance: 10,

          frame: {
            left: { // Camera front
              visible: false,
            },
            right: { // Camera back
              visible: false,
            },

            front: { // Camera right
              visible: false,
            },
            back: { // Camera left
              visible: false,
            },
            top: {
              visible: false,
            },
            bottom: { // Camera bottom
              visible: false,
            }
          }
        }
      },

      // need to fix this
      exporting: {
        enabled: false,
      },

      title: {
        text: 'Satellite Orbit Visualization of ACE and DSCOVR'
      },

      subtitle: {
        text: 'Click and drag the plot area to rotate in space'
      },

      plotOptions: {
        scatter3d: {

          // animation on load only
          animation: true,
          animationLimit: 1000,
          animationDuration: 1000,
          turboThreshold: 0,
          marker: {
            radius: 1,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },

          // Set the style and default values for tooltips on hover
          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<span>{series.name}</span>',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <br>{point.x} GSE, <br> {point.y} GSE, <br>{point.z} GSE',
            footerFormat: '</p>',
            valueDecimals: 0, // Set decimals following each value in tooltip
          },
        }
      },

      // GSE 0 is at Earth.
      // X = Sun-Earth line
      // Y = Sun Earth ecliptic
      // Z = Up Down

      // X = Y GSE
      // Y = Z GSE
      // Z = X GSE

      yAxis: {
        min: -300000,
        floor: -300000,
        max: 300000,
        title: {
          text: 'GSE Z-axis'
        },

        opposite: true,
        labels: {
          skew3d: true,
          style: {
            color: 'rgba(200,200,200, 0.8)'
          }
        }
      },

      xAxis: {
        floor: 0,
        // min: 0,
        // max: 160000000,
        gridLineWidth: 1,
        title: {
          text: 'GSE X-axis'
        },
        opposite: false,
        labels: {
          skew3d: true,
          style: {
            color: 'rgba(200,200,200, 0.8)'
          }
        }
      },

      zAxis: {
        min: -300000,
        floor: -300000,
        max: 300000,
        title: {
          // SUN EARTH LINE
          text: 'GSE Y-axis'
        },
        opposite: false,
        labels: {
          skew3d: true,
          style: {
            color: 'rgba(200,200,200, 0.8)'
          }
        }
      },

      legend: {
        enabled: true,
        floating: true,
      },

      bubbleLegend: {
        color: 'blue',
      },

      // SERIES CONFIGURATION BEGINS HERE
      series: [
        {
          name: "ACE",
          lineWidth: 0.2,
          marker: {
            color: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, '#090979'], // start
                [0.5, '#790927'], // middle
                [1, '#793109'] // end
              ]
            },
            fillColor: 'purple',
            // symbol: 'circle',
            // symbol: 'url(imgs/1200px-ACE_spacecraft_model.png)', 
            // NEED TO CENTER
            radius: 5,

          }
        },

        {
          name: "DSCOVR",
          lineWidth: 0.2,
          zones: [{

            color: '#f7a35c'
          }, {
            value: 10,
            color: '#7cb5ec'
          }, {
            color: '#90ed7d'
          }],
          marker: {
            fillColor: 'red',
            symbol: 'circle',
            // symbol: 'url(imgs/DSCOVR_spacecraft_model.png)', NEED TO CENTER
            radius: 5,
          }
        },
        {
          name: "EARTH",
          lineWidth: 1,
          marker: {
            fillColor: 'blue',
            symbol: 'circle',
            // symbol: 'url(imgs/sun.jpeg)', NEED TO CENTER
            radius: 7,
          }

        },
        {
          name: "SUN",
          visible: false,
          lineWidth: 1,
          marker: {
            fillColor: 'yellow',
            symbol: 'circle',
            // symbol: 'url(imgs/sun.jpeg)', NEED TO CENTER
            radius: 8,
          }

        },

        {
          name: "SEZ 2.0 deg",
          lineWidth: 1,
          visible: true,
          marker: {
            enabled: false
          }

        },
        {
          name: "SEZ 4.0 deg",
          lineWidth: 1,
          visible: true,
          marker: {
            enabled: false
          }

        },

        {
          name: "Sun-Earth line",
          lineWidth: 1,
          visible: false,
          marker: {
            fillColor: 'orange',
            symbol: 'circle',
            // symbol: 'url(imgs/sun.jpeg)', NEED TO CENTER
            radius: 1,
          }
        }
        // SERIES CONFIGURATION ENDS HERE
      ]
    });
  }


  // Bubble fader function (not working)
  function bubbleFader(dataPoints, backgroundColors, colors, spaceCraft) {
    // console.log('bubbleFader dataPoints.length ' + dataPoints.length);
    let i;
    for (i = 0; i < dataPoints.length; i++) {
      // let bubbleRadius = 0.1 + Math.abs((i - dataPoints.length)) ** E / (dataPoints.length) ** E;
      let d = { x: dataPoints[i].y_gse, y: dataPoints[i].z_gse, r: 6 };
      // chartDataBubble.datasets[spaceCraft].data.push(d);

      //console.log('alpha ' + ((dataPoints.length-i)/ dataPoints.length));
      backgroundColors.push(colors + ((dataPoints.length - i) / dataPoints.length) + ')');
      //console.log('color[' + i + '] ' + backgroundColors[backgroundColors.length-1]);

      let d2 = { x: dataPoints[i].y_gse, y: dataPoints[i].z_gse };
      console.log("chartDataLine " + chartDataLine)
      chartDataLine.datasets[spaceCraft].data.push(d2);

    }
    // chartDataBubble.datasets[spaceCraft].backgroundColors = backgroundColors;
  }


  // Make the chart draggable
  function dragStart(eStart) {
    eStart = chart.pointer.normalize(eStart);

    let posX = eStart.chartX,
      posY = eStart.chartY,
      alpha = chart.options.chart.options3d.alpha,
      beta = chart.options.chart.options3d.beta,
      sensitivity = 5,  // lower is more sensitive
      handlers = [];

    function drag(e) {
      // Get e.chartX and e.chartY
      e = chart.pointer.normalize(e);

      chart.update({
        chart: {
          options3d: {
            alpha: alpha + (e.chartY - posY) / sensitivity,
            beta: beta + (posX - e.chartX) / sensitivity
          }
        }
      }, undefined, undefined, false);
    }

    function unbindAll() {
      handlers.forEach(function (unbind) {
        if (unbind) {
          unbind();
        }
      });
      handlers.length = 0;
    }

    handlers.push(H.addEvent(document, 'mousemove', drag));
    handlers.push(H.addEvent(document, 'touchmove', drag));

    handlers.push(H.addEvent(document, 'mouseup', unbindAll));
    handlers.push(H.addEvent(document, 'touchend', unbindAll));
  }

  create3DChart();
  H.addEvent(chart.container, 'mousedown', dragStart);
  H.addEvent(chart.container, 'touchstart', dragStart);


}(Highcharts));

