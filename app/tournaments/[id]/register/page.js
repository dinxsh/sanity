"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage({ params }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);

    // modify members string to desired format
    const membersString = data.members;
    const membersArray = membersString.split(",");
    data = { ...data, members: membersArray };
    console.log(data);

    try {
      const response = await axios.post(
        `/api/tournaments/${params.id}/registration`,
        data,
      );

      if (response.status === 200) {
        // toast({
        //   title: "Success",
        //   description: "Registration successful!",
        //   variant: "success",
        // });
        alert("Registration successful");
        router.push(`/tournaments/${params.id}`);
      } else {
        // toast({
        //   title: "Error",
        //   description: "Registration failed. Please try again.",
        //   variant: "destructive",
        // });
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      // toast({
      //   title: "Error",
      //   description: "An error occurred. Please try again.",
      //   variant: "destructive",
      // });
      alert("Registration failed. Please try again.");
    }
  };

  if (!params.id) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-800 to-black">
      <div className="max-w-xl w-full p-8 rounded-lg text-white">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Register for Tournament
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Team Name
            </label>
            <input
              {...register("name", { required: "Team name is required" })}
              id="name"
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your team name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="members"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Team Members (Comma-separated)
            </label>
            <input
              {...register("members", {
                required: "Members are required",
                pattern: {
                  value: /^[a-zA-Z]+(,[a-zA-Z]+)*$/,
                  message:
                    "Enter names separated by commas only (e.g., John,Jane,Joe)",
                },
              })}
              id="members"
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter team members"
            />
            {errors.members && (
              <p className="text-red-500 text-xs mt-1">
                {errors.members.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              id="email"
              type="email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="selectedPlatform"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Selected Platform
            </label>
            <input
              {...register("selectedPlatform", {
                required: "Platform is required",
              })}
              id="selectedPlatform"
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the platform (e.g., PC, Console)"
            />
            {errors.selectedPlatform && (
              <p className="text-red-500 text-xs mt-1">
                {errors.selectedPlatform.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="participantType"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Participant Type
            </label>
            <input
              {...register("participantType", {
                required: "Participant type is required",
              })}
              id="participantType"
              type="text"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the participant type (e.g., Player, Coach)"
            />
            {errors.participantType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.participantType.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            arial-label="tournament-id-register-btn"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
