'use client';

import { useState } from 'react';
import { Client } from './columns';
import AddClientButton from './AddClientButton';
import EditClientModal from './EditClientModal';
import { motion } from 'motion/react';
import {Mail} from "lucide-react";

interface ClientsClientProps {
    data: Client[];
}

export default function ClientsRenderer({ data }: ClientsClientProps) {

    const [selectedRecord, setSelectedRecord] = useState<Client | null>(null);
    const [sortBy, setSortBy] = useState<keyof Client>('name');

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl text-cyan-300 font-semibold">Customers</h1>
                <AddClientButton />
            </div>
            <p className="text-sm text-gray-200 mb-4">Manage client relationships and track engagement</p>
            <hr className="mb-5" />


            {/*<DataTable*/}
            {/*    columns={columns}*/}
            {/*    data={data}*/}
            {/*    onRowClick={(row) => setSelectedRecord(row as Client)}*/}
            {/*/>*/}


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...data].sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy]))).map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.1 } }}
                            whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.1 } }}
                            onClick={() => setSelectedRecord(client)}

                        >
                            <div className="bg-gray-200 rounded-2xl p-4 hover:shadow-xl transition-all duration-200 hover:border-secondary/30 group cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="mb-1 group-hover:text-primary transition-colors duration-200">
                                            {client.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {client.website_url}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground group/item">
                                        <Mail className="w-4 h-4 transition-colors duration-200 group-hover/item:text-primary" />
                                        <span>{client.email}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>


            <EditClientModal
                record={selectedRecord}
                onClose={() => setSelectedRecord(null)}
            />
        </>
    );
}