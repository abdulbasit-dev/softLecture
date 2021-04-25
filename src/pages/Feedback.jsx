import React, {useState} from 'react';
import emailjs from 'emailjs-com';

import send from '../assets/images/bermuda-sending-e-mail.svg';
import {Button, TextField} from '@material-ui/core';
import Footer from '../components/Footer';

function Feedback() {
  const [error, setError] = useState(false);
  function sendEmail(e) {
    e.preventDefault();

    if (!e.target.message.value) {
      setError(true);
    } else {
      emailjs
        .sendForm(
          'service_6bzwgo6',
          'template_za0c2qd',
          e.target,
          'user_EsXxuYomDwAzvrHvWnB75'
        )
        .then(
          result => {
            alert('Than you, your message was send');
          },
          error => {
            console.log(error.text);
          }
        );
      e.target.reset();
    }
  }

  return (
    <div>
      <div className='flex items-top justify-center sm:items-center sm:pt-0 mb-16'>
        <div className='max-w-6xl mx-auto sm:px-6 lg:px-8'>
          <div className='mt-8 overflow-hidden'>
            <div className='grid grid-cols-1 md:grid-cols-2  items-center'>
              <div className='p-6 mr-2   sm:rounded-lg '>
                <h1 className='text-3xl sm:text-5xl text-gray-700 dark:text-white font-semibold tracking-tight'>
                  Send A message
                </h1>
                <p className='text-normal text-lg sm:text-2xl font-medium text-gray-500  mt-3'>
                  for any issue or adding lecture please tell us to impvore the
                  project
                </p>
                <form className='mt-6' onSubmit={sendEmail}>
                  <TextField
                    type='text'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    label='Your name'
                    name='name'
                    autoFocus
                  />
                  <TextField
                    type='email'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                  <TextField
                    type='text'
                    required
                    error={error}
                    variant='outlined'
                    margin='normal'
                    multiline
                    rows={5}
                    rowsMax={8}
                    fullWidth
                    label='Your message'
                    name='message'
                    helperText={error && 'please fill message field '}
                  />

                  <div className='mt-2'>
                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      fullWidth={false}
                      size='large'
                    >
                      Send Feedback
                    </Button>
                  </div>
                </form>
              </div>

              <div className='mb-16 md:mb-0'>
                <img src={send} alt='cover' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Feedback;
