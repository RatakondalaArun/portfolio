const aboutMe = document.getElementById('aboutMe');
let pinnedRepos = [];

function Repo(repo) {
  const repoEle = document.createElement('div');
  repoEle.innerHTML = `<div>
  <h1 class="project-title">
    <a href="${repo.link}" rel="noopener" target="_blank">${repo.repo}</a>⭐${repo.stars}
  </h1>
  <p class="project-description">${repo.description}</p>
  </div>`;
  return repoEle;
}

async function getProjects() {
  try {
    const url = 'https://gh-pinned-repos-5l2i19um3.vercel.app/?username=RatakondalaArun';
    const response = await httpRequest({ method: 'GET', url: url });
    const data = response.data;
    pinnedRepos = JSON.parse(data);
    const projectsEle = document.getElementById('projects');
    projectsEle.classList.add('fadein-ani');
    projectsEle.innerHTML = `<h2>Projects</h2>`;
    for (const repo of pinnedRepos) {
      if (repo.owner !== 'RatakondalaArun') continue;
      projectsEle.appendChild(Repo(repo));
    }
  } catch (error) {}
}
getProjects();
