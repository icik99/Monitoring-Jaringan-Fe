"use client"
import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
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
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from '../../components/Tabel';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

  

async function getDataRouter(): Promise<DataRouter[]> {
    const res = await fetch(
        'https://662d2f180547cdcde9e029ab.mockapi.io/monitoring'
    );
    const data = await res.json();
    return data;
}

const FormSchema = z.object({
    ssid: z.string().min(2, {
      message: "SSID must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    mac: z.string().min(2, {
      message: "MAC must be at least 2 characters.",
    }),
  })


  type DataRouter = {
      id: string;
      mac: string;
      ssid: string;
      password: string;
  };

export default function RouterPage() {
    const [data, setData] = useState<DataRouter[]>([]);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const columns: ColumnDef<DataRouter>[] = [
        {
          accessorKey: "mac",
          header: "MAC ID",
        },
        {
          accessorKey: "ssid",
          header: "SSID",
        },
        {
          accessorKey: "password",
          header: "Password",
        },
        {
          header: "Actions",
          id: "Actions",
          cell: ({ row }) => {
            const data = row.original;
            return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger  asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col items-center justify-start gap-2'>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button className='w-full' variant="ghost">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Dialog>
                        <DialogTrigger>
                            <Button className='w-full' variant="ghost">Edit Router</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className='mb-4'>
                            <DialogTitle className='font-bold'>Edit Router</DialogTitle>
                            </DialogHeader>
                            {/* Form */}
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                                    <FormField control={form.control} name="mac"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Mac ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your mac id" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="ssid"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>SID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your SSID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField control={form.control} name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="submit">
                                            Tambah
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
            );
          },
        },
      ];

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ssid: "",
            password: "",
            mac: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data, 'data')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getDataRouter();
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div>
                <div>
                    <div className='flex items-center justify-between'>
                        <h1 className='mb-6 text-5xl font-bold'>Data Router</h1>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Tambah Router</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader className='mb-4'>
                                <DialogTitle className='font-bold'>Tambah Router</DialogTitle>
                                </DialogHeader>
                                {/* Form */}
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                                        <FormField control={form.control} name="mac"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Mac ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your mac id" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name="ssid"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>SID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your SSID" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="submit">
                                                Tambah
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </>
    );
}
