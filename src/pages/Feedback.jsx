import React from "react";
import emailjs from "emailjs-com";

function Feedback() {
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
      <div class="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div class="mt-8 overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                <h1 class="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                  Send A message
                </h1>
                <p class="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                  for any issue or adding lecture please tall us to ipvore the
                  app
                </p>
              </div>

              <form
                class="p-6 flex flex-col justify-center"
                onSubmit={sendEmail}
              >
                <div class="flex flex-col">
                  <label for="name" class="hidden">
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div class="flex flex-col mt-2">
                  <label for="email" class="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div class="flex flex-col mt-2">
                  <label for="message" class="hidden">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    placeholder="enter your message"
                    class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
