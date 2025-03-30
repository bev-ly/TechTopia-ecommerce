
import Header from "./components/header/Header";
import HomePage from "./components/home/Home";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Header/>
      <main>
        <HomePage/>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer> */}
    </div>
  );
}
