export const getUserLocal = async (username: string) => {
  const res = await fetch(
    `https://www.githubwrapped.com/api/stats/${username}`
  );
  return res.json();
};
