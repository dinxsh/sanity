"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import { Label } from "../../../@/components/ui/label";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage() {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    gender: "",
    city: "",
    country: "India",
    bio: "",
  });

  const [selectedExpLevel, setSelectedExpLevel] = useState("Beginner");

  const expLevelButtons = ["Beginner", "Intermediate", "Expert", "Ninja"];
  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];

  const router = useRouter();

  const handleExpLevelButtonClick = (button) => {
    setSelectedExpLevel(button);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", form);
    // Handle form submission logic here

    router.push("/");
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <div className="w-full max-w-3xl px-8">
        <h1 className="text-3xl font-semibold mb-8">Complete Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-10 items-center mb-10 p-4 border rounded-xl">
            <div
              // type="file"
              // accept="image/*"
              placeholder=""
              className="relative w-24 h-24 flex items-center justify-center border rounded-xl"
            >
              +
            </div>

            <div className="flex flex-wrap gap-2">
              {expLevelButtons.map((button, idx) => (
                <button
                  key={idx}
                  type="button"
                  arial-label="complete-profile-btn"
                  className={`px-2 py-2 text-sm md:px-4 md:text-base rounded-xl transition-all
                    ${
                      selectedExpLevel === button
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-800"
                    }  
                  `}
                  onClick={() => handleExpLevelButtonClick(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>

          <div className="">
            <Label>Username</Label>
            <Input
              name="username"
              type="text"
              placeholder="Enter User Name"
              className="w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-x-10 gap-y-5 transition-all">
            <div className="w-full md:w-1/2 transition-all">
              <Label>Full Name</Label>
              <Input
                name="fullName"
                type="text"
                placeholder="Enter Full Name"
                className=""
              />
            </div>

            <div className="w-full md:w-1/2 flex-col transition-all">
              <Label>Gender</Label>
              <select
                name="gender"
                className="block w-full px-2 py-2.5 rounded-md border text-sm bg-transparent"
                placeholder="select gender"
              >
                <option value="" className="dark:bg-background">
                  Select Gender
                </option>
                {genderOptions.map((item, idx) => (
                  <option key={idx} value={item} className="dark:bg-background">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-10 gap-y-5 transition-all">
            <div className="w-full md:w-1/2 transition-all">
              <Label>City</Label>
              <Input
                name="city"
                type="text"
                placeholder="Enter City"
                className="w-full"
              />
            </div>

            <div className="w-full md:w-1/2 transition-all">
              <Label>Country</Label>
              <Input
                name="country"
                type="text"
                placeholder="Enter Country"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <Label>Bio</Label>

            <Textarea
              placeholder="Tell us a bit about yourself"
              className="bg-transparent"
            />
          </div>

          <div className="flex justify-end items-end">
            <Button
              type="submit"
              className="px-4 py-2"
              arial-label="create-profile-submit-btn"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
