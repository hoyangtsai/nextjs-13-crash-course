import Link from 'next/link';
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa';

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

async function fetchRepo(name: string) {
  const response = await fetch(
    `https://api.github.com/repos/hoyangtsai/${name}`,
    {
      headers: {
        Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
      },
      next: {
        revalidate: 60,
      },
    }
  );
  const repo = await response.json();
  return repo;
}

type Props = {
    name: string;
}

const Repo = async ({ name }: Props) => {
  const repo = await fetchRepo(name);

  return (
    <>
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <div className='card-stats'>
        <div className='card-stat'>
          <FaStar />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className='card-stat'>
          <FaCodeBranch />
          <span>{repo.forks_count}</span>
        </div>
        <div className='card-stat'>
          <FaEye />
          <span>{repo.watchers_count}</span>
        </div>
      </div>
    </>
  );
};
export default Repo;