/**
 * Sends httpRequest
 * @param {any} param0
 * @returns
 */
function httpRequest({ method, url, headers, body }) {
  const xmlHttp = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xmlHttp.onload = (_) => resolve({ statusCode: xmlHttp.status, data: xmlHttp.responseText });
    xmlHttp.onerror = (_) => reject({ statusCode: xmlHttp.status, error: xmlHttp.error });
    xmlHttp.open(method, url, true);
    if (headers) {
      for (const header of Object.keys(headers)) {
        xmlHttp.setRequestHeader(header, headers[header]);
      }
    }
    xmlHttp.send(JSON.stringify(body));
  });
}

// adds footer for each page
window.onload = (_) => {
  const siteMap = [
    { name: '🏡home', link: 'index.html' },
    { name: '🧾blogs', link: 'blogs.html' },
    { name: '🔧projects', link: 'projects.html' },
  ];
  const footerEle = document.createElement('footer');
  footerEle.style.alignItems = 'center';
  footerEle.style.textAlign = 'center';
  let index = 1;
  for (const page of siteMap) {
    const site = document.createElement('span');
    site.innerHTML = `<a href="${page.link}">${page.name}</a>`;
    footerEle.appendChild(site);
    if (index === siteMap.length) continue;
    const seperator = document.createElement('span');
    seperator.innerText = '|';
    footerEle.appendChild(seperator);
    index++;
  }
  document.querySelector('#nav-menu')?.appendChild(footerEle);
};
