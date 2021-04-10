/* Displays current day on the top of the page */
$("#currentDay").text(moment().format("dddd[,] MMMM Do"));
console.log("current-day-working");

/* Creates an array of hours to be used in scheduler display */
var businessHoursList = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];
/* Initiliazes the Day Planner */
var agendaList = JSON.parse(localStorage.getItem("day-planner"));
/* Displays blank agenda list if there are no inputs */
if (!agendaList) {
  agendaList = ["", "", "", "", "", "", "", "", ""];
}
console.log("hour array created");

/* Building the display of the scheduler by hour with rows & columns */
$.each(businessHoursList, function (index, businessHour) {
  /* Creates a row */
  var hourRowEl = $('<li class="row">');
  /* Builds a row and adds an hour to row */
  var timeBlockEl = $('<div class="hour col-1">');
  timeBlockEl.text(businessHour);
  hourRowEl.append(timeBlockEl);
  /* Adding text areas to the rows */
  var textAreaEl = $('<textarea class="col-10">');
    /* Establishes current hour in 24hr formatting */
  var hourNow = parseInt(moment().format("H"));
    /* Establishes row hour in 24hr formatting */ 
  var rowHour = index + 9;

  /* Choosing past, present or future classes based off current time */
  if (hourNow > rowHour) {
    textAreaEl.addClass("past");
  } else if (hourNow < rowHour) {
    textAreaEl.addClass("future");
  } else {
    textAreaEl.addClass("present");
  }
  textAreaEl.text(agendaList[index]);
  hourRowEl.append(textAreaEl);
  /* Building the save button and creating a column */
  var saveButtonEl = $(
    '<button class="saveBtn col-1" index-value="' + index + '">'
  );
  saveButtonEl.html('<i class="fas fa-save"></i>');
  hourRowEl.append(saveButtonEl);
 /* Placing the row in the time-block html list */ 
  $(".time-block").append(hourRowEl);
});

/* Builds functionality for save button with local storage when the save button is clicked on */
$(".saveBtn").click(function () {
  var indexValue = $(this).attr("index-value");
  var agenda = $(this).prev().val();
  agendaList[indexValue] = agenda;
  localStorage.setItem("day-planner", JSON.stringify(agendaList));
});
