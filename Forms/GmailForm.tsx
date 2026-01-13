import React from "react";
import { Button } from "../components/UI";

const GmailForm = () => {
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
                <Button type="button" className="w-full">Sign-in with Google</Button>
                <label htmlFor="googleAccount">Google Account</label>
                <input type="email" id="googleAccount" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="accessScope">Access Scope</label>
                <select name="" id="" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full">
                    <option value="readMails">Read Mails</option>
                    <option value="readAttachments">Read Attachments</option>
                </select>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default GmailForm;