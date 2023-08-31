import Link from 'next/link';
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

async function fetchRepos(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
      },
      next: {
          revalidate: 60,
      },
    }
  );

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

  const repos = await response.json();
  return repos;
}

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
}

const ReposPage = async () => {
  console.log('GITHUB_TOKEN :>> ', GITHUB_TOKEN);
  console.log('process.env :>> ', process.env);

  const repos = await fetchRepos('hoyangtsai');

  return (
    <div className='repos-container'>
      <h2>Repositories</h2>
      <ul className='repo-list'>
        {Array.isArray(repos) && repos.map((repo: Repo) => (
          <li key={repo.id}>
            <Link href={{pathname: `/code/repos/${repo.name}`, query: repo}}>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <div className='repo-details'>
                <span>
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span>
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span>
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReposPage;