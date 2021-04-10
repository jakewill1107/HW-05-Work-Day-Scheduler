/* Displays current day on the top of the page */ 
$("#currentDay").text(moment().format("dddd[,] MMMM Do"));



/* Building the display of the scheduler by hour with rows & columns */ 
$.each(hoursList, function(index, hoursList) {
    /* Creating the row */
    var hourRowEl = $('<li class="row">');
    /* Adding text and hour to row */
    var timeBlockEl = $('div class="hour col-1">');
    timeBlockEl.text(hoursList);
    hourRowEl.append(timeBlockEl);

    var textAreaEl = $('<textarea class="col-10">');
    var currentHour = parseInt(moment().format("H"));
    var rowHour = index + 9;

    if (currentHour > rowHour) {
        textAreaEl.addClass("past");
    }
    else if (currentHour < rowHour) {
        textAreaEl.addClass("future");
    }
    else {
        textAreaEl.addClass("present");
    }
    textAreaEl.text(agendaList[index]);
    hourRowEl.append(textAreaEl);

    var saveButtonEl = $('button class="saveBtn col-1" index-value="' + index + '">');
    saveButtonEl.html('<i class="fas fa-save"></i>');
    hourRowEl.append(saveButtonEl);

    $(".time-block").append(hourRowEl);

});


/* Creates an array of hours to be used in scheduler display */
var hoursList = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
var agendaList = JSON.parse(localStorage.getItem("day-planner"));

if (!agendaList) {
    agendaList = ["", "", "", "", "", "", "", "", "",];
}




