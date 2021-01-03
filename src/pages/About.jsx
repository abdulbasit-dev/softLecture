import React from 'react';

function About() {
  return (
    <div className="container">
      <h1>About Page</h1>
      <div className="row mt-4">
        <h2 className="mb-2 text-lg text-gray-600">Developed By:</h2>
        <div className="border border-gray-300 shadow rounded-lg p-6 col-sm-6  col-lg-4">
          <div className="flex justify-between items-center sm:px-4 lg:px-6">
            <h3>Abdulbasit Salah</h3>
            <img
              src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
              alt=""
              className="rounded-full w-20"
            />
          </div>
        </div>
        <div className="border border-gray-300 shadow rounded-lg p-6 col-sm-6  col-lg-4">
          <div className="flex justify-between items-center sm:px-4 lg:px-6">
            <h3>Abdulbasit Salah</h3>
            <img
              src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
              alt=""
              className="rounded-full w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
