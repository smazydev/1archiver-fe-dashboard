import React from "react";
import { Button } from "../components/UI";

const ZoomForm = () => {
    return (
        <div>
            <form
                action=""
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3 flex flex-col gap-2 items-start justify-center w-full p-8 bg-slate-50 rounded-lg text-slate-900"
            >
                <label htmlFor="integrationName">Integration Name</label>
                <input type="text" id="integrationName" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="authenticationType">Authentication Type</label>
                <Button value="sign-in-with-zoom" className="w-full">Sign-in with Zoom</Button>
                <label htmlFor="zoomAccountID">Zoom Account ID</label>
                <input type="text" id="zoomAccountID" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="accessScope">Access Scope</label>
                <input type="checkbox" id="accessScope" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Chat Messages
                <input type="checkbox" id="accessScope" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Meetings
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default ZoomForm;