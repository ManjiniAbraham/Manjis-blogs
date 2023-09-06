/** handle the update button for a post, update the post based on the post_id */
const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  
  const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
  ];

  if (title) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title, 
          content 
      }),
      headers: { 
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.update-btn').addEventListener('click', editFormHandler);