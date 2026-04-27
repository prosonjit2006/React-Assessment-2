export interface UserData {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  public_repos: number;
  followers: number;
  html_url: string
}

export interface ReposData {
  name: string;
  stargazers_count: number;
  forks_count: string;
}
