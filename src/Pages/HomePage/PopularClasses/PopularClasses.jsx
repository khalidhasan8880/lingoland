
import PopularCard from "../../../components/PopularCard/PopularCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PopularClasses = ({classes}) => {

    return (
        <section className="mt-40">
            <SectionTitle>Our Popular Classes</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-3 font-semibold place-content-center ">
                {
                    classes?.map(cls=><PopularCard 
                        key={cls._id}
                        cls={cls}
                    ></PopularCard>)
                }
                
            </div>
        </section>
    );
};

export default PopularClasses;