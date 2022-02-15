import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useStore from "../../../hooks/useStore";

const UpdateEmployee = () => {
  const [singleEmployee, setSingleEmployee] = useState({});
  const { user_id } = useParams();
  const { employees, setEmployees } = useStore();

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleEmployee(data);
      });
  }, [user_id]);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const employeeInfo = {
      photoURL: data.photoURL || singleEmployee.employeeInfo.photoURL,
      role: {
        roleId: data.roleId || singleEmployee.employeeInfo.role.roleId,
        roleDes: data.roleDes || singleEmployee.employeeInfo.role.roleDes,
      },
      employeeId: data.employeeId || singleEmployee.employeeInfo.employeeId,
      about: data.about || singleEmployee.employeeInfo.about,
      joiningDate: data.joiningDate || singleEmployee.employeeInfo.joiningDate,
      resignDate: data.resignDate || singleEmployee.employeeInfo.resignDate,
      salary: data.salary || singleEmployee.employeeInfo.salary,
      address: data.address || singleEmployee.employeeInfo.address,
      bloodGroup: data.bloodGroup || singleEmployee.employeeInfo.bloodGroup,
      nid: data.nid || singleEmployee.employeeInfo.nid,
    };
    const updateData = {
      employeeInfo: {
        ...employeeInfo,
      },
    };
    const isUpdate = window.confirm("Are you sure update user data?");
    if (isUpdate) {
      fetch(`http://localhost:5000/users/${user_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            let updateEmployeeArr = [];
            for (let emp of employees) {
              if (emp.user_id === user_id) {
                emp = { ...emp, ...updateData };
              }
              updateEmployeeArr.push(emp);
            }
            setEmployees(updateEmployeeArr);
            alert("Update successfully");
          }
        });
    }
  };
  return (
    <div>
      <h2 className="text-center font-bold text-4xl uppercase border-4 my-3 p-3">
        Update user Info
      </h2>
      <div className="py-5 mx-2">
        <div className=" w-2/3 m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name:</label>
            <input
              disabled
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md bg-gray-200"
              placeholder="Name"
              defaultValue={singleEmployee?.displayName}
              {...register("name")}
            />
            <br />
            <label>Photo URL:</label>
            <input
              disabled
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md bg-gray-200"
              defaultValue={singleEmployee?.employeeInfo?.photoURL}
              placeholder="Photo URL"
              {...register("photoURL")}
            />
            <br />
            <label>Email:</label>
            <input
              disabled
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md bg-gray-200"
              defaultValue={singleEmployee?.email}
              placeholder="Enter your email"
              type="email"
              {...register("email")}
            />
            <br />
            <label>Role ID:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              defaultValue={singleEmployee?.employeeInfo?.role?.roleId}
              placeholder="Role ID"
              {...register("roleId")}
            />
            <label>Role Description:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              defaultValue={singleEmployee?.employeeInfo?.role?.roleDes}
              placeholder="Role Description"
              {...register("roleDes")}
            />

            <br />
            <label>Employee ID:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              defaultValue={singleEmployee?.employeeInfo?.employeeId}
              placeholder="Employee ID"
              {...register("employeeId")}
            />

            <br />
            <label>About:</label>
            <textarea
              rows={5}
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              defaultValue={singleEmployee?.employeeInfo?.about}
              placeholder="About"
              {...register("about")}
            />
            <br />
            <label>Address:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Address"
              defaultValue={singleEmployee?.employeeInfo?.address}
              {...register("address")}
            />

            <br />
            <label>Joining Date:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Joining Date"
              defaultValue={singleEmployee?.employeeInfo?.joiningDate}
              type="date"
              {...register("joiningDate")}
            />

            <br />
            <label>Resign Date:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Resign Date"
              defaultValue={singleEmployee?.employeeInfo?.resignDate}
              type="date"
              {...register("resignDate")}
            />
            <br />
            <label>Salary:</label>
            <input
              className="border-2 border-black w-full my-3 p-2 text-2xl rounded-md"
              placeholder="Salary"
              type="number"
              defaultValue={singleEmployee?.employeeInfo?.salary}
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
