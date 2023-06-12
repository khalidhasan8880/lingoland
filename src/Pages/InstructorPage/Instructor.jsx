
import InstructorCard from "../../components/InstructorCard/InstructorCard";
import Loading from "../../components/Loading/Loading";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useInstructors from "../../hooks/useInstructors";

const Instructor = () => {
    const [data, isLoading] = useInstructors()
    console.log(data);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section className="mt-40">
            <SectionTitle>Meet Our Top Instructors</SectionTitle>
            <div className="flex gap-5 flex-wrap justify-center items-center">
                {
                    data?.instructors?.map(instructor => <InstructorCard
                        key={instructor._id}
                        classes={data?.classes}
                        instructor={instructor}
                    ></InstructorCard>)
                }
            </div>

        </section>
    );
};

export default Instructor;