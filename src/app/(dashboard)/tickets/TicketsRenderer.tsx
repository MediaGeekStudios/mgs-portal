'use client';

import {useState} from 'react';
import {Ticket} from './columns';
import AddTicketButton from './AddTicketButton';
import EditTicketModal from './EditTicketModal';
import {motion} from 'motion/react';
import {Clock, AlertCircle, CheckCircle, Circle} from 'lucide-react';

interface TicketProps {
    data: Ticket[];
}

const statusIcons = {
    Open: Circle,
    "In Progress": Clock,
    Review: AlertCircle,
    Closed: CheckCircle,
};

const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Urgent: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
    };

export default function TicketsRenderer({data}: TicketProps) {
    const [selectedRecord, setSelectedRecord] = useState<Ticket | null>(null);

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl text-cyan-300 font-semibold">Tickets</h1>
                <AddTicketButton />
            </div>
            <p className="text-sm text-gray-200 mb-4">Manage tickets and their corresponding information</p>
            <hr className="mb-5"/>

        {/*<DataTable*/}
        {/*    columns={columns}*/}
        {/*    data={data}*/}
        {/*    onRowClick={(row) => setSelectedRecord(row as Ticket)}*/}
        {/*/>*/}

            <div className="p-8 max-w-7xl mx-auto">
                <div className="space-y-4">
                    {data.map((ticket, index) => {
                        const StatusIcon = statusIcons[ticket.status as keyof typeof statusIcons] ?? Circle;

                        return ( // Using a motion.div to create transformation effects for the list items
                            <motion.div
                                key={ticket.id}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0, transition: {duration: 0.4, delay: index * 0.08}}}
                                whileHover={{scale: 1.02, y: -4, transition: {duration: 0.1}}}
                                onClick={() => setSelectedRecord(ticket)}
                            >
                                <div className="bg-gray-200 rounded-2xl p-4 hover:shadow-md transition-all duration-300 hover:border-primary/30 group cursor-pointer">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                    <span
                                        className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                        {ticket.id}
                                    </span>
                                                <h3 className="group-hover:text-primary transition-colors duration-200">
                                                    {ticket.title}
                                                </h3>
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                {ticket.description}
                                            </p>

                                            <div className="flex items-center gap-3 text-sm">
                                    <span className="text-muted-foreground">
                                        <b>Client:</b> {ticket.client_name}
                                    </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">

                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyles[ticket.priority as keyof typeof priorityStyles] ?? "bg-gray-100 text-gray-700"}`}>{ticket.priority}</span>

                                            <div className="flex items-center gap-2 text-sm">
                                                <StatusIcon className="w-4 h-4" />
                                                <span className="font-medium">{ticket.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })}
                </div>

            </div>

            <EditTicketModal
                record={selectedRecord}
                onClose={() => setSelectedRecord(null)}
            />
        </>
    )
        ;
}