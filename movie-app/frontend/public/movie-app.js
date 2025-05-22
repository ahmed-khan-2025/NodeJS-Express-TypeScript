  const form = document.getElementById('movieForm');
  const message = document.getElementById('message');
  const movieTableBody = document.getElementById('movieTableBody');

  let editMovieId = null;

  async function loadMovies() {
    const res = await fetch('/api/movies');
    const movies = await res.json();
    movieTableBody.innerHTML = '';
    movies.forEach(addMovieToTable);
  }

  function addMovieToTable(m) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${m.title}</td>
      <td>${m.director}</td>
      <td>${m.year}</td>
      <td>
        <button class="edit-btn">✏️ Edit</button>
        <button class="delete-btn">🗑️ Delete</button>
      </td>
    `;

    row.querySelector('.delete-btn').addEventListener('click', async () => {
      const confirmDelete = confirm(`Delete "${m.title}"?`);
      if (!confirmDelete) return;

      const res = await fetch(`/api/movies/${m.id}`, { method: 'DELETE' });
      if (res.ok) {
        message.textContent = `✅ Deleted "${m.title}"`;
        loadMovies();
      } else {
        message.textContent = '❌ Failed to delete movie.';
      }
    });

    row.querySelector('.edit-btn').addEventListener('click', () => {
      form.title.value = m.title;
      form.director.value = m.director;
      form.year.value = m.year;
      editMovieId = m.id;
      form.querySelector('button[type="submit"]').textContent = 'Update Movie';
      message.textContent = `✏️ Editing "${m.title}"...`;
    });

    movieTableBody.appendChild(row);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      title: form.title.value,
      director: form.director.value,
      year: parseInt(form.year.value)
    };
    console.log(data);

    if (editMovieId !== null) {
      // Edit mode
      const res = await fetch(`/api/movies/${editMovieId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        message.textContent = `✅ Movie updated`;
        form.reset();
        editMovieId = null;
        form.querySelector('button[type="submit"]').textContent = 'Submit';
        loadMovies();
      } else {
        message.textContent = '❌ Failed to update movie.';
      }
    } else {
      // Add mode
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        
      });
      console.log(res)
      if (res.ok) {
        const result = await res.json();
        message.textContent = `✅ Movie added with ID: ${result.id}`;
        form.reset();
        loadMovies();
      } else {
        message.textContent = '❌ Failed to add movie.';
      }
    }
  });
  loadMovies();