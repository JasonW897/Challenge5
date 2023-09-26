$(function () {
  // Function to update the time block colors based on the current time
  function updateBlockColors() {
    var currentHour = dayjs().hour(); // Get the current hour using Day.js
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]); // Get the hour from the block's ID
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Function to load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      var event = localStorage.getItem(blockHour);
      $(this).find("textarea").val(event);
    });
  }

  // Function to save events to local storage
  function saveEvent() {
    var blockHour = $(this).parent().attr("id");
    var eventText = $(this).siblings("textarea").val();
    localStorage.setItem(blockHour, eventText);
  }

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Update time block colors
  updateBlockColors();

  // Load saved events
  loadEvents();

  // Add click event listener to save buttons
  $(".saveBtn").on("click", saveEvent);
});
