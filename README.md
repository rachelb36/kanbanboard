# Kanban Board
# Challenge 5 - Third-Party APIs Challenge: Task Board

## Description

- Digital Task Board
- When page opens any task cards saved into localStorage previously are created on-the-fly and placed in their former column when page was opened last.
- "Add Task" button is at the top of the HTML page which fires up a form modal when clicked.
- When a new task cards is created, it is placed in the "to-do" status column.
- The cards are given a yellow background, if the task due date is the same day.  If the task due date has passed, the is given a red background.
- All of the individual task cards can be dragged to a new status column - "to-do", "in-progress" or "done".
- If the card is yellow or red, signifying its urgency and dropped into the "done" column, the card background is changed to white.
- A user can also delete a task by clicking its "delete" button.
- When a task card has a status change or is deleted, the localStorage is updated.

### Tasks completed
- Using provided starter code, completed script.js using JQuery, wherever possible.
- Added a hidden modal to HTML page that opens when the user event is triggered by clicking the "Add Task" button.
- Added BootStrap styles for styling task cards.
- Implemented Day.js to library to work with dates.  When user clicks on date text field on modal form a pop up monthly calendar appears so user can easily pick due date.
- Implemented JQuery UI "draggable" capability to task cards and made status columns "droppable".
  

## Installation

To run this project, navigate to:
To view project, navigate to 
<https://rmburgos.github.io/personal_blog/>

## Usage
- <img width="1667" alt="kanban_1" src="https://github.com/rmburgos/kanbanboard/assets/97217944/2e6839e9-7ef4-46ee-ac41-97def38da0a1">

- <img width="1673" alt="kanban_2" src="https://github.com/rmburgos/kanbanboard/assets/97217944/f3594bd5-f002-40cb-a973-a18ed436afc5">



## Built With
- HTML
- JQuery
- JavaScript
- CSS


## Credits

**This project was accomplished with the help provided by the instructors and TAs of the Rice University Coding Bootcamp, including Instructor Darian Mendez, Mateo Wallace, Mark Alfano, Gerard Mennella



Additional resources include:
- <https://jqueryui.com/datepicker/>
- <https://day.js.org/>
- <https://getbootstrap.com/>
- <https://jqueryui.com/draggable/>
- <https://jqueryui.com/droppable/>
- <https://www.w3schools.com/cssref/css_selectors.php>
- <https://css-tricks.com/almanac/selectors/a/after-and-before/>

## License

Distributed under the MIT License. See LICENSE.txt for more information.
