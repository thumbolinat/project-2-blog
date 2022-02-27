function addClass() {
	var text = document.getElementById('create-blog');
	text.classList.remove('hide');

  var createButton = document.getElementById('create');
	createButton.remove();
}

async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-body"]').value;

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('You must enter values for both Title and Body');
    }
  }

  document.querySelector('.submit-post-form').addEventListener('submit', newFormHandler);