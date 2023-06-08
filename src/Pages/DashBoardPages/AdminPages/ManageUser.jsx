import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useRole } from "../../../hooks/useRole";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure()
    // const role = useRole()
    // console.log(role);
    axiosSecure.get('/users',)
    .then(res=>{
        console.log(res.data);
    })

    return (
        <div>
            Manage user
        </div>
    );
};

export default ManageUser;