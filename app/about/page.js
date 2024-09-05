// app/about/page.js
"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen p-4 text-white bg-gradient-to-b from-black via-gray-900 to-blue-900">
      <h1 className="mb-8 text-4xl font-bold text-center">About</h1>

      <div className="flex flex-col max-w-3xl gap-8 mx-auto">
        {/* About the Project */}
        <div>
          <h2 className="text-3xl font-semibold">About the Project</h2>
          <p className="mt-2 text-lg">
            This app was created using the Next.js framework with a Postgres
            database and OpenAI for generating AI-mimicked NASA Astronomy
            Picture of the Day images. It integrates Google Authentication for
            secure login and offers a unique game mode where users can guess
            between real and AI-generated images.
          </p>
        </div>

        {/* Why the Project */}
        <div>
          <h2 className="text-3xl font-semibold">Why the Project</h2>
          <p className="mt-2 text-lg">
            As a former journalist, I am deeply concerned about the rise of AI
            and the challenges it poses, especially in terms of misinformation
            and deception. This project is a fun and engaging way to challenge
            users to see if they can spot the difference between real NASA
            images and AI-generated fakes. It's important to stay vigilant and
            aware of how AI can influence our perception of reality.
          </p>
        </div>

        {/* About NASA APOD */}
        <div>
          <h2 className="text-3xl font-semibold">About NASA APOD</h2>
          <p className="mt-2 text-lg">
            NASA's Astronomy Picture of the Day (APOD) is a daily feature
            showcasing awe-inspiring images of space. It is one of NASA's most
            popular resources, providing both stunning visuals and educational
            insights into the cosmos.
          </p>
        </div>

        {/* About the Developer */}
        <div>
          <h2 className="text-3xl font-semibold">About the Developer</h2>
          <p className="mt-2 text-lg">
            I'm Trevor Brown, a passionate web developer with a focus on full
            stack development. I enjoy tackling unique challenges and creating
            engaging web experiences that mix technology and creativity.
            <br />
            You can learn more about me and my work on my personal website:{" "}
            <a
              href="https://trevorthewebdeveloper.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              trevorthewebdeveloper.com
            </a>
          </p>
        </div>

        {/* Privacy and Terms of Service */}
        <div>
          <h2 className="text-3xl font-semibold">
            Privacy and Terms of Service
          </h2>
          <p className="mt-2 text-lg">
            This app uses Google OAuth for authentication, and we collect your
            name, email address, and profile picture for account creation and
            login purposes only. We do not share or sell your personal data to
            third parties. Your information is stored securely and used solely
            for providing access to the app.
          </p>
          <p className="mt-2 text-lg">
            If you wish to delete your account or have any concerns regarding
            your data, please contact me at{" "}
            <a
              href="mailto:trevorbrown.web@gmail.com"
              className="text-blue-400 underline"
            >
              trevorbrown.web@gmail.com
            </a>
            .
          </p>
          <p className="mt-2 text-lg">
            By using this app, you agree to use it for personal purposes only.
            We use Google OAuth for secure login. You can manage your
            permissions or revoke access at any time by visiting{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              className="text-blue-400 underline"
            >
              Google Account Permissions
            </a>
            .
          </p>

          <p className="mt-4 text-lg text-gray-400">
            Last updated: September 2024
          </p>
        </div>
      </div>
    </div>
  );
}
