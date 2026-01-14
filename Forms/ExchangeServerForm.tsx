import { Button } from "@/components/UI";
import React from "react";

const ExchangeServerForm = () => {
    return (
        <div className="w-full max-h-[75vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
            <form
                action=""
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3 flex flex-col gap-2 items-start justify-center w-full p-8 box-border bg-slate-50 rounded-lg text-slate-900"
            >
                <label htmlFor="integrationName">Integration Name</label>
                <input type="text" id="integrationName" name="integrationName" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="exchangeServerURL">Exchange Server URL</label>
                <input type="text" id="exchangeServerURL" name="exchangeServerURL" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="DomainName">Domain Name</label>
                <input type="text" id="DomainName" name="domainName" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="serviceAccountUsername">Service Account Username</label>
                <input type="text" id="serviceAccountUsername" name="serviceAccountUsername" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="serviceAccountPassword">Service Account Password</label>
                <input type="password" id="serviceAccountPassword" name="serviceAccountPassword" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label required htmlFor="authenticationType">Authentication Type</label>
                <select name="authenticationType" id="authenticationType" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full">
                    <option value="NTLM">NTLM</option>
                    <option value="kerberos">Kerberos</option>
                    <option value="basic">Basic (HTTPS only)</option>
                </select>
                <label required htmlFor="mailboxAccessScope">Mailbox Access Scope</label>
                <select name="mailboxAccessScope" id="mailboxAccessScope" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full">
                    <option value="Single Mailbox">Single Mailbox</option>
                    <option value="Multiple Mailboxes">Multiple Mailboxes</option>
                    <option value="All Mailboxes">All Mailboxes (impersonation)</option>
                </select>
                <label htmlFor="primaryMailbox">Primary Mailbox Email</label>
                <input showonlyif="mailboxAccessScope === 'Single Mailbox'" type="email" id="primaryMailbox" name="primaryMailbox" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full" />
                <label htmlFor="includeArchiveMailboxes">Include Archive Mailboxes</label>
                <input type="checkbox" id="includeArchiveMailboxes" name="includeArchiveMailbox" />
                <label htmlFor="folderScope">Folders to Archive</label>
                <select name="folderScope" id="folderScope" className="border-slate-900 border rounded-lg p-2 bg-slate-200 w-full">
                    <option value="inbox">Inbox</option>
                    <option value="sent">Sent</option>
                    <option value="deleted">Deleted</option>
                    <option value="all">All Folders</option>
                </select>
                <Button type="button" className="w-full" name="testConnection">Test Connection</Button>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default ExchangeServerForm;
