import express from 'express';
import { graphql } from '@octokit/graphql';
import morgan from 'morgan';
import axios from 'axios';
import path from 'path';

import { starredRepoQuery, blogsQuery } from './src/queries.js';

const app = express();
const githubGql = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

app.use(morgan('dev'));
app.use('/', express.static(path.resolve('../frontend')));
app.use(express.json());

app.get('/api/repos/pinned', async (_, res) => {
  try {
    const response = await githubGql(starredRepoQuery);
    const { nodes, totalCount } = response.user.pinnedItems;
    const repos = [];
    for (const node of nodes) {
      repos.push({
        name: node.name,
        owner: node.owner.login,
        url: node.url,
        description: node.description,
        stargazerCount: node.stargazerCount,
        latestRelease: {
          name: node.releases.edges[0]?.node.name,
          version: node.releases.edges[0]?.node.tagName,
          url: node.releases.edges[0]?.node.url,
          createdAt: node.releases.edges[0]?.node.createdAt,
        },
        languages: [{ name: node.languages.nodes[0].name, color: node.languages.nodes[0].color }],
      });
    }
    res.send({
      repos: repos,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.get('/api/blogs', async (_, res) => {
  try {
    const { repository } = await githubGql(blogsQuery);
    const blogs = repository.blogs.entries;
    const response = [];
    let index = blogs.length;
    for (const article of blogs) {
      const { name, path, content } = article.object.entries[0];
      response.unshift({ name, path, text: content.text, index: index-- });
    }
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.post('/api/markdown', async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post('https://api.github.com/markdown', JSON.stringify({ text: text }), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

app.listen(process.env.PORT, () => console.log(`Server is running🚀 on PORT:${process.env.PORT}`));
