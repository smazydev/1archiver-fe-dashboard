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
                <input type="text" id="integrationName" name="integrationName" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="authenticationType">Authentication Type</label>
                <Button value="sign-in-with-microsoft" name="sign-in-with-microsoft" className="w-full">Sign-in with Microsoft Teams</Button>
                <label htmlFor="tenantID">Tenant ID</label>
                <input type="text" id="tenantID" name="tenantID" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <fieldset className="flex flex-col gap-2">
                    <legend className="font-medium mb-2">Access Scope</legend>

                    <label htmlFor="teams" className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="teams"
                            name="accessScope"
                            value="teams"
                            className="border-slate-900 border rounded bg-slate-200"
                        />
                        Teams
                    </label>

                    <label htmlFor="channels" className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="channels"
                            name="accessScope"
                            value="channels"
                            className="border-slate-900 border rounded bg-slate-200"
                        />
                        Channels
                    </label>

                    <label htmlFor="chats" className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="chats"
                            name="accessScope"
                            value="chats"
                            className="border-slate-900 border rounded bg-slate-200"
                        />
                        Chats
                    </label>
                </fieldset>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default MicrosoftTeamsForm;
