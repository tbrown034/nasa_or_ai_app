import React from "react";
import SignIn from "../UI/sign-in";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Log In</h1>
      <SignIn />
    </div>
  );
};

export default page;
