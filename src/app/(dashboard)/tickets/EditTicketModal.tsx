'use client'

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Ticket} from './columns';
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface EditTicketModalProps {
    record: Ticket | null;
    onClose: () => void;
}

export default function EditTicketModal({record, onClose}: EditTicketModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        client_name: '',
        client_email: '',
        website_url: '',
        description: '',
        status: 'Open',
        priority: 'Normal',
        internal_notes: '',
        title: '',
    });

    const ticketStatus: Record<string, string> = {
        'open': 'Open',
        'in_progress': 'In Progress',
        'review': 'Review',
        'closed': 'Closed',
    };

    const ticketPriority: Record<string, string> = {
        'low': 'Low',
        'normal': 'Normal',
        'high': 'High',
        'urgent': 'Urgent',
    };

    useEffect(() => {
        if (record) {
            setForm({
                client_name: record.client_name,
                client_email: record.client_email,
                website_url: record.website_url,
                description: record.description,
                status: record.status,
                priority: record.priority,
                internal_notes: record.internal_notes,
                title: record.title,
            });
        }
    }, [record]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/tickets/${record?.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("handleSave: Failed to update ticket");

            onClose();
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this ticket?')) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/tickets/${record?.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error("handleDelete: Failed to delete ticket");

            onClose();
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={!!record} onOpenChange={onClose}>
            <DialogContent className="max-h-[90svh] overflow-y-auto" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Ticket: {record?.id} - {record?.title}</DialogTitle>
                    <div className="flex justify-end py-1">Last Updated: {record?.updated_on ? new Date(record.updated_on).toLocaleString() : 'N/A'}</div>
                    <DialogDescription>Make edits to the ticket below:</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-2 w-full">

                    {/* Row 1 - Client info (stacks on phones) */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-1">
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="client_name">Client Name *</Label>
                            <Input id="client_name" name="client_name" value={form.client_name} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="client_email">Client Email</Label>
                            <Input id="client_email" name="client_email" type="email" value={form.client_email} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="website_url">Website URL</Label>
                            <Input id="website_url" name="website_url" type="url" value={form.website_url} onChange={handleChange} placeholder="https://example.com" />
                        </div>
                    </div>

                    {/* Row 2 - Status and Priority */}
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <Select value={form.status} onValueChange={(value) => setForm({...form, status: value})}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(ticketStatus).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={form.priority} onValueChange={(value) => setForm({...form, priority: value})}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(ticketPriority).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Row 3 - Title */}
                    <div className="flex flex-row gap-1 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="title">Ticket Title</Label>
                            <Input id="title" name="title" value={form.title} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Row 4 - Description */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Description of ticket..." />
                    </div>

                </div>

                <DialogFooter className="flex justify-between gap-2">
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
    );
}