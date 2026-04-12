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
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";

export default function AddClientButton() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({name: '', email: '', website_url: '', type: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                        <DialogDescription>Use the following form to create a new client record</DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-2 w-full">

                        {/*<FieldSet>*/}
                        {/*    <FieldLegend>New Client Information</FieldLegend>*/}
                        {/*    <FieldDescription className="my-2">Use the following form to create a new customer record</FieldDescription>*/}

                        {/*    <div className="flex flex-row gap-4 w-full mt-2">*/}
                        {/*        <div className="flex flex-col">*/}
                        {/*            <FieldLabel htmlFor="name">Client Name</FieldLabel>*/}
                        {/*            <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />*/}
                        {/*        </div>*/}
                        {/*        <div className="flex flex-col">*/}
                        {/*            <FieldLabel htmlFor="email">Client Email</FieldLabel>*/}
                        {/*            <Input id="email" name="email" value={form.email} onChange={handleChange} placeholder="John.doe@example.com" />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div className="flex flex-row gap-8 w-full mt-4">*/}
                        {/*        <div className="flex flex-col">*/}
                        {/*            <FieldLabel htmlFor="type">Business Type</FieldLabel>*/}
                        {/*            <Input id="type" name="type" value={form.type} onChange={handleChange} placeholder="Store" />*/}
                        {/*        </div>*/}
                        {/*        <div className="flex flex-col">*/}
                        {/*            <FieldLabel htmlFor="website_url">Website</FieldLabel>*/}
                        {/*            <Input id="website_url" name="website_url" value={form.website_url} onChange={handleChange} placeholder="https://example.com" />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*</FieldSet>*/}


                        <div className="flex flex-row gap-8 w-full">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px', paddingBottom: '8px', width: '100%' }}>
                                <Label htmlFor="name">Name *</Label>
                                <Input id="name" name="name" value={form.name} onChange={handleChange}
                                       placeholder="John Doe" className="w-full" />
                            </div>


                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px', paddingBottom: '8px', width: '100%' }}>
                                <Label htmlFor="type">Type</Label>
                                <Input id="type" name="type" value={form.type} onChange={handleChange}
                                       placeholder="Store" className="w-full" />
                            </div>
                        </div>

                        <div className="flex flex-row gap-8 w-full">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px', paddingBottom: '8px', width: '100%' }}>
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" name="email" value={form.email} onChange={handleChange}
                                       placeholder="John.doe@example.com" className="w-full" />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px', paddingBottom: '8px', width: '100%' }}>
                                <Label htmlFor="website_url">Website URL</Label>
                                <Input id="website_url" name="website_url" value={form.website_url}
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