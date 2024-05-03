import { useState, useEffect } from 'react';

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DataTable from '../../components/Tabel';
import { Button } from '@/components/ui/button';

 type DataRouter = {
    id: string
    mac: string
    ssid: string
    password: string
  }
  
  
  export default function AksesPoin() {
    const [data, setData] = useState<DataRouter[]>([]);
    const columns: ColumnDef<DataRouter>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "ssid",
        header: "SSID",
    },
    {
        accessorKey: "presentaseKekuranganSinyal",
        header: "Persentase Kekuatan Sinyal",
    },
    {
        id: "Actions",
        cell: ({row}) => {
        const payment = row.original
        return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        )
        }
    
    },
    ]

    async function getDataRouter(): Promise<DataRouter[]> {
        const res = await fetch(
            'https://662d2f180547cdcde9e029ab.mockapi.io/monitoring'
        );
        const data = await res.json();
        return data;
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
        <div className='p-10'>
            <div className=''>
                <h1 className='mb-6 text-5xl font-bold'>Akses Poin</h1>
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}
