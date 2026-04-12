'use client';

import { useState } from 'react';
import { DataTable } from "../../../components/DataTable";
import { columns, Client } from './columns';
import AddClientButton from './AddClientButton';
import EditClientModal from './EditClientModal';

interface ClientsClientProps {
    data: Client[];
}

export default function ClientsRenderer({ data }: ClientsClientProps) {
    const [selectedRecord, setSelectedRecord] = useState<Client | null>(null);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl text-cyan-300 font-semibold">Customers</h1>
                <AddClientButton />
            </div>

            <DataTable
                columns={columns}
                data={data}
                onRowClick={(row) => setSelectedRecord(row as Client)}
            />

            <EditClientModal
                record={selectedRecord}
                onClose={() => setSelectedRecord(null)}
            />
        </>
    );
}