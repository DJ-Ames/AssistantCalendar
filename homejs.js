const date = new Date(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

const renderCalendar = () => { // https://www.youtube.com/watch?v=o1yMqPyYeAo
  date.setDate(1); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const monthDays = document.querySelector(".days"); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const lastDay = new Date( // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getFullYear(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getMonth() + 1, // https://www.youtube.com/watch?v=o1yMqPyYeAo
    0 // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ).getDate(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const prevLastDay = new Date( // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getFullYear(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getMonth(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    0 // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ).getDate(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const firstDayIndex = date.getDay(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const lastDayIndex = new Date( // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getFullYear(), // https://www.youtube.com/watch?v=o1yMqPyYeAo
    date.getMonth() + 1, // https://www.youtube.com/watch?v=o1yMqPyYeAo
    0 // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ).getDay(); // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const nextDays = 7 - lastDayIndex - 1; // https://www.youtube.com/watch?v=o1yMqPyYeAo

  const months = [ // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "January", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "February", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "March", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "April", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "May", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "June", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "July", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "August", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "September", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "October", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "November", // https://www.youtube.com/watch?v=o1yMqPyYeAo
    "December", // https://www.youtube.com/watch?v=o1yMqPyYeAo
  ];

  document.querySelector(".date h2").innerHTML = months[date.getMonth()]; // https://www.youtube.com/watch?v=o1yMqPyYeAo edited

  document.querySelector(".date p").innerHTML = new Date().toDateString(); // https://www.youtube.com/watch?v=o1yMqPyYeAo edited

  document.querySelector(".date h1").innerHTML = date.getFullYear(); 

  let days = ""; // https://www.youtube.com/watch?v=o1yMqPyYeAo

  for (let x = firstDayIndex; x > 0; x--) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
  } 

  for (let i = 1; i <= lastDay; i++) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
    if ( // https://www.youtube.com/watch?v=o1yMqPyYeAo
      i === new Date().getDate() && // https://www.youtube.com/watch?v=o1yMqPyYeAo
      date.getMonth() === new Date().getMonth() // https://www.youtube.com/watch?v=o1yMqPyYeAo
    ) {
      days += `<div class="today">${i}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
    } else { // https://www.youtube.com/watch?v=o1yMqPyYeAo
      days += `<div>${i}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
    }
  }

  for (let j = 1; j <= nextDays; j++) { // https://www.youtube.com/watch?v=o1yMqPyYeAo
    days += `<div class="next-date">${j}</div>`; // https://www.youtube.com/watch?v=o1yMqPyYeAo
  }
  monthDays.innerHTML = days; // https://www.youtube.com/watch?v=o1yMqPyYeAo
};

document.querySelector(".prev").addEventListener("click", () => { // https://www.youtube.com/watch?v=o1yMqPyYeAo
  date.setMonth(date.getMonth() - 1); // https://www.youtube.com/watch?v=o1yMqPyYeAo
  renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo
});

document.querySelector(".next").addEventListener("click", () => { // https://www.youtube.com/watch?v=o1yMqPyYeAo
  date.setMonth(date.getMonth() + 1); // https://www.youtube.com/watch?v=o1yMqPyYeAo
  renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo
});

renderCalendar(); // https://www.youtube.com/watch?v=o1yMqPyYeAo