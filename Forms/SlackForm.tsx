import React from "react";
import { Button } from "../components/UI";

const SlackForm = () => {
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
                <Button value="sign-in-with-slack" name="sign-in-with-slack" className="w-full">Sign-in with Slack</Button>
                <label htmlFor="workspace">Workspace</label>
                <input type="text" id="workspace" name="workspace" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="channel">Channel</label>
                <input type="checkbox" id="channel" name="channel" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Public Channels
                <input type="checkbox" id="channel" name="channel" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Private Channels
                <input type="checkbox" id="channel" name="channel" className="border-slate-900 border rounded-lg p-2 bg-slate-200" />Direct Messages
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default SlackForm;