import { homeHeroImage } from "../utils/blogs.constants";

const Home = () => {
  return (
    <div>
      <div className="border w-[60%] mx-auto mt-6 rounded-md shadow-md">
        <img src={homeHeroImage} alt="HeroImage" />
      </div>
      <div className="mt-5 flex justify-center gap-x-4 ">
        <button
          className="px-4 py-2 w-[150px] rounded-md bg-purple-100 hover:bg-white"
          onClick={() => {
            window.location.href = "/blogs";
          }}
        >
          View Blogs
        </button>
        <button
          className="px-4 py-2 w-[150px] rounded-md bg-purple-100 hover:bg-white"
          onClick={() => {
            window.location.href = "/create-blog";
          }}
        >
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default Home;
