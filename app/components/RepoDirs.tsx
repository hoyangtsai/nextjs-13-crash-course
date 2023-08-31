import Link from 'next/link';

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

async function fetchRepoContents(name: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    `https://api.github.com/repos/hoyangtsai/${name}/contents`,
    {
      headers: {
        Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : '',
      },
      next: {
        revalidate: 60,
      },
    }
  );
  const contents = await response.json();
  return contents;
}

type Props = {
  name: string;
}

type fileContent = {
  name: string;
  path: string;
  type: string;
}

const RepoDirs = async ({ name }: Props) => {
  const contents = await fetchRepoContents(name);

  const dirs = contents.filter((content: fileContent) => content.type === 'dir');

  return (
    <>
      <h3>Directories</h3>
      <ul>
        {dirs.map((dir: fileContent) => (
          <li key={dir.path}>
            <Link href={`/code/repos/${name}/${dir.path}`}>{dir.path}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default RepoDirs;