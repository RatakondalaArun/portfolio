const blogs = document.querySelector('#blogs');

/**
 * fetches list of blogs from the main branch of my github repo
 */
async function getBlogs() {
  try {
    const url = 'https://api.github.com/repos/RatakondalaArun/RatakondalaArun/contents/blogs';
    const contentsRes = await httpRequest({
      method: 'GET',
      url: url,
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    return JSON.parse(contentsRes.data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadBlogs() {
  try {
    const files = await getBlogs();
    for (const file of files) {
      blogs.appendChild(Blog(file));
    }
    document.querySelector('#loading.loading-ani').remove();
  } catch (error) {}
}
loadBlogs();

function Blog(blog) {
  const { name } = blog;
  const blogEle = document.createElement('div');
  blogEle.classList.add('fadein-ani');
  blogEle.innerHTML = `
  <a href="blog.html?name=${name}"><h2>${name}</h2></a>
  `;
  return blogEle;
}
