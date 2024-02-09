import RouteList from "../../utils/RouteList";
import { AdminPathList } from "./AdminPathList";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className=" h-[100%] flex overflow-hidden border-none">
            <nav
                className="overflow-y-auto  bg-secondary md:bg-transparent w-[5rem] md:min-w-[16rem] py-2 md:p-2 ">
                <RouteList PathList={AdminPathList} />
            </nav>
            <section className="overflow-hidden overflow-y-auto h-full w-full m-1 rounded">
                {children}
            </section>
        </main>
    );
}