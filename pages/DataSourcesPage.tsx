import React from "react";
import { Button } from "../components/UI";
import { Card } from "../components/UI";
import { Badge } from "../components/UI";
import { useState } from "react";
import { useEffect } from "react";
import ExchangeServerForm from "../Forms/ExchangeServerForm";
import GmailForm from "@/Forms/GmailForm";
import SlackForm from "@/Forms/SlackForm";
import MicrosoftTeamsForm from "@/Forms/MicrosoftTeamsForm";
import ZoomForm from "@/Forms/ZoomForm";

interface Props {
    mailboxesLoading: boolean;
    mailboxes: any[];
}

const DataSourcesPage = ({ mailboxesLoading, mailboxes }: Props) => {

    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(prev => !prev);
    };

    type IntegrationType = "Exchange Server On-Premises" | "Gmail" | "Slack" | "Microsoft Teams" | "Zoom" | null;

    const [integrationType, setIntegrationType] = useState<IntegrationType>(null);

    const toggleExchangeServerForm = () => {
        integrationType ? setIntegrationType(null) : setIntegrationType("Exchange Server On-Premises");
    };

    const toggleGmailForm = () => {
        integrationType ? setIntegrationType(null) : setIntegrationType("Gmail");
    };

    const toggleSlackForm = () => {
        integrationType ? setIntegrationType(null) : setIntegrationType("Slack");
    };

    const toggleMicrosoftTeamsForm = () => {
        integrationType ? setIntegrationType(null) : setIntegrationType("Microsoft Teams");
    };

    const toggleZoomForm = () => {
        integrationType ? setIntegrationType(null) : setIntegrationType("Zoom");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Data Sources</h1>
                <Button onClick={toggleModal}>
                    + Add Integration
                </Button>

                {open && (
                    <div
                        className="absolute right-48 top-32 z-10
                        w-[520px] max-h-[75vh]
                        bg-slate-700 text-white text-lg
                        rounded-lg overflow-y-auto overflow-x-hidden hide-scrollbar"
                    >
                        <div className="p-8 flex flex-col gap-6">

                            <ul className="space-y-4">
                                <li
                                    onClick={toggleExchangeServerForm}
                                    className="cursor-pointer hover:text-slate-300"
                                >
                                    Exchange Server On-Premises
                                </li>

                                <li
                                    onClick={toggleGmailForm}
                                    className="cursor-pointer hover:text-slate-300"
                                >
                                    Gmail
                                </li>

                                <li
                                    onClick={toggleSlackForm}
                                    className="cursor-pointer hover:text-slate-300"
                                >
                                    Slack
                                </li>

                                <li
                                    onClick={toggleMicrosoftTeamsForm}
                                    className="cursor-pointer hover:text-slate-300"
                                >
                                    Microsoft Teams
                                </li>

                                <li
                                    onClick={toggleZoomForm}
                                    className="cursor-pointer hover:text-slate-300"
                                >
                                    Zoom
                                </li>
                            </ul>

                            {integrationType && (
                                <div className="border-t border-slate-500 pt-6">
                                    {integrationType === "Exchange Server On-Premises" && <ExchangeServerForm />}
                                    {integrationType === "Gmail" && <GmailForm />}
                                    {integrationType === "Slack" && <SlackForm />}
                                    {integrationType === "Microsoft Teams" && <MicrosoftTeamsForm />}
                                    {integrationType === "Zoom" && <ZoomForm />}
                                </div>
                            )}

                        </div>
                    </div>

                )}
            </div>

            <Card>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="p-4">Source Name</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Last Sync</th>
                            <th className="p-4">Items Ingested</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {mailboxesLoading ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-slate-500">
                                    Loading data sources...
                                </td>
                            </tr>
                        ) : (
                            mailboxes.map((mb) => (
                                <tr key={mb.mailbox_id}>
                                    <td className="p-4 font-medium">{mb.email_address}</td>
                                    <td className="p-4 capitalize">
                                        {mb.source_type.replace("_", " ")}
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="success">Healthy</Badge>
                                    </td>
                                    <td className="p-4 text-slate-500">Just now</td>
                                    <td className="p-4 font-mono">-</td>
                                </tr>
                            ))
                        )}

                        {!mailboxesLoading && mailboxes.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-slate-500">
                                    No data sources found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default DataSourcesPage;
