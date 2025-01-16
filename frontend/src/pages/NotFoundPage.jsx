const NotFound = () => {
  // console.log("404");
  return (
    <section>
      <div className=" text-white">
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <div>
              <img src="/404_2.svg" alt="404" />
            </div>
            <p className="text-sm md:text-base text-[#588adb] p-2 mb-4">
              The stuff you were looking for doesn't exist
            </p>
            <a
              href="/"
              className="bg-transparent hover:bg-[#588adb] text-[#588adb] hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-[#588adb] hover:border-transparent"
            >
              Take me home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
