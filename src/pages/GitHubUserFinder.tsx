/*

 4. GitHub Profile Viewer
Description: Show any GitHub user's public profile and repositories.

API: GitHub REST API = https://docs.github.com/en/rest

Features:

Search by GitHub username
Avatar, bio, repo list, follower count
Repository info like stars & forks

*/

import axios from "axios";
import { useEffect, useState } from "react";
import type {
  ReposData,
  UserData,
} from "../typescript/interface/userInterface";
import api from "../lib/AxoisInstance";

const GitHubUserFinder = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [collectUserName, setCollectUserName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<ReposData | null>(null);
  const [ripoToggle, setRipoToggle] = useState<boolean>(false);
  // console.log(userName);

  useEffect(() => {
    if (!userName) return;

    const response = async () => {
      setIsLoading(true);
      setIsError(null);
      setUserData(null);
      setRepos(null);

      try {
        const res = await api.get(
          userName
          //    https://docs.github.com/en/rest
        );

        const resRepo = await api.get(`${userName}/repos`);

        console.log(res);
        console.log(resRepo);

        setRepos(resRepo.data);
        setUserData(res.data);
      } catch (error) {
        // setIsError("User not found");
        setIsError(error?.message);
      } finally {
        setIsLoading(false);
      }
    };
    response();
  }, [userName]);

  // handlechange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectUserName(e.target.value);
    // console.log(e.target.value); // show on the console
  };

  // onSubmit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!collectUserName.trim()) return;

    setUserName(collectUserName);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* form part / search part  */}
      <form onSubmit={onSubmit} className="mb-6">
        <input
          type="text"
          value={collectUserName}
          onChange={(e) => handleChange(e)}
          placeholder="Enter GitHub username"
          className="border px-4 py-2 rounded-lg outline-none"
        />

        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </form>
      {/* loding & error message part  */}
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">{isError}</p>}

      {/* ui section */}
      {userData && (
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
          {/* avatar */}
          <img
            src={userData?.avatar_url}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
          />
          {/* name */}
          <h2 className="text-xl font-bold mt-4">
            {userData?.name || "No Name"}
          </h2>
          {/* username */}
          <p className="text-gray-500">@{userData?.login}</p>
          {/* bio */}

          <p className="mt-3 text-sm text-gray-600">
            {userData?.bio || "No bio available"}
          </p>

          <div className="flex flex-row justify-between  items-center">
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-bold">Repositories:</span>{" "}
              {userData?.public_repos}
            </p>
            <p className="mt-3 text-sm text-gray-600">
              <span className="font-bold">Followers:</span>{" "}
              {userData?.followers}
            </p>
          </div>

          {/* repos details */}

          <div className="flex justify-between items-center gap-3">
            <button
              onClick={() => setRipoToggle(ripoToggle === true ? false : true)}
              className="inline-block mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              {ripoToggle === true ? "Hide" : "Show"}
            </button>

            {/* profile navigation */}

            <a
              href={userData?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 bg-black text-white px-4 py-2 rounded-lg"
            >
              View Profile
            </a>
          </div>

          {ripoToggle && (
            <>
              {repos?.length > 0 && (
                <div className=" text-start">
                  {repos?.slice(0, 5)?.map((repo) => (
                    <div
                      key={repo.id}
                      className="border border-gray-400 p-5 rounded-lg mt-2"
                    >
                      {/* ripo name */}
                      <p className="mt-3 text-sm text-gray-600">
                        <span className="font-bold">Repos Name:</span>
                        {repo?.name}
                      </p>
                      {/* ripo stars */}
                      <p className="mt-3 text-sm text-gray-600">
                        <span className="font-bold">Repos Stars:</span>
                        {repo?.stargazers_count}
                      </p>
                      <p className="mt-3 text-sm text-gray-600">
                        <span className="font-bold">Repos Folks:</span>
                        {repo?.forks_count}
                      </p>

                      <p></p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHubUserFinder;
