import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

function About() {
  return (
    <div className="container">
      <h1>About Page</h1>
      <div className="row mt-4">
        <h2 className="mb-2 text-lg text-gray-600">
          Developed && Designed By:
        </h2>
        <div className="mt-2 flex items-center ">
          <div className="p-4 rounded-lg shadow-md w-2/6 px-8 mr-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-indigo-400">
                  Abdulbasit Salah
                </h1>
                <div className="flex items-center">
                  <p className="text-base mr-3 text-gray-600 text-medium">
                    Full-Stack Web Developer
                  </p>
                  <a
                    href="https://github.com/abdulbasit-web"
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-indigo-500"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
              <div class="relative w-16 h-16">
                <img
                  className="rounded-full border border-gray-100 shadow-sm"
                  src="basit.png"
                  alt="user avatar"
                />
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow-md w-2/6 px-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-indigo-400">
                  Hewr Srood
                </h1>
                <div className="flex items-center">
                  <p className="text-base mr-3 text-gray-600 text-medium">
                    Front-End Web Developer
                  </p>
                  <a
                    href="https://github.com/Hewr-Srood"
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-indigo-500"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
              <div class="relative w-16 h-16">
                <img
                  className="rounded-full border border-gray-100 shadow-sm"
                  src="hewr.png"
                  alt="user avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
