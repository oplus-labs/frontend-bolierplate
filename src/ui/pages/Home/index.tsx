export default function Home() {
  return (
    <div className="m-auto h-fit bg-white">
      <div className="App flex flex-col-reverse md:flex-row">
        <div className="left background-animate h-[25svh] w-screen bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 md:h-[100svh] md:w-[25vw]" />
        <div className="home-page-template flex h-[80svh] w-screen select-none flex-col gap-4 bg-black tracking-wider text-white md:h-[100svh] md:w-[75vw]">
          <div className="cover m-auto flex w-[70%] flex-col gap-1">
            <h1 className="text-[3rem] uppercase  md:text-[5rem]">opluslab(s)</h1>
            <h1 className="text-[1rem] first-letter:text-4xl md:text-2xl md:first-letter:text-8xl">
              Frontend <p className="inline bg-[#FFDC1C] px-1 text-center font-bold text-black">Boilerplate.</p>
            </h1>
            <p className="text-2xl font-thin">Happy Coding. 😍</p>
          </div>
        </div>
      </div>
    </div>
  );
}
