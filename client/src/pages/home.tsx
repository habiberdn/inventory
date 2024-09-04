import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
const Home = () => {
    return (
        <main className="flex">
            <Sidebar />
            <div className="w-full">
            <Navbar/>

            </div>
        </main>
    )
}

export default Home