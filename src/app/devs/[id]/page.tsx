import { GetUserFromMD } from "@/app/lib";
import GitHubCalendar from "react-github-calendar";

interface Props {
  params: {
    id: string;
  };
}

export default async function DevPage({ params }: Props) {
  const { id } = params;

  const [userResponse, mdUserInfo, contributionsResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${id}`),
    GetUserFromMD(id),
    fetch(`https://github-contributions.vercel.app/api/v1/${id}`),
  ]);

  const ghUserInfo = (await userResponse.json()) as GhUserInfo;

  const contributions = (await contributionsResponse.json()) as GhContributions;

  return (
    <div>
      Hi, {id}
      <img src={ghUserInfo.avatar_url} />
      <h1>
        {ghUserInfo.name} || {ghUserInfo.login}
      </h1>
      <p>{ghUserInfo.bio}</p>
      <p>{ghUserInfo.company ? ghUserInfo.company : "No Company"}</p>
      <p>{ghUserInfo.location}</p>
      <p>
        Followers: {ghUserInfo.followers} || Following: {ghUserInfo.following}
      </p>
      <p>Public contributions: {mdUserInfo?.public_contributions}</p>
      <p>Private contributions: {mdUserInfo?.private_contributions}</p>
      <br />
      <br />
      <hr />
      <h1>Trophies</h1>
      <img
        src={`https://github-profile-trophy.vercel.app/?username=${ghUserInfo.login}`}
      />
      <br />
      <br />
      <hr />
      <h1>Stats</h1>
      <img
        src={`https://github-readme-stats.vercel.app/api?username=${ghUserInfo.login}`}
      />
      <br />
      <br />
      <hr />
      <h1>Stats</h1>
      <img
        src={`https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api/top-langs/?username=${ghUserInfo.login}`}
      />
      <br />
      <br />
      <hr />
      <h1>Stats</h1>
      <img
        src={`https://github-readme-streak-stats.herokuapp.com?user=${ghUserInfo.login}`}
      />
      <p>Years on Github: {contributions.years.length}</p>
      {contributions.years.map(({ year }) => (
        <div>
          <h1>Contributions for {year}</h1>
          <GitHubCalendar
            key={year}
            username={ghUserInfo.login}
            year={parseInt(year)}
            showWeekdayLabels
          />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
