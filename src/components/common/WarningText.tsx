import { PropsWithChildren } from "react";

function WarningText({children}: PropsWithChildren){
    return <p className="pt-40 text-center label text-gray-200">{children}</p>;
}
export default WarningText;