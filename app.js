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
   return element;
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
let notificationMessage;
let numberOfMessages;

// counter used in to remove and translate the notifications
let i;

let messages = [
   `<p><strog>Victora</strog> commented WebApp's Tips</p>
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
   `,
   `<p><strog>New Memeber</strog> Victoria Chambers</p>
   <p class="notification-close-btn"> X </p>
   `,
   `<p><strog>New Memeber</strog> Dawn Wood</p>
   <p class="notification-close-btn"> X </p>
   `,
   `<p><strog>New Memeber</strog> Dan Oliver</p>
   <p class="notification-close-btn"> X </p>
   `];

// Creates random notifications when the users clicks the notification bell
// It chooses a random number of notification to show and to each a random message
// taken from the array above
notificationBell.addEventListener("click" , () => {
   numberOfMessages = generateRandomNumber(3,1);

   for (let i=0; i<=numberOfMessages; i++ ) {
      contentMessage = messages[generateRandomNumber(messages.length,0)];
      createNewElement ('div', contentMessage, 'notification-message', notificationArea)
      let topDistance = 45 + 40 * i;
      element.style.top = `${topDistance.toString()}px`;
   }
   notificationMessage = document.querySelectorAll(".notification-message");
   notificationDot.classList.remove('notification-link');
   i = 1;
});

// eliminate the notification when the respective x is clicked
document.addEventListener('click', (e) => {
   const element = e.target;
   let elementNext = element.parentElement.nextElementSibling;

   if (element.classList.contains("notification-close-btn")) {
      element.parentElement.remove();

         // selects the sibling notification Divs and translate the upward once the 
         // preceding notification is eliminated
         while (elementNext) {
            if (elementNext.className == "notification-message") {
               if (i > 1) {
                  elementNext.style.removeProperty("transform");
               }
               elementNext.style.transform = `translateY(${-40*i}px)`;
            } 
            elementNext = elementNext.nextElementSibling;
         }
      i ++;
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
const messageUserForm = document.querySelector('#message-user');
const search = document.querySelector("#search-for-user");
const message = document.querySelector("#message-for-user");
const send = document.querySelector("#btn-send-message");
let users = document.querySelectorAll(".member-name");
let searchResult = [];
let searchString = "";
let suggestions = [];

// autocomplete option for the search field

search.addEventListener('keyup', (e) => {

   // Pushes all the keys entered by the user into an array and removes the last entry if 
   // Backspace is pressed
   if (e.key !== "Backspace") {
      searchString += e.key;
   } else {
      // searchString = searchString.slice(0, searchString.length - 1);
      searchString = search.value;
   }

   // Check if any suggestion Div is already on the screen and removes them to get ready for the
   // newlY entered key i.e. generated string
   if (suggestions.length > 0) {
      for (i = 0; i < suggestions.length; i++) {
      suggestions[i].parentNode.removeChild(suggestions[i]);
      }
      suggestions = [];
   }

   // exits this function if the input is empty, following backspaces
   if (searchString === "") return;
   
   // Check if the input matches any user in the users array and pushes the matching user
   // into a search resul
   for (let i = 0; i < users.length; i ++) {
      if (users[i].innerHTML.toLowerCase().startsWith(searchString.toLowerCase())) {
         searchResult.push(users[i].innerHTML);
      }
   }

   // Creates a new div for each of the search result from the previous block of code
   for (let i = 0; i < Math.min(searchResult.length, 6); i++) {
      let userResult = `<p>${searchResult[i]}</p>`
      createNewElement ('div', userResult, 'suggestion', messageUserForm)
      let topDistance = 85 + 40 * i;
      element.style.top = `${topDistance.toString()}px`;
   }

   suggestions = document.querySelectorAll('.suggestion');
   searchResult = [];

}); 

// it sets the value of the search field if the user clicks on any one of the suggestions
document.addEventListener('click', (e) => {   
   let selection = e.target;
   if (selection.parentElement.className === 'suggestion') {
      search.value = selection.innerText;
      for (i = 0; i < suggestions.length; i++) {
         suggestions[i].parentNode.removeChild(suggestions[i]);
      }
      suggestions = [];
   }
});

// Validates the form before sending the message
send.addEventListener('click', (e) => {
   if (search.value === "" && message.value ==="") {
      e.preventDefault();
      fieldValidationVisualError(search);
      fieldValidationVisualError(message);
      alert("Please fill out the User and Message Fiels before Sending");
   } else if (search.value === "") {
      e.preventDefault();
      fieldValidationVisualError(search);
      alert("Please fill out the User Fiel before Sending");
   } else if (message.value === "") {
      e.preventDefault();
      fieldValidationVisualError(message);
      alert("Please fill out the Message Fiel before Sending");
   } else {
      alert(`Message successfully sent to: ${search.value}`);
   } 
});

// Hilights form's fields if the validation returns an error
function fieldValidationVisualError(field) {
   field.style.borderColor = 'red';
   field.style.borderWidth = '3px';
}


// === Settings Section === //
let sendNotificationsSlider = document.querySelector("#switch-1");
let setPublicProfileSlider = document.querySelector("#switch-2");
let timeZoneOption = document.querySelector("#time-zone");
const saveSettings = document.querySelector("#btn-save-settings");
const discardSettings = document.querySelector("#btn-discard-settings");

//  Variables for local storage
let sendNotifications;
let setPublicProfile;
let timeZone;

// Reset settings
discardSettings.addEventListener('click', (e) => {
   localStorage.clear();
   sendNotificationsSlider.checked = false;
   setPublicProfileSlider.checked = false;
   timeZoneOption.value = "None"; 
   e.preventDefault();
   alert("All the settings has been Reset");
});


// Initialize and set the stored settings
getCurrentSetings();
setCurrentSettings();

// Retrieve settings from Local Storage
function getCurrentSetings() {
  sendNotifications = JSON.parse(localStorage.getItem('sendNotifications'));
  setPublicProfile = JSON.parse(localStorage.getItem('setPublicProfile'));
  timeZone = localStorage.getItem('timeZone');

}

// Sets the retrived settings to the page
function setCurrentSettings() {
   if (sendNotifications)  {
      sendNotificationsSlider.checked = true;
   } else {
      sendNotificationsSlider.checked = false;
   }

   if (setPublicProfile) {
      setPublicProfileSlider.checked = true;
   } else {
      setPublicProfileSlider.checked = false;
   }

   if (timeZone != null && timeZone !== "None") {
      timeZoneOption.value = timeZone; 
   } else {
      timeZoneOption.value = "None";
   }
   
}

// Stores the new setting in local Storage and alerst the user about the changes
saveSettings.addEventListener('click', (e) => {
   
   if (sendNotificationsSlider.checked) {
      localStorage.setItem('sendNotifications', 'true');
   } else {
      localStorage.setItem('sendNotifications', 'false');
   }
   if (setPublicProfileSlider.checked) {
      localStorage.setItem('setPublicProfile', 'true');
   }  else {
      localStorage.setItem('setPublicProfile', 'false');
   }
   if (timeZoneOption.value !== "Not Set") {
      localStorage.setItem('timeZone', timeZoneOption.value);
   } 
   alert(`Your new settings has been saved:
      Send Email Notification: ${localStorage.getItem("sendNotifications")}
      Set Profile to Public: ${localStorage.getItem("setPublicProfile")}
      Timezone: ${timeZoneOption.value}
   `);
   e.preventDefault();
});

