import Image from './asset/image.png'

const Navbar = () => {
    return (
        <section className="flex bg-[#ffff] p-3 h-[3.55rem] items-center w-full  shadow-md">
            <div className="flex justify-end w-full p-2 items-center gap-2">
                <img alt="img"
                    src={Image} 
                    className="rounded-full w-9 h-9  "
                    loading="lazy"
                    aria-label="image" />
                <p>Name</p>

            </div>
        </section>
    )
}

export default Navbar;