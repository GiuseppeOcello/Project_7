



let trafficCanvas = document.getElementById('chart-traffic');

let trafficData = {
   labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
   datasets: [{
       label: '# of Votes',
       data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
       backgroundColor: 'rgba(116,119,191 , 0.3)',
       borderWidth: 1
   }]
};

let trafficOptions = {
   backgroundColor: 'rgpa(112, 104 , 201, .5)',
   fill: true,
   aspectRatio: 2.5,
   animation: {
      duration: 0
   },
   scales: {
      y: {
          beginAtZero: true
      }
  },
  plugins: {
     legend: {
        display: false
     }
  }

};

let trafficChart= new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});