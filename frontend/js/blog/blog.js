/**
 * Pulls file contents from github
 * @returns Promise<void>
 */
async function getBlogs(filename) {
  try {
    const contentsRes = await httpRequest({
      method: 'GET',
      url: `https://raw.githubusercontent.com/RatakondalaArun/RatakondalaArun/main/blogs/${filename}`,
    });

    const markdownRes = await httpRequest({
      method: 'POST',
      url: 'https://api.github.com/markdown',
      headers: { Accept: 'application/vnd.github.v3+json' },
      body: {
        text: contentsRes.data,
      },
    });
    return markdownRes.data;
  } catch (error) {
    console.log(error);
    return '';
  }
}

async function loadBlog() {
  const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
  const blogName = params.name;

  const blogHtmlContent = await getBlogs(`${blogName}/${blogName}.md`);
  const blogEle = document.createElement('div');
  blogEle.classList.add('fadein-ani', 'markdown-body');
  blogEle.innerHTML = blogHtmlContent;

  document.querySelector('#content').appendChild(blogEle);
  document.querySelector('#loading').remove();
}
loadBlog();
