'use client'

import {useState, useEffect, ChangeEvent} from 'react';
import {useRouter} from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Client} from './columns';
import AddTicketButton from "@/app/(dashboard)/tickets/AddTicketButton";

interface EditClientModalProps {
    record: Client | null;
    onClose: () => void;
}

export default function EditClientModal({record, onClose}: EditClientModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({name: '', email: '', website_url: '', type: ''});
    const [ticketOpen, setTicketOpen] = useState(false);

    useEffect(() => {
        if (record) {
            setForm({
                name: record.name ?? '',
                type: record.type ?? '',
                email: record.email ?? '',
                website_url: record.website_url ?? '',
            });
        }
    }, [record]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/clients/${record?.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Failed to update customer");

            onClose();
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const newClientTicket = () => {
        setTicketOpen(true);
    };

    const handleDelete = async () => {
        console.log('handleDelete fired', record?.id);
        if (!confirm('Are you sure you want to delete this customer?')) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/clients/${record?.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error("Failed to delete customer");

            onClose();
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={!!record} onOpenChange={onClose}>
                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Edit Client</DialogTitle>
                        <DialogDescription>Edit client information below</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-2">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="name">Name *</Label>
                            <Input id="name" name="name" value={form.name} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="type">Type</Label>
                            <Input id="type" name="type" value={form.type} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" name="email" value={form.email} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="website_url">Website URL</Label>
                            <Input id="website_url" name="website_url" value={form.website_url}
                                   onChange={handleChange}/>
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between gap-2 w-full">
                        <div className="flex-1/12">
                            <Button variant="outline" onClick={newClientTicket} disabled={loading}>Create
                                Ticket</Button>
                        </div>
                        <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                            Delete
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button onClick={handleSave} disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </Button>

                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AddTicketButton
                open={ticketOpen}
                onOpenChange={setTicketOpen}
                defaultValues={{
                    client_name: record?.name,
                    client_email: record?.email,
                    website_url: record?.website_url,
                }}
            />
        </>
    )
}