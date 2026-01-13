import { Button } from "./UI";
import { Card } from "./UI";
import { Badge } from "./UI";

interface DataSourcesProps {
    mailboxes: any[];
    mailboxesLoading: boolean;
}

export const DataSources = ({
    mailboxes,
    mailboxesLoading,
}: DataSourcesProps) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Data Sources</h1>
                <Button>+ Add Integration</Button>
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
                                    <td className="p-4 font-medium">
                                        {mb.email_address}
                                    </td>
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
