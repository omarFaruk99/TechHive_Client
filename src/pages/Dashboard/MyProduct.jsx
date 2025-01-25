import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const MyProduct = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: userProducts = [], refetch } = useQuery({
    queryKey: ["userProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products?email=${user.email}`);
      console.log(`user data${user.email}=====>`, res);
      return res.data;
    },
  });

  return (
    <div>
      <h2>My Product{userProducts.length}</h2>
    </div>
  );
};

export default MyProduct;
