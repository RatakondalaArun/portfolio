const blogsEle = document.querySelector('#blogs');
let loadedBlogs = [];
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

function Blog(blog) {
  const { name } = blog;
  const blogEle = document.createElement('div');
  blogEle.id = name;
  blogEle.classList.add('fadein-ani', 'blog');
  blogEle.innerHTML = `
  <a href="blog.html?name=${name}"><h2>${name}</h2></a>
  `;
  return blogEle;
}

// load blogs
async function loadBlogs() {
  try {
    const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
      return { name: `${v}-helloworld` };
    });
    // const files = await getBlogs();
    const files = mock;
    for (const file of files) {
      blogsEle.appendChild(Blog(file));
    }
    loadedBlogs = files;
    document.querySelector('#loading.loading-ani').remove();
  } catch (error) {}
}
loadBlogs();

/// attach search listener
const searchEle = document.querySelector('#search');
searchEle.oninput = (_) => filterSearchs(searchEle.value.trim());

/**
 *
 * @param {String} searchKey
 */
function filterSearchs(searchKey) {
  if (searchKey === '') {
    for (const blog of loadedBlogs) {
      const ele = document.getElementById(blog.name);
      ele.classList.remove('matched');
      ele.classList.remove('unmatched');
    }
    return;
  }

  let matches = 0;
  for (const blog of loadedBlogs) {
    const element = document.getElementById(blog.name);
    if (blog.name.includes(searchKey)) {
      element.classList.add('matched');
      element.classList.remove('unmatched');
      ++matches;
    } else {
      element.classList.remove('matched');
      element.classList.add('unmatched');
    }
  }

  document.getElementById('search-info').hidden = !(matches === 0);
}
