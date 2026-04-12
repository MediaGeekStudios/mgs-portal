'use client'

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddTicketButton() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        client_name: '',
        client_email: '',
        website_url: '',
        description: '',
        status: '',
        priority: '',
        internal_notes: '',
        title: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to create ticket');

            setOpen(false);
            setForm({
                client_name: '',
                client_email: '',
                website_url: '',
                description: '',
                status: '',
                priority: '',
                internal_notes: '',
                title: ''
            });
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const status: object = {
        open: 'Open',
        close: 'Close',
        in_progress: 'In Progress',
        review: 'Review',
    };

    const priority: object = {
        low: 'Low',
        normal: 'Normal',
        high: 'High',
        urgent: 'Urgent',
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>+ Add New</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Ticket</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-2">
                        <div className="flex flex-row gap-1">
                            <Label htmlFor="client_name">Client Name *</Label>
                            <Input id="client_name" name="client_name" value={form.client_name}
                                   onChange={handleChange}/>

                            <Label htmlFor="client_email">Client Email</Label>
                            <Input id="client_email" name="client_email" value={form.client_email}
                                   onChange={handleChange}/>

                            <Label htmlFor="website_url">Website URL</Label>
                            <Input id="website_url" name="website_url" value={form.website_url} onChange={handleChange}
                                   placeholder="https://example.com"/>
                        </div>

                        <div className="flex flex-row gap-1">
                            {/*<Label htmlFor="status">Status</Label>*/}
                            <div className='flex-col gap-2'>

                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(status).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {Object.entries(priority).map(([key, value]) => (
                                            <SelectItem key={key} value={key}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </div>

                        </div>

                        <div className="flex flex-row gap-1">
                            <Label htmlFor="title">Ticket Title</Label>
                            <input id="title" name="title" value={form.title} onChange={handleChange}/>
                        </div>

                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}