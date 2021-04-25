import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer() {
  return (
    <div
      className='text-center p-4 bg-gray-50 border border-gray-100 shadow-sm'
      id='footer'
    >
      <p className='text-gray-500 text-xl'>
        The App developed By{' '}
        <span className='text-gray-700 text-meidum'>Future Dev</span> &copy;{' '}
        {new Date().getFullYear()}
      </p>
      <div className='mt-2 text-gray-500 '>
        <div className='flex align-items-center justify-center'>
          <p>If you like to Contribute to the Project click here -> </p>
          <a
            href='hhttps://github.com/abdulbasit-web/softLecture'
            rel='noreferrer'
            target='_blank'
            className='hover:text-indigo-500 ml-2'
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
