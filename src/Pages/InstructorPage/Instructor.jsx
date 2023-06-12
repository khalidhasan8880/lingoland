import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import InstructorCard from "../../components/InstructorCard/InstructorCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Instructor = () => {
    const axiosSecure = useAxiosSecure()
    const { data = [] } = useQuery({
        queryKey: ['allInstructor'],
        queryFn: async () => axiosSecure.get('/instructors').then(res => res.data)
    })
    console.log(data);
    return (
        <section >
            <SectionTitle>Instructors</SectionTitle>
            <div className="flex gap-5 flex-wrap justify-center items-center">
                {
                    data?.instructors?.map(instructor => <InstructorCard
                        key={instructor._id}
                        instructor={instructor}
                    ></InstructorCard>)
                }
            </div>

        </section>
    );
};

export default Instructor;