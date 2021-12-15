// General Variables
let trafficCanvas = document.getElementById('chart-traffic');
let dailyCanvas = document.getElementById('chart-daily-traffic');
let mobileUsersCanvas = document.getElementById('chart-mobile-users');

let trafficScales = document.querySelector(".traffic-scales");
let trafficScale = document.querySelectorAll(".traffic-scale");

// === Reusable Functions === //

// Generates a random numbers given the upper and lower limits
function generateRandomNumber (upper, lower = 0) {
   let randomNumber = Math.floor(Math.random() * (upper - lower) ) + lower;
   return randomNumber;
}

// Reusable function to create new elements and append 
function createNewElement (elementName, content, className, appendTo) {
   element = document.createElement(elementName);
   element.className = className;
   element.innerHTML = content;
   appendTo.appendChild(element);
}

// === charts datas === //

// Data for the traffic chart at different time scales
// Hourly Data
let trafficHourlyLabel = ['00AM-01AM', '01AM-02AM', '02AM-03AM', '03AM-04AM', '04AM-05AM', '05AM-06AM', '06AM-07AM', '07AM-08AM', '08AM-09AM', '09AM-10AM', '10AM-11AM', '11AM-12PM',
'12PM-01PM', '01PM-02PM', '02PM-03PM', '03PM-04PM', '04PM-05PM', '05PM-06PM', '06PM-07PM', '07PM-08PM', '08PM-09PM', '09PM-10PM', '10PM-11PM', '11PM-12AM'];
let trafficHourlyData = [20, 18, 12, 5, 2, 10, 15, 17, 35, 40, 20, 20, 
    30, 25, 20, 15, 10, 30, 35, 25, 30, 40, 50, 35];

// Daily Data
let trafficDailyLabel = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let trafficDailyData = [75, 115, 175, 125, 225, 200, 100];

//  Default data structure for the chart set to the weekly scale
const weekly = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        label: '# of Votes',
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: 'rgba(116,119,191 , 0.3)',
        borderWidth: 1
    }]
 };

//  Weekly data extrapolated from the default data structure
let trafficWeeklyLabel = weekly.labels;
let trafficWeeklyData = weekly.datasets[0].data;

// Monthly data
let trafficMonthlyLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let trafficMonthlyData = [9000, 3200, 4000, 8100, 7000, 3550, 8350, 7500, 8800, 5500, 6000, 10000];

let trafficData = weekly;

// It swap the data in the traffic chart
function swapData (chart, label, data) {
    // Remove the old data
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    // Add the New data
    for (let i = 0; i < label.length; i++) {
        chart.data.labels.push(label[i]);
        chart.data.datasets[0].data.push(data[i]);
    }
   
    chart.update();
}

// It swap the data upon selection of the time scale button
trafficScales.addEventListener('click', (e) => {
   let scale = e.target;

   // removing the active class from the buttons
   for (let i =0; i < trafficScale.length; i++) {
      trafficScale[i].classList.remove("active");
   }

    if (scale.innerText === 'Hourly') {
        swapData(trafficChart, trafficHourlyLabel, trafficHourlyData);
    } else if (scale.innerText === 'Daily') {
        swapData(trafficChart, trafficDailyLabel, trafficDailyData);
    } else if (scale.innerText === 'Weekly') {
        swapData(trafficChart, trafficWeeklyLabel, trafficWeeklyData);
    } else {
        swapData(trafficChart, trafficMonthlyLabel, trafficMonthlyData);
    }

    scale.classList.add("active");
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

// === Chart Options === //
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

// === Creating Chart folowing chart.js requirements === //
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

// === Notifications === //
const notificationBell = document.querySelector("#notification-bell");
const notificationArea = document.querySelector("header");
const notificationDot = document.querySelector(".notification-link");

let messages = [
   `<p><strog>Victora</strog> commented WebApp's SEO Tips</p>
   <p class="notification-close-btn"> X </p>
   `,
   `<p><strog>Dale</strog> Liked the Post</p>
   <p class="notification-close-btn"> X </p>
   `, 
   `<p><strog>Dan</strog> Poset WebApp's SEO Tips</p>
   <p class="notification-close-btn"> X </p>
   `,
   `<p><strog>New Memeber</strog> Dale Byrd</p>
   <p class="notification-close-btn"> X </p>
   `];

notificationBell.addEventListener("click" , () => {
   let numberOfMessages = generateRandomNumber(4,2);
   for (let i=1; i<=numberOfMessages; i++ ) {
      contentMessage = messages[generateRandomNumber(4,1)];
      classToAssign = `notification-message${i}`;
      createNewElement("div", contentMessage, classToAssign, notificationArea);
   }
   notificationDot.classList.remove('notification-link');
});

// eliminate the notification when the respective x is clicked
document.addEventListener('click', (e) => {
   const element = e.target;
   if (element.classList.contains("notification-close-btn")) {
      element.parentElement.remove();
   }
});

// Shows the dot on the bell to signify new notifications
setInterval(notificationInterval, 15000); 

function notificationInterval () {
   if (notificationDot.className !== 'notification-link') 
   notificationDot.classList.add('notification-link');
   
}

// === Banner === //
const alertBanner = document.querySelector("#alert");
alertBanner.innerHTML = 
`
<p><strog>Alert:</strog>You have <strog> ${generateRandomNumber(10,2)} </strog> unread messages</p>
<p class="alert-close-btn">X</p>
`;

alertBanner.addEventListener('click', e => {
   const element = e.target;
   if (element.classList.contains("alert-close-btn")) {
      alertBanner.style.display = "none";
   }
});

// === Messagig Section === //
const user = document.querySelector("#search-for-user");
const message = document.querySelector("#message-for-user");
const send = document.querySelector("#btn-send-message");

// Validates the form before sending the message
send.addEventListener('click', (e) => {
   if (user.value === "" && message.value ==="") {
      e.preventDefault();
      fieldValidationVisualError(user);
      fieldValidationVisualError(message);
      alert("Please fill out the User and Message Fiels before Sending");
   } else if (user.value === "") {
      e.preventDefault();
      fieldValidationVisualError(user);
      alert("Please fill out the User Fiel before Sending");
   } else if (message.value === "") {
      e.preventDefault();
      fieldValidationVisualError(message);
      alert("Please fill out the Message Fiel before Sending");
   } else {
      alert(`Message successfully sent to: ${user.value}`);
   } 
});

// Hilights form's fields if the validation returns an error
function fieldValidationVisualError(field) {
   field.style.borderColor = 'red';
   field.style.borderWidth = '3px';
}


// === Settings Section === //
let sendNotifications = document.querySelector("#switch-1");
let setPublicProfile = document.querySelector("#switch-2");
const timeZone = document.querySelector("#time-zone");
const saveSettings = document.querySelector("#btn-save-settings");

saveSettings.addEventListener('click', () => {
   if (sendNotifications.checked) {
      sendNotifications = "Active"
   } else {
      sendNotifications = "Not Active"
   }
   if (setPublicProfile.checked) {
      setPublicProfile = "Active";
   }  else {
      setPublicProfile = "Not Active";
   }
   
   alert(`Your new settings has been saved:
      Send Email Notification: ${sendNotifications}
      Set Profile to Public: ${setPublicProfile}
      Timezone: ${timeZone.value}
   `);
   
});

