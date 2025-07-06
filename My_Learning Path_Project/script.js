document.addEventListener("DOMContentLoaded", () => {
  // Initialize Comment System (your existing code)
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

  // Initialize Blog Posts System (new code)
  fetchBlogPostsWithRetry();

  // Helper Functions
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  async function fetchBlogPostsWithRetry(retries = 3, delay = 1000) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=6"
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const posts = await response.json();
      displayPosts(posts);
    } catch (error) {
      console.error("Fetch error:", error);
      if (retries > 0) {
        console.log(`Retrying... ${retries} attempts left`);
        setTimeout(
          () => fetchBlogPostsWithRetry(retries - 1, delay * 2),
          delay
        );
      } else {
        displayFallbackPosts();
      }
    }
  }

  function displayPosts(posts) {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");
      const shortBody =
        post.body.length > 100
          ? post.body.substring(0, 100) + "..."
          : post.body;
      postCard.innerHTML = `
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(shortBody)}</p>
      `;
      postsContainer.appendChild(postCard);
    });
  }

  function displayFallbackPosts() {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    const fallbackPosts = [
      {
        title: "Welcome to My Blog",
        body: "This is a sample blog post about my front-end development journey.",
      },
      {
        title: "Learning React",
        body: "Discover how I'm mastering React components and state management.",
      },
    ];
    displayPosts(fallbackPosts);
  }
});
