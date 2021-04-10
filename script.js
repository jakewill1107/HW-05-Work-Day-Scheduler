/* Displays current day on the top of the page */ 
$("#currentDay").text(moment().format("dddd[,] MMMM Do"));
console.log("current-day-working")

/* Creates an array of hours to be used in scheduler display */
var businessHoursList = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var agendaList = JSON.parse(localStorage.getItem("day-planner"));

if (!agendaList) {
    agendaList = ["", "", "", "", "", "", "", "", "",];
}
console.log("hour array created")

/* Building the display of the scheduler by hour with rows & columns */ 
$.each(businessHoursList, function(index, businessHour) {
    /* Creating the row */
    var hourRowEl = $('<li class="row">');
    /* Adding text and hour to row */
    var timeBlockEl = $('<div class="hour col-1">');
    timeBlockEl.text(businessHour);
    hourRowEl.append(timeBlockEl);

    var textAreaEl = $('<textarea class="col-10">');
    var hourNow = parseInt(moment().format("H"));
    var rowHour = index + 9;

    if (hourNow > rowHour) {
        textAreaEl.addClass("past");
    }
    else if (hourNow < rowHour) {
        textAreaEl.addClass("future");
    }
    else {
        textAreaEl.addClass("present");
    }
    textAreaEl.text(agendaList[index]);
    hourRowEl.append(textAreaEl);

        var saveButtonEl = $('<button class="saveBtn col-1" index-value="' + index +  '">');
    saveButtonEl.html('<i class="fas fa-save"></i>');
    hourRowEl.append(saveButtonEl);

    $(".time-block").append(hourRowEl);

});



$(".saveBtn").click(function() {
    var indexValue = $(this).attr("index-value");
    var agenda = $(this).prev().val();
    agendaList[indexValue] = agenda;
    localStorage.setItem("day-planner", JSON.stringify(agendaList));
});


