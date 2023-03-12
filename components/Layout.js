import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            <div className="container">
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;