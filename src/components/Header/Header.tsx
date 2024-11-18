import logo from "../../assets/logo_full.png";

function Header() {
    return (
        <div className="flex items-center justify-between gap-2 bg-[#3B3B3B80] w-full p-2">
            <div className="flex items-center gap-4">
                <img className="h-10 block" src={logo} alt="GoLi" />
                <span>
                    <h1 className="font-bold text-xl">
                        Meet & Screen Recorder (Early Access)
                    </h1>
                    <p className="text-xs">
                        Record your meetings and screen with GoLi. It's free and
                        easy to use.
                    </p>
                </span>
            </div>

            <div className="flex items-center gap-2 px-5 space-x-3">
                <a
                    href=""
                    className="text-white font-medium hover:text-gray-300 space-x-2"
                >
                    <span className="fa fa-code"></span>
                    <span>Contact Developer</span>
                </a>

                <a
                    href=""
                    className="text-white font-medium hover:text-gray-300 space-x-2"
                >
                    <span className="fas fa-cog"></span>
                    <span>Configurations</span>
                </a>
            </div>
        </div>
    );
}

export default Header;
