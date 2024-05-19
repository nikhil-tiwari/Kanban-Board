# Kanban Board

## Description

This project is a simple Kanban board implementation built using HTML, CSS, and JavaScript. It allows users to manage tasks by adding, editing, and deleting tickets, and filtering them by priority colors. The board features a modal for adding tasks with selectable priority colors, and tickets can be locked or unlocked for editing. The board also supports local storage to persist tasks across sessions.

## Features

- **Add New Tickets:** Users can click the plus button to open a modal where they can enter a task description and select a priority color. Pressing Enter saves the ticket to the board.
- **Edit Tickets:** Tickets can be unlocked to enable editing the task description directly on the board.
- **Delete Tickets:** A delete button allows users to remove tickets from the board. When activated, clicking a ticket will prompt the user to confirm deletion.
- **Priority Color Filtering:** Users can filter tickets by clicking on color buttons in the toolbox. Double-clicking these buttons removes the filter and shows all tickets.
- **Change Ticket Priority:** Users can change the priority color of a ticket by clicking on the color bar of the ticket.
- **Persistent Storage:** All tickets are saved in local storage, ensuring that tasks persist even after refreshing the page.

## File Structure

- **index.html:** The main HTML file that structures the Kanban board layout.
- **style.css:** The CSS file that styles the Kanban board and its components.
- **text.js:** The JavaScript file containing the logic for adding, editing, deleting, filtering, and persisting tickets.

## Usage

1. **Add a Ticket:**
   - Click the plus button to open the modal.
   - Enter the task description and select a priority color.
   - Press Enter to save the ticket.

2. **Edit a Ticket:**
   - Click the lock icon on a ticket to unlock it.
   - Edit the task description directly on the board.
   - Click the unlock icon to lock the ticket again.

3. **Delete a Ticket:**
   - Click the trash icon to activate delete mode.
   - Click the ticket you wish to delete and confirm the deletion.

4. **Filter by Priority:**
   - Click a color in the toolbox to filter tickets by that color.
   - Double-click the color to remove the filter and show all tickets.

5. **Change Ticket Priority:**
   - Click the color bar on a ticket to cycle through the available colors.

## Installation

1. Clone the repository or download the source code.
2. Open `index.html` in a web browser to view and interact with the Kanban board.

## Dependencies

- **Font Awesome:** Used for icons in the toolbox and on tickets. Included via CDN.
- **ShortUniqueId:** Library for generating unique IDs for tickets. Included via CDN.

## Customization

- **Styles:** Modify `style.css` to customize the appearance of the board.
- **Logic:** Modify `text.js` to add or change functionality.

Enjoy managing your tasks with this simple Kanban board!
