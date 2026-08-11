import axiosInstance from "./axiosInstance";




// =====================================================
// PROFILE
// =====================================================


// Get Profile

export const getProfileApi = ()=>{

return axiosInstance.get(
"/users/profile"
);

};





// Update Profile

export const updateProfileApi=(data)=>{

return axiosInstance.put(
"/users/profile",
data
);

};









// =====================================================
// PASSWORD
// =====================================================


export const changePasswordApi=(data)=>{

return axiosInstance.put(
"/users/change-password",
data
);

};










// =====================================================
// ADMIN USERS
// =====================================================


// Get Users

export const getUsersApi=()=>{

return axiosInstance.get(
"/users"
);

};




// // Update Role

// export const updateUserRoleApi=(id,role)=>{

// return axiosInstance.patch(

// `/users/role/${id}`,

// {
// role
// }

// );

// };




// // Delete User

// export const deleteUserApi=(id)=>{

// return axiosInstance.delete(

// `/users/${id}`

// );

// };









// =====================================================
// SAVED ADDRESS API
// =====================================================


// Get Saved Addresses

export const getAddressesApi=()=>{

return axiosInstance.get(

"/users/addresses"

);

};







// Add New Address

export const addAddressApi=(data)=>{


return axiosInstance.post(

"/users/addresses",

data

);


};








// Update Address

export const updateAddressApi=(id,data)=>{


return axiosInstance.put(

`/users/addresses/${id}`,

data

);


};








// Delete Address

export const deleteAddressApi=(id)=>{


return axiosInstance.delete(

`/users/addresses/${id}`

);


};









// Set Default Address

export const setDefaultAddressApi=(id)=>{


return axiosInstance.put(

`/users/addresses/default/${id}`

);


};




// ==========================================
// ADMIN - GET ALL USERS
// ==========================================
export const getAllUsersApi = async () => {
  const { data } = await axiosInstance.get("/users");
  return data;
};

// ==========================================
// ADMIN - GET USER BY ID
// ==========================================
export const getUserByIdApi = async (id) => {
  const { data } = await axiosInstance.get(`/users/${id}`);
  return data;
};

// ==========================================
// ADMIN - BLOCK USER
// ==========================================
export const blockUserApi = async (id) => {
  const { data } = await axiosInstance.patch(`/users/block/${id}`);
  return data;
};

// ==========================================
// ADMIN - UNBLOCK USER
// ==========================================
export const unblockUserApi = async (id) => {
  const { data } = await axiosInstance.patch(`/users/unblock/${id}`);
  return data;
};

// ==========================================
// ADMIN - CHANGE USER ROLE
// ==========================================
export const updateUserRoleApi = async (id, role) => {
  const { data } = await axiosInstance.patch(`/users/role/${id}`, {
    role,
  });

  return data;
};

// ==========================================
// ADMIN - DELETE USER
// ==========================================
export const deleteUserApi = async (id) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data;
};