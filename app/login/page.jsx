// app/login/page.jsx
import React from "react";
import SignIn from "../UI/sign-in";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
      <SignIn />
    </div>
  );
};

export default Page;
