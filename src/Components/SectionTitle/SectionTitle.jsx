
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="md:w-3/12 mx-auto text-center my-10">
            <p className="text-yellow-500 mb-4">---{subHeading}---</p>
            <h3 className="text-3xl uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;