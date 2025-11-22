export function getRole() {
  const roleCookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith("role="));

  return roleCookie?.split("=")[1] || "";
}
