async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    // The DELETE request doesn't need to include anything on the body, so it can be as simple as...
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      // check the response status
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

  }


  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);