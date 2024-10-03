"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
  /^(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4}$/
);

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
});

const ProfileSettings = (props) => {
  const { userData } = props;
  const onSubmit = (data) => {
    console.log(data);
  };

  const res = useForm({
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = res;

  console.log(res.getValues());

  return (
    <>
      <div className="flex flex-col items-center mt-10 p-10 z-10 ">
        <form
          className="space-y-4 z-40 w-3/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("firstName")}
                type="text"
                className={`block py-2.5 px-0 w-full  font-semibold text-lg text-yellow-500 bg-transparent 
                  border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                placeholder=" "
                required
              />
              {errors.firstName && (
                <span className="text-red-500  font-semibold text-lg">
                  {errors.firstName.message}
                </span>
              )}
              <label className="peer-focus:font-semibold text-lg absolute  font-semibold text-lg text-yellow-500 dark:text-yellow400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {userData.firstName}
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("lastName")}
                type="text"
                className={`block py-2.5 px-0 w-full  font-semibold text-lg text-yellow-500 bg-transparent border-0 border-b-2 border-gray-300 
                  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                  focus:border-blue-600 peer ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                placeholder=" "
                required
              />
              {errors.lastName && (
                <span className="text-red-500 font-semibold text-lg">
                  {errors.lastName.message}
                </span>
              )}
              <label className="peer-focus:font-semibold text-lg absolute  font-semibold text-lg text-yellow-500 dark:text-yellow400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {userData.lastName}
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              {...register("email")}
              type="email"
              className={`block py-2.5 px-0 w-full  font-semibold text-lg text-yellow-500 bg-transparent border-0 border-b-2 border-gray-300 
                appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none 
                focus:ring-0 focus:border-blue-600 peer ${
                  errors.email ? "border-red-500" : ""
                } `}
              placeholder=" "
              required
            />
            {errors.email && (
              <span className="text-red-500  font-semibold text-lg">
                {errors.email.message}
              </span>
            )}
            <label className="peer-focus:font-semibold text-lg absolute  font-semibold text-lg text-yellow-500 dark:text-yellow400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {userData.email}
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              {...register("bio")}
              className="block py-2.5 px-0 w-full  font-semibold text-lg text-yellow-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
            />
            {errors.bio && (
              <span className="text-red-500  font-semibold text-lg">
                {errors.bio.message}
              </span>
            )}
            <label className="peer-focus:font-semibold text-lg absolute  font-semibold text-lg  text-yellow-500 dark:text-yellow400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tell me about yoursel!
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("phoneNumber")}
                type="tel"
                className={`block py-2.5 px-0 w-full  font-semibold text-lg text-yellow-500 bg-transparent border-0 border-b-2 border-gray-300 
                  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                  focus:border-blue-600 peer ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                placeholder=" "
                required
              />
              {errors.phoneNumber && (
                <span className="text-red-500  font-semibold text-lg">
                  {errors.phoneNumber.message}
                </span>
              )}
              <label className="peer-focus:font-semibold text-lg absolute  font-semibold text-lg text-yellow-500 dark:text-yellow400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone number (+33 1 23 45 67 89)
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_company"
                id="floating_company"
                className="block py-2.5 px-0 w-full  font-semibold text-lg text-yellow-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-semibold text-lg absolute  font-semibold text-lg text-yellow-500 dark:text-yellow400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Occupation (Ex. Math teachet at ...)
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm  font-semibold text-lg font-semibold text-lg rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </form>
      </div>

      {/*    <div className="flex flex-col items-center mt-10 p-10 z-10 ">
        {
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 z-40 w-3/5"
          >
            <div>
              <label className="block text-md font-semibold text-lg text-yellow-500 italic">
                Name
              </label>
              <input
                {...register("name")}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm: font-semibold text-lg ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500  font-semibold text-lg">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="peer-focus:font-semibold text-lg absolute  font-semibold text-lg text-yellow-500 dark:text-yellow400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm: font-semibold text-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500  font-semibold text-lg">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block  font-semibold text-lg font-semibold text-lg text-yellow700">
                Bio
              </label>
              <textarea
                {...register("bio")}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm: font-semibold text-lg ${
                  errors.bio ? "border-red-500" : ""
                }`}
              />
              {errors.bio && (
                <span className="text-red-500  font-semibold text-lg">
                  {errors.bio.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm  font-semibold text-lg font-semibold text-lg rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </form>
        }
      </div>*/}
    </>
  );
};

export default ProfileSettings;
