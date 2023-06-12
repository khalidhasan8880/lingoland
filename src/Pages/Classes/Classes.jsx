import Loading from "../../components/Loading/Loading";
import PopularCard from "../../components/PopularCard/PopularCard";
import useClasses from "../../hooks/useClasses";

const Classes = () => {
    const [classes, isLoading] = useClasses()
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <section className="grid gap-5 sm:grid-cols-3 font-semibold place-content-center ">
            {
                classes?.map(cls=>  <PopularCard cls={cls} key={cls?._id}></PopularCard>)
            }
           
        </section>
    );
};

export default Classes;