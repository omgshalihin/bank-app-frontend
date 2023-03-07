"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = ({ email, image }: any) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: email,
    userImage: image,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleCreation = () => {
    submitForm();
  };

  const submitForm = async () => {
    const url = "https://bank-app-backend-production.up.railway.app/api/users";
    await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    router.push("/register/success");
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        method="POST"
        action="/register/success"
        onSubmit={submitForm}
      >
        <div>
          <div className="mb-2 block">
            <Label value="Create username" />
          </div>
          <TextInput
            type="text"
            name="userName"
            onChange={handleInput}
            value={formData.userName}
            required={true}
            shadow={true}
            placeholder={`e.g. ${email.split("@")[0]}`}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Your email" />
          </div>
          <TextInput
            type="text"
            name="userEmail"
            value={email}
            disabled={true}
            readOnly={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Your image URL" />
          </div>
          <TextInput
            type="text"
            name="userImage"
            value={image}
            disabled={true}
            readOnly={true}
          />
        </div>
        <Button onClick={handleCreation}>Become a member</Button>
      </form>
    </div>
  );
};

export default Register;
