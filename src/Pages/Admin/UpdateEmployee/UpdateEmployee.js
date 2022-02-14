import React from "react";
import { useForm } from "react-hook-form";

const UpdateEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2>
        This is employee management page. In this page, admin manage the
        employee and update the employee field like as position, salary,
        employee ID, Joining date, Resign Date etc.
      </h2>
      <div className="py-5 mx-2">
        <div className="lg:w-1/3 m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            <br />
            <label>Photo URL:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Photo URL"
              {...register("photoURL")}
            />
            <br />
            <label>Email:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
            <br />
            <label>Role ID:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Role ID"
              {...register("roleId", { required: true })}
            />
            <label>Role Description:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Role Description"
              {...register("roleDes", { required: true })}
            />
            {errors.role && <span>This field is required</span>}
            <br />
            <label>Employee ID:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Employee ID"
              {...register("employeeId", { required: true })}
            />
            {errors.employeeId && <span>This field is required</span>}
            <br />
            <label>About:</label>
            <textarea
              rows={5}
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="About"
            />
            <br />
            <label>Address:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Address"
              {...register("address", { required: true })}
            />
            {errors.address && <span>This field is required</span>}
            <br />
            <label>Joining Date:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Joining Date"
              type="date"
              {...register("joiningDate", { required: true })}
            />
            {errors.joiningDate && <span>This field is required</span>}
            <br />
            <label>Resign Date:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Resign Date"
              type="date"
              {...register("resignDate")}
            />
            <br />
            <label>Salary:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Salary"
              type="number"
              {...register("salary")}
            />
            <br />
            <input
              className="bg-sky-900 px-3 py-2 text-white rounded cursor-pointer"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
