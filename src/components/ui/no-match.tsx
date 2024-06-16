import { ReactElement } from "react";

function NoMatch(): ReactElement {
    return (
        <div className="space-y-3 text-center">
            <h3 className="text-indigo-600 font-semibold">
                404 Error
            </h3>
            <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                Page not found
            </p>
            <p>
                Sorry, the page you are looking for could not be found or has been removed.
            </p>
        </div>
    );
}

export { NoMatch }
