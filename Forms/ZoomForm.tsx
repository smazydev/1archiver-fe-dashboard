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
                <input type="text" id="integrationName" name="integrationName" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="authenticationType">Authentication Type</label>
                <Button value="sign-in-with-zoom" name="sign-in-with-zoom" className="w-full">Sign-in with Zoom</Button>
                <label htmlFor="zoomAccountID">Zoom Account ID</label>
                <input type="text" id="zoomAccountID" name="zoomAccountID" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <fieldset className="flex flex-col gap-2">
                    <legend className="font-medium mb-2">Access Scope</legend>

                    <label htmlFor="chat messages" className="flex items-center gap-2">
                        <input type="checkbox" id="chat messages"
                            name="chat messages" value="chat messages"
                            className="border-slate-900 border rounded bg-slate-200" />
                        Chat Messages
                    </label>

                    <label htmlFor="meetings" className="flex items-center gap-2">
                        <input type="checkbox" id="meetings"
                            name="meetings" value="meetings"
                            className="border-slate-900 border rounded bg-slate-200" />
                        Meetings
                    </label>
                </fieldset>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default ZoomForm;