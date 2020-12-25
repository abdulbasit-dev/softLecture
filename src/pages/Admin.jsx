import React from 'react';
import AdminNav from '../components/AdminComp/AdminNav';
import Content from '../components/AdminComp/Content';
import SideBar from '../components/AdminComp/SideBar';

function Admin() {
  return (
    <div className="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
      <AdminNav />
      <div className="flex flex-col md:flex-row">
        <SideBar />
        <div className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default Admin;
