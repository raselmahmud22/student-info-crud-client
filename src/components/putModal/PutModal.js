import React, { useState } from "react";
import { toast } from "react-toastify";

const PutModal = (props) => {
  const { put, setPut, refetch, ForEdit } = props;
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);
  console.log(put);
  const handleForm = (e) => {
    setSpinner(true);
    e.preventDefault();
    const name = e.target.fullName.value;
    const phone = e.target.phone.value;
    const degree = e.target.degree.value;
    const university = e.target.university.value;
    const regNo = e.target.registration.value;
    if (
      phone.length === 11 ||
      name.length > 3 ||
      degree ||
      university ||
      regNo ||
      ForEdit
    ) {
      console.log("inside for edit");
      fetch(`https://student-crud-rm.herokuapp.com/student/${ForEdit}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
        body: JSON.stringify({
          name,
          degree,
          university,
          regNo,
          phone,
        }),
      }).then((res) => {
        setSpinner(false);
        if (res.status === 200) {
          toast.success("your request was updated", {
            toastId: "put",
          });
          refetch();
          setPut(false);
        } else {
          toast.error("Authentication failed", {
            toastId: "failed",
          });
        }
      });
    } else {
      setError(true);
    }
  };
  return (
    <>
      <input type="checkbox" id="put-student" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="put-student"
            className="btn btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={handleForm}>
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="text"
              name="fullName"
              placeholder="Enter Full Name above 3 letter"
            />

            <input
              className="block w-10/12 p-1 rounded my-1"
              type="number"
              name="phone"
              placeholder="Enter phone 11 digit"
            />
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="number"
              name="registration"
              placeholder="Enter registration no"
            />
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="text"
              name="university"
              placeholder="Enter University"
            />
            <input
              className="block w-10/12 p-1 rounded my-1"
              type="text"
              name="degree"
              placeholder="Enter degree"
            />
            {error && (
              <p className="text-red-500 text-xl text-center">
                Please give valid info
              </p>
            )}
            <div className="modal-action">
              <button
                disabled={spinner}
                typeof="submit"
                className="btn-xl cursor-pointer"
              >
                {spinner ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
          <div className="modal-action"></div>
        </div>
      </div>
    </>
  );
};

export default PutModal;
