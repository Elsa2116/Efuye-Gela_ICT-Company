document.addEventListener("DOMContentLoaded", () => {
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // ✍️ Comment system
  const form = document.getElementById("commentForm");
  const commentsDisplay = document.getElementById("commentsDisplay");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = form.elements["name"];
    const commentInput = form.elements["comment"];
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) {
      alert("Please enter both your name and comment.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `
      <p><strong>${escapeHtml(
        name
      )}</strong> <em>posted on ${formattedDate}</em></p>
      <p>${escapeHtml(comment)}</p>
      <hr />
    `;

    commentsDisplay.prepend(commentDiv);
    nameInput.value = "";
    commentInput.value = "";
  });

  const container = document.getElementById("postsContainer");

  fetch("posts.json")
    .then((res) => res.json())
    .then((posts) => {
      container.innerHTML = posts
        .map(
          (post) => `
          <div class="posts-grid">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
          </div>`
        )
        .join("");
    })
    .catch((err) => {
      console.error("Failed to load posts:", err);
      container.innerHTML =
        '<p style="color: red;">Could not load posts. Try again later.</p>';
    });
});
