import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import MyReviewsCard from "./MyReviewsCard";
import toast from "react-hot-toast";

const MyReview = () => {
  const { user, logOut } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/reviewsByUser?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("architect-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setMyReviews(data));
  }, [user?.email, logOut]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure? You want to delete");
    if (proceed) {
      fetch(`http://localhost:5000/reviews/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success("Deleted Successfully");
            const remaining = myReviews.filter((review) => review._id !== id);
            setMyReviews(remaining);
          }
        });
    }
  };
  return (
    <div className="container mx-auto py-10">
      {myReviews.length === 0 ? (
        <>
          <h2 className="text-5xl text-orange-600 text-center">
            No reviews were added
          </h2>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5">
            {myReviews.map((myReview) => (
              <MyReviewsCard
                key={myReview._id}
                myReview={myReview}
                handleDelete={handleDelete}
              ></MyReviewsCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyReview;
