import React, { useState } from "react";
import emailjs from "emailjs-com";

import send from "../assets/images/bermuda-sending-e-mail.svg";
import { Button, TextField } from "@material-ui/core";

function Feedback() {
  const [error, setError] = useState(false);
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6bzwgo6",
        "template_za0c2qd",
        e.target,
        "user_EsXxuYomDwAzvrHvWnB75"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div>
      <div class="flex items-top justify-center sm:items-center sm:pt-0">
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div class="mt-8 overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2  items-center">
              <div class="p-6 mr-2   sm:rounded-lg ">
                <h1 class="text-3xl sm:text-5xl text-gray-700 dark:text-white font-semibold tracking-tight">
                  Send A message
                </h1>
                <p class="text-normal text-lg sm:text-2xl font-medium text-gray-500  mt-3">
                  for any issue or adding lecture please tall us to impvore the
                  project
                </p>
                <form className="mt-6" onSubmit={sendEmail}>
                  <TextField
                    type="text"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Your name"
                    name="name"
                    autoFocus
                  />
                  <TextField
                    type="email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  <TextField
                    type="text"
                    required
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={5}
                    rowsMax={8}
                    fullWidth
                    label="Your message"
                    name="message"
                  />
                  <div className="mt-2">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth={false}
                      size="large"
                    >
                      Send Feedback
                    </Button>
                  </div>
                </form>
              </div>

              <div className="mb-16 md:mb-0">
                <img src={send} alt="cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
