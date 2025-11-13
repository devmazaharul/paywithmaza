'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Key, PlusCircle, Copy, Trash2, Loader2 } from 'lucide-react';
import { http_instance } from '@/http/axios';
import { toast } from 'sonner';
import Link from 'next/link';

// Data type for API Key
interface ApiKey {
    _id: string;
    marcentName: string;
    key: string;
    webhookURL: string;
    successURL: string;
    faildURL: string;
    createdAt: string;
}

// Zod validation schema for the form
const newKeySchema = z.object({
    marcentname: z.string().min(3, 'Merchant name is required'),
    webhookurl: z.string().url('A valid URL is required'),
    successurl: z.string().url('A valid URL is required'),
    faildurl: z.string().url('A valid URL is required'),
});

type NewKeyFormData = z.infer<typeof newKeySchema>;

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NewKeyFormData>({
        resolver: zodResolver(newKeySchema),
    });

    const fetchApiKeys = async () => {
        setLoading(true);
        try {
            const res = await http_instance.get('/apikeys/me');
            if (res.status !== 200) throw Error('Invalid oparation');
            setApiKeys(res.data.item);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const onGenerateKey = async (data: NewKeyFormData) => {
        console.log(data)
        setIsSubmitting(true);
        try {
            const response = await http_instance.post('/generateapikey', { ...data });
            if (response.status !== 200) throw new Error('api key generate faild');
            setApiKeys((state) => [...state, { ...response.data.item }]);
            toast.success('New API Key created successfully!');
            reset();
        } catch {
            toast.error('Failed to create API Key');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const handleDelete = async (id: string) => {
        try {
            const dltDb = await http_instance.delete('/apikeys/' + id);
            if (dltDb.status !== 200) throw new Error('Api key delete error');
            setApiKeys((prevKeys) => prevKeys.filter((key) => key._id !== id));
            toast.success('Key has been deleted!');
        } catch {
            toast.error('Invalid operation');
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen p-6 md:p-10 text-gray-100 font-sans">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">
                    API Key Management
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form for new key */}
                    <div className="lg:col-span-1">
                        <Card className="bg-gray-800 rounded-xl shadow-2xl shadow-gray-950/40 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                                    <PlusCircle size={24} className="text-pink-500" />
                                    Generate New Key
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Create a new API key for your application or merchant{' '}
                                    <Link className="text-blue-400" href={'/main/documentation'}>
                                        documentation
                                    </Link>
                                    .
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(onGenerateKey)} className="space-y-4">
                                    <div>
                                        <Label htmlFor="merchant_name" className="text-gray-300">
                                            Marcentname Name
                                        </Label>
                                        <Input
                                            id="merchant_name"
                                            placeholder="e.g., My Ecommerce Site"
                                            {...register('marcentname')}
                                            className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 p-3 mt-1 "
                                        />
                                        {errors.marcentname && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.marcentname.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="website_url" className="text-gray-300">
                                            Webhook URL
                                        </Label>
                                        <Input
                                            id="website_url"
                                            type="url"
                                            placeholder="https://example.com"
                                            {...register('webhookurl')}
                                            className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 p-3 mt-1 "
                                        />
                                        {errors.webhookurl && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.webhookurl.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="callback_url" className="text-gray-300">
                                            Success URL
                                        </Label>
                                        <Input
                                            id="callback_url"
                                            type="url"
                                            placeholder="https://example.com/api/callback"
                                            {...register('successurl')}
                                            className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 p-3 mt-1 "
                                        />
                                        {errors.successurl && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.successurl.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="callback_url" className="text-gray-300">
                                            Faild URL
                                        </Label>
                                        <Input
                                            id="callback_url"
                                            type="url"
                                            placeholder="https://example.com/api/callback"
                                            {...register('faildurl')}
                                            className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 p-3 mt-1 "
                                        />
                                        {errors.faildurl && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.faildurl.message}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            <Key size={20} />
                                        )}
                                        {isSubmitting ? 'Generating...' : 'Generate Key'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* List of API keys */}
                    <div className="lg:col-span-2">
                        <Card className="bg-gray-800 rounded-xl shadow-2xl shadow-gray-950/40 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                                    <Key size={24} className="text-pink-500" />
                                    API Keys List
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    View and manage your generated API keys.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="flex justify-center items-center h-40">
                                        <Loader2 size={32} className="animate-spin text-gray-500" />
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-gray-900 border-gray-700">
                                                    <TableHead className="w-[120px] text-gray-300">
                                                        Marcentname
                                                    </TableHead>
                                                    <TableHead className="text-gray-300">
                                                        API Key
                                                    </TableHead>
                                                    <TableHead className="text-gray-300">
                                                        Webhook url
                                                    </TableHead>

                                                    <TableHead className="text-right text-gray-300">
                                                        Actions
                                                    </TableHead>
                                                    <TableHead className="text-right text-gray-300">
                                                        Detais
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {apiKeys &&
                                                    [...apiKeys].reverse().map((key) => (
                                                        <TableRow
                                                            key={key._id}
                                                            className="border-gray-700 hover:bg-gray-700"
                                                        >
                                                            <TableCell className="font-medium text-gray-100">
                                                                {key.marcentName}
                                                            </TableCell>
                                                            <TableCell className="flex items-center gap-2">
                                                                <span className="font-mono text-sm bg-gray-900 text-gray-300 px-2 py-1 rounded-md">
                                                                    {key.key.substring(0, 8)}...
                                                                </span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleCopy(key.key)
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    <Copy
                                                                        size={16}
                                                                        className="text-gray-400 hover:text-white"
                                                                    />
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell className="font-medium text-gray-100">
                                                                {key.webhookURL}
                                                            </TableCell>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="sm"
                                                                        className="cursor-pointer"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </Button>
                                                                </AlertDialogTrigger>

                                                                <AlertDialogContent className="bg-gray-900 border-gray-700 text-gray-100">
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle className="text-xl font-semibold text-red-500">
                                                                            Delete API Key
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription
                                                                            asChild
                                                                        >
                                                                            <div className="mt-2 text-sm text-gray-300">
                                                                                Are you sure you
                                                                                want to delete this
                                                                                API key?
                                                                                <br />
                                                                                This action{' '}
                                                                                <strong>
                                                                                    cannot be undone
                                                                                </strong>
                                                                                .
                                                                            </div>
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel className="bg-gray-800 cursor-pointer border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white">
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    key._id,
                                                                                )
                                                                            }
                                                                            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white"
                                                                        >
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <TableCell className="text-right">
                                                                        <Button
                                                                            variant="secondary"
                                                                            className="cursor-pointer"
                                                                            size="sm"
                                                                        >
                                                                            Details
                                                                        </Button>
                                                                    </TableCell>
                                                                </AlertDialogTrigger>

                                                                <AlertDialogContent className="bg-gray-900 border-gray-700 text-gray-100">
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle className="text-xl font-semibold text-pink-500">
                                                                            API Key Details
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription
                                                                            asChild
                                                                        >
                                                                            <div className="space-y-3 mt-4 text-sm text-gray-300">
                                                                                <p>
                                                                                    <strong className="text-gray-400">
                                                                                        Merchant
                                                                                        Name:
                                                                                    </strong>{' '}
                                                                                    {
                                                                                        key.marcentName
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    <strong className="text-gray-400">
                                                                                        API Key:
                                                                                    </strong>{' '}
                                                                                    <span className="font-mono bg-gray-800 px-2 py-1 rounded">
                                                                                        {key.key}
                                                                                    </span>
                                                                                </p>
                                                                                <p>
                                                                                    <strong className="text-gray-400">
                                                                                        Webhook URL:
                                                                                    </strong>{' '}
                                                                                    {key.webhookURL}
                                                                                </p>
                                                                                <p>
                                                                                    <strong className="text-gray-400">
                                                                                        Success URL:
                                                                                    </strong>{' '}
                                                                                    {key.successURL}
                                                                                </p>
                                                                                <p>
                                                                                    <strong className="text-gray-400">
                                                                                        Failed URL:
                                                                                    </strong>{' '}
                                                                                    {key.faildURL}
                                                                                </p>
                                                                                <p>
                                                                                    <strong className="text-gray-400">
                                                                                        Created At:
                                                                                    </strong>{' '}
                                                                                    {new Date(
                                                                                        key.createdAt,
                                                                                    ).toLocaleString()}
                                                                                </p>
                                                                            </div>
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700">
                                                                            Close
                                                                        </AlertDialogCancel>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
