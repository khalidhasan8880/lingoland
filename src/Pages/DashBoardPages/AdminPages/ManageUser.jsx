import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure()
    
    axiosSecure.get('/users')
    .then(res=>{
        console.log(res.data);
    })
    return (
        <div>
            
        </div>
    );
};

export default ManageUser;