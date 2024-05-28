import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import DataTable from '../../components/Tabel';
import Image from 'next/image';
import PingMonitoring from '../../../public/pingMonitoring.png'
import BandwithMonitoring from '../../../public/bandwithMonitoring.png'
import JitterMonitoring from '../../../public/jitterMonitoring.png'


async function getDataRouter(): Promise<DataRouter[]> {
    const res = await fetch(
        'https://662d2f180547cdcde9e029ab.mockapi.io/monitoring'
    );
    const data = await res.json();
    return data;
}

type DataRouter = {
    id: string
    mac: string
    ssid: string
    password: string
  }

export default function Monitoring() {
    const [data, setData] = useState<DataRouter[]>([]);
      
    const columns: ColumnDef<DataRouter>[] = [
        {
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "kecepatanUpload",
          header: "Kecepatan Upload",
        },
        {
          accessorKey: "ping",
          header: "Ping",
        },
        {
          accessorKey: "jitter",
          header: "Jitter",
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
          accessorKey: "waktu",
          header: "Waktu",
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
        <div className='space-y-11'>
            <div className=''>
                <h1 className='mb-6 text-5xl font-bold'>Hasil Monitoring Jaringan</h1>
                <DataTable columns={columns} data={data} />
            </div>
            <div className='bg-white rounded-xl p-5 shadow-lg'>

              <div className='flex items-start '>
                <div className='border-r'>
                  <h1 className='mb-6 text-5xl font-bold border-b pb-2 text-center'>Hasil Ping</h1>

                  <Image className='w-[90%] h-[90%]' src={PingMonitoring} alt='Ping Monitoring' />
                </div>
                <div>
                <h1 className='mb-6 text-5xl font-bold pb-2 border-b text-center'>Hasil Jitter</h1>

                <Image className='w-[90%] h-[90%]' src={JitterMonitoring} alt='Jitter Monitoring' />
                </div>
              </div>
              <div className='mt-10'>
                <h1 className='mb-6 text-5xl font-bold border-b pb-2 text-center'>Hasil Bandwith</h1>
                <Image src={BandwithMonitoring} alt='Bandwith Monitoring' />
              </div>
            </div>
        </div>
    );
}
