import React from "react";
import { Button } from "../components/UI"

const MicrosoftTeamsForm = () => {
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
                <Button value="sign-in-with-microsoft" className="w-full">Sign-in with Microsoft Teams</Button>
                <label htmlFor="tenantID">Tenant ID</label>
                <input type="text" id="tenantID" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="accessScope">Access Scope</label>
                <input type="checkbox" id="accessScope" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Teams
                <input type="checkbox" id="accessScope" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Channels
                <input type="checkbox" id="accessScope" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Chats
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default MicrosoftTeamsForm;
