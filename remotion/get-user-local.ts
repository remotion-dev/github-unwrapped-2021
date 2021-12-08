export const getUserLocal = async (username: string) => {
  const res = await fetch(`https://www.githubwrapped.com/api/stats`, {
    method: "post",
    body: JSON.stringify({
      username,
    }),
  });
  return res.json();
};