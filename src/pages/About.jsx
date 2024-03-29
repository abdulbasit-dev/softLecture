import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import cover from '../assets/images/marginalia-online-education.svg';
import Footer from '../components/Footer';

function About() {
  return (
    <React.Fragment>
      <div className='container'>
        <div class='text-gray-600 body-font'>
          <div class='container mx-auto flex px-5 pb-24 md:flex-row flex-col items-center'>
            <div class='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-10 md:mb-0 items-center text-center'>
              <h1 class='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                Our Goal!
              </h1>
              <p class='mb-8 text-xl'>
                We went through with this project to help our students find
                their lectures in the easiest way possible so that they don't
                waste their time searching for them & also to provide them with
                resources & online videos.
              </p>
            </div>
            <div class='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
              <img
                class='object-cover object-center rounded'
                alt='hero'
                src={cover}
              />
            </div>
          </div>
        </div>

        {/* DOWNLOAD APP SECTION  */}
        <div class='text-gray-600 body-font text-center'>
          <div class='container mx-auto flex px-5 pb-24 md:flex-row flex-col items-center'>
            <div class='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
              <h2 class='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
                You Can Use SoftLecture as A mobile app (Android)
              </h2>
              <p class='mb-8 text-2xl font-normal text-gray-700'>
                while using SoftLecture mobile app, it will be so easy to access
                the lectures and navigate throughout the application
              </p>
              <div className='flex align-items-center'>
                <p className='text-xl mr-3 text-indigo-600'>
                  Click the Icon to download app
                </p>
                <a
                  rel='noreferrer'
                  target='_blank'
                  className='transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110'
                  href='https://gonative.io/share/nkedkb'
                >
                  <img
                    src='icons8-download-100.png'
                    className='object-cover object-center rounded'
                    alt='download app'
                  />
                </a>
              </div>
            </div>
            <div class='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
              <img
                src='download-app.png'
                className='object-cover object-center rounded'
                alt='download app'
              />
            </div>
          </div>
        </div>

        {/* OUR TEAM SECTION  */}
        <div className='mb-16'>
          <div className='mb-16'>
            <h2 className='mb-2 text-4xl text-center font-semibold  text-gray-600'>
              Our Team
            </h2>
            <div className='bg-gray-400 h-0.5 rounded-lg mt-4 w-2/3 mx-auto'></div>
          </div>
          <div className='mt-2 row  pb-24  justify-center'>
            <div className='col-md-5 col-lg-3 col-sm-8 col-7 shadow-md border py-4 mx-4 mb-10 rounded-lg md:mb-0 flex flex-col items-center'>
              <div className=''>
                <div className='w-40 h-40'>
                  <img
                    className='rounded-full border border-gray-100 shadow-sm ml-3'
                    src='basit.png'
                    alt='user avatar'
                  />
                </div>
                <div className='mt-2 text-center'>
                  <div>
                    <h1 className='text-2xl font-semibold text-indigo-400'>
                      Abdulbasit Salah
                    </h1>
                    <p className='text-base  mt-1 text-gray-600 text-medium'>
                      Full-Stack Web Developer
                    </p>
                  </div>

                  <div className='flex justify-center items-center mt-2 text-gray-500'>
                    <a
                      href='https://github.com/abdulbasit-web'
                      rel='noreferrer'
                      target='_blank'
                      className='hover:text-indigo-500 mr-4'
                    >
                      <GitHubIcon fontSize='large' />
                    </a>
                    <a
                      href='https://www.facebook.com/abdulbasit.salah.7'
                      rel='noreferrer'
                      target='_blank'
                      className='hover:text-indigo-500 mr-4'
                    >
                      <FacebookIcon style={{fontSize: '42'}} />
                    </a>
                    <a
                      href='https://www.linkedin.com/in/abdulbasit-salah-2b983416b/'
                      rel='noreferrer'
                      target='_blank'
                      className='hover:text-indigo-500 mr-4'
                    >
                      <LinkedInIcon style={{fontSize: '42'}} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3 rounded-lg col-md-5 col-sm-8 col-7  shadow-md py-4 mx-4 border  flex flex-col items-center'>
              <div className=''>
                <div className='w-40 h-40'>
                  <img
                    className='rounded-full border border-gray-100 shadow-sm ml-3'
                    src='hewr.png'
                    alt='user avatar'
                  />
                </div>
                <div className='mt-2 text-center'>
                  <div>
                    <h1 className='text-2xl font-semibold text-indigo-400'>
                      Hewr Srood
                    </h1>
                    <p className='text-base  mt-1 text-gray-600 text-medium'>
                      Front-End Web Developer
                    </p>
                  </div>

                  <div className='flex justify-center items-center mt-2 text-gray-500'>
                    <a
                      href='https://github.com/Hewr-Srood'
                      rel='noreferrer'
                      target='_blank'
                      className='hover:text-indigo-500 mr-4'
                    >
                      <GitHubIcon fontSize='large' />
                    </a>
                    <a
                      href='https://www.facebook.com/hewr.srood'
                      rel='noreferrer'
                      target='_blank'
                      className='hover:text-indigo-500 mr-4'
                    >
                      <FacebookIcon style={{fontSize: '42'}} />
                    </a>
                    <a
                      href='https://www.linkedin.com/in/hewr-srood/'
                      rel='noreferrer'
                      target='_blank'
                      className='hover:text-indigo-500 mr-4'
                    >
                      <LinkedInIcon style={{fontSize: '42'}} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default About;
