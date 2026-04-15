'use client'

import {useEffect, useState} from 'react';
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";

// Lifting modal up so EditClientModal can control it directly as well
interface AddTicketButtonProps {
    defaultValues?: {
        client_name?: string;
        client_email?: string;
        website_url?: string;
    };
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const emptyForm = {
    client_name: '',
    client_email: '',
    website_url: '',
    description: '',
    status: '',
    priority: '',
    internal_notes: '',
    title: '',
};

export default function AddTicketButton({ defaultValues, open, onOpenChange }: AddTicketButtonProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState<string | null>(null);

    //Controlled vs uncontrolled patter
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;

    // Pre-populate form when defaultValues are passed from other modal
    useEffect(() => {
        if (defaultValues) {
            setForm (prev => ({
                ...prev,
                client_name: defaultValues.client_name ?? '',
                client_email: defaultValues.client_email ?? '',
                website_url: defaultValues.website_url ?? '',
            }));
        }
    }, [defaultValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

            if (!res.ok) throw new Error('handleSubmit: Failed to create ticket');

            setIsOpen(false);
            setForm(emptyForm);
            router.refresh();
        } catch (error) {
            console.log(error);
            setError("handleSubmit: Failed to create ticket");
        } finally {
            setLoading(false);
        }
    };

    const status: object = {
        open: 'Open',
        closed: 'Closed',
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
            {/* Only render the button when used on Tickets page */}
            {!isControlled && (
                <Button onClick={() => setIsOpen(true)}>+ Add New</Button>
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Ticket</DialogTitle>
                        <DialogDescription>Use the following form to create a new ticket</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-2 w-full">
                        <div className="flex flex-row gap-1">
                            <div className="flex flex-col gap-2 w-full">


                                <Label htmlFor="client_name">Client Name *</Label>
                                <Input id="client_name" name="client_name" value={form.client_name}
                                       onChange={handleChange}/>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="client_email">Client Email</Label>
                                <Input id="client_email" name="client_email" value={form.client_email}
                                       onChange={handleChange}/>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="website_url">Website URL</Label>
                                <Input id="website_url" name="website_url" value={form.website_url}
                                       onChange={handleChange}
                                       placeholder="https://example.com"/>
                            </div>
                        </div>

                        <div className="flex flex-row gap-1 w-full">
                            {/*<Label htmlFor="status">Status</Label>*/}


                            <Select onValueChange={(value) => setForm({...form, status: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(status).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value) => setForm({...form, priority: value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Priority"/>
                                </SelectTrigger>

                                <SelectContent>
                                    {Object.entries(priority).map(([key, value]) => (
                                        <SelectItem key={key} value={value}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>


                        </div>

                        <div className="flex flex-row gap-1 w-full mt-5">
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="title">Ticket Title</Label>
                                <Input id="title" name="title" value={form.title} onChange={handleChange}/>
                            </div>
                        </div>

                        <div className="flex flex-row gap-1">
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" value={form.description}
                                          onChange={handleChange} />
                            </div>
                        </div>

                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Creating...' : 'Create'}
                        </Button>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </>
    )
}