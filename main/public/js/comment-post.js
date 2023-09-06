/** handle the comment button when new comment is submitted, for associated post via post_id */
const addCommentHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector("#comment-content").value.trim();
    const post_id = document.querySelector(".current-post-id").innerHTML;

    if (!comment) {
        alert("Please fill out a comment before submitting.");
    } else {
        const response = await fetch("/api/comment/", {
            method: "POST",
            body: JSON.stringify({ comment, post_id }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace("/post/" + post_id + "#comment-section");
            document.location.reload();
        } else {
            alert(response.status + ": " + response.statusText);
        }
    }

};

document.querySelector('.comment-btn').addEventListener('click', addCommentHandler);
