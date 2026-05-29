export const fetchUser = async (username) => {
  const res = await fetch(
    `http://localhost:4000/github/${username}`
  );

  return await res.json();
};