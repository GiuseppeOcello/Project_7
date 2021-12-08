



let trafficCanvas = document.getElementById('chart-traffic');
let dailyCanvas = document.getElementById('chart-daily-traffic');
let mobileUsersCanvas = document.getElementById('chart-mobile-users');

let trafficScale = document.querySelector(".traffic-scales");

const hourly = {
   labels: ['00AM-01AM', '01AM-02AM', '02AM-03AM', '03AM-04AM', '04AM-05AM', '05AM-06AM', '06AM-07AM', '07AM-08AM', '08AM-09AM', '09AM-10AM', '10AM-11AM', '11AM-12PM',
            '12PM-01PM', '01PM-02PM', '02PM-03PM', '03PM-04PM', '04PM-05PM', '05PM-06PM', '06PM-07PM', '07PM-08PM', '08PM-09PM', '09PM-10PM', '10PM-11PM', '11PM-12AM'],
   datasets: [{
       label: '# of Votes',
       data: [20, 18, 12, 5, 2, 10, 15, 17, 35, 40, 20, 20, 
              30, 25, 20, 15, 10, 30, 35, 25, 30, 40, 50, 35],
       backgroundColor: 'rgba(116,119,191 , 0.3)',
       borderWidth: 1
   }]
};

// const daily = {
//    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
//    datasets: [{
//        label: '# of Votes',
//        data: [75, 115, 175, 125, 225, 200, 100],
//        backgroundColor: 'rgba(116,119,191 , 0.3)',
//        borderWidth: 1
//    }]
// };

let trafficDailyLabel = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let trafficDailyData = [75, 115, 175, 125, 225, 200, 100];

const weekly = {
   labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
   datasets: [{
       label: '# of Votes',
       data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
       backgroundColor: 'rgba(116,119,191 , 0.3)',
       borderWidth: 1
   }]
};

const monthly = {
   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
   datasets: [{
       label: '# of Votes',
       data: [9000, 3200, 4000, 8100, 7000, 3550, 8350, 7500, 8800, 5500, 6000, 10000],
       backgroundColor: 'rgba(116,119,191 , 0.3)',
       borderWidth: 1
   }]
};

let trafficData = weekly;

function addData(chart, label, data) {

   for (let i = 0; i < label.length; i++) {
   chart.data.labels.push(label[i]);
   
   chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data[i]);
  });
   }
   chart.update();
}

function removeData(chart) {
   chart.data.labels = [];
   chart.data.datasets = [];
   chart.update();
}

trafficScale.addEventListener('click', (e) => {
   let scale = e.target;

   if (scale.innerHTML === 'Hourly') {
      trafficData = hourly;
   } else if (scale.innerHTML === 'Daily') {
      removeData(trafficChart);
      addData(trafficChart, trafficDailyLabel, trafficDailyData);
      // addData(trafficChart, "june", 50);
   } else if (scale.innerHTML === 'Weekly') {
      trafficData = weekly;
   } else {
      trafficData = monthly;
   }
});


let dailyData = {
   labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
   datasets: [{
       label: '# of Hits',
       data: [75, 115, 175, 125, 225, 200, 100],
       backgroundColor: '#7477BF',
       borderWidth: 1
   }]
};

let mobileUsersData = {
   labels: ['Desktop', 'Tablet', 'Phones'],
   datasets: [{
       label: '# of Users',
       data: [2000, 550, 500],
       backgroundColor: [
          '#7477BF',
          '#78cf82',
          '#51b6c8'
       ],
       borderWidth: 0
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

let dailyOptions = {
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

let mobileUsersOptions = {
   aspectRatio: 1.9,
   plugins: {
     legend: {
        position: 'right',
        labels: { 
         boxWidth: 20,
         fontoStyle: 'bold'
        }
     }
  }

};

let trafficChart= new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});

let dailyChart= new Chart(dailyCanvas, {
   type: 'bar',
   data: dailyData,
   options: dailyOptions
});

let mobileUsersChart= new Chart(mobileUsersCanvas, {
   type: 'doughnut',
   data: mobileUsersData,
   options: mobileUsersOptions
});

// Messagig Section
const user = document.querySelector("#search-for-user");
const message = document.querySelector("#message-for-user");
const send = document.querySelector("#btn-send-message");

send.addEventListener('click', () => {
   if (user.value === "" && message.value ==="") {
      alert("Please fill out the User and Message Fiels before Sending");
   } else if (user.value === "") {
      alert("Please fill out the User Fiel before Sending");
   } else if (message.value === "") {
      alert("Please fill out the Message Fiel before Sending");
   } else {
      alert(`Message successfully sent to: ${user.value}`);
   } 
});

// Banner
const alertBanner = document.querySelector("#alert");

alertBanner.innerHTML = 
`
<p><strog>Alert:</strog>You have <strog> 6 </strog> unread messages</p>
<p class="alert-close-btn">X</p>
`;

alertBanner.addEventListener('click', e => {
   const element = e.target;
   if (element.classList.contains("alert-close-btn")) {
      alertBanner.style.display = "none";
   }
});