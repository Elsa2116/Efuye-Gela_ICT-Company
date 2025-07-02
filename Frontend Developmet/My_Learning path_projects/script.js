document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commentForm");
  //comments wil be displayed
  const commentsDisplay = document.getElementById("commentsDisplay");

  //adds a submit event listener to the form
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page reload

    const nameInput = form.elements["name"];
    const commentInput = form.elements["comment"];

    //remove any spaces
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    //check if the field is empty
    if (!name || !comment) {
      alert("Please enter both your name and comment.");
      return;
    }

    // Get current date and time in a readable format
    const now = new Date();
    const formattedDate = now.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Create new comments div
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    commentDiv.innerHTML = `
      <p><strong>${escapeHtml(
        name
      )}</strong> <em>posted on ${formattedDate}</em></p>
      <p>${escapeHtml(comment)}</p>
      <hr />
    `;

    // Add the new comment at the top
    commentsDisplay.prepend(commentDiv);

    // Clear form fields
    nameInput.value = "";
    commentInput.value = "";
  });

  // Helper to escape HTML special chars for security(like xss attacks)
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
});
