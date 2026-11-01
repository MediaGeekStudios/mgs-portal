'use client'

import {useState} from 'react';
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

export default function AddClientButton() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({name: '', email: '', website_url: '', type: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        console.log('handleSubmit fired', form);
        setLoading(true);

        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to create customer');

            setOpen(false);
            setForm({name: '', email: '', website_url: '', type: ''});
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>+ Add New</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90svh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                        <DialogDescription>Use the following form to create a new client record</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-2 w-full">

                        <div className="flex flex-col gap-3 w-full sm:flex-row sm:gap-8">
                            <div className="flex flex-col gap-2 w-full sm:gap-6 sm:py-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input id="name" name="name" value={form.name} onChange={handleChange}
                                       placeholder="John Doe" className="w-full" />
                            </div>


                            <div className="flex flex-col gap-2 w-full sm:gap-6 sm:py-2">
                                <Label htmlFor="type">Type</Label>
                                <Input id="type" name="type" value={form.type} onChange={handleChange}
                                       placeholder="Store" className="w-full" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full sm:flex-row sm:gap-8">
                            <div className="flex flex-col gap-2 w-full sm:gap-6 sm:py-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                                       placeholder="John.doe@example.com" className="w-full" />
                            </div>

                            <div className="flex flex-col gap-2 w-full sm:gap-6 sm:py-2">
                                <Label htmlFor="website_url">Website URL</Label>
                                <Input id="website_url" name="website_url" type="url" value={form.website_url}
                                       onChange={handleChange}
                                       placeholder="https://example.com" className="w-full" />
                            </div>
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