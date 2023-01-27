
$(document).ready(function(){
    // current day is displayed at the top of the calendar
    $("#currentDay").text(moment().format('dddd MMMM Do YYYY'));
    
    // each time block is color-coded to indicate whether it is in the past, present, or future
    function updateTimeBlocks() {
        var currentHour = moment().hours();
        
    
        $(".time-block").each(function() {
            var timeBlockHour = parseInt($(this).attr("id"));
    
            if (timeBlockHour > currentHour) {
                $(this).addClass("future");
            } else if (timeBlockHour === currentHour) {
                $(this).addClass("present");
            } else {
                $(this).addClass("past");
            }
        });
    }
    
    // WHEN I click the save button for that time block
    $(".saveBtn").on("click", function() {
        var time = $(this).siblings(".hour").text();
        var plan = $(this).siblings(".plan").val();
    
        // THEN the text for that event is saved in local storage
        localStorage.setItem(time, plan);
    });
    
    // WHEN I refresh the page
    // THEN the saved events persist
    function loadPlanner() {
        $(".hour").each(function() {
            var currHour = $(this).text();
            var currPlan = localStorage.getItem(currHour);
    
            if(currPlan !== null) {
                $(this).siblings(".plan").val(currPlan);
            }
        });
    }
    
    updateTimeBlocks();
    loadPlanner();
});