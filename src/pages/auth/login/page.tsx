"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/router"
import Image from "next/image"
import Logo from '../../../../public/logo.png'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })


  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Login Berhasil!"
    })
    router.push('/dashboard')

  }

  return (
    <>
    <div className="flex items-center justify-center h-screen p-64 bg-[#b6252a]">
        <div className="border p-9 rounded-lg w-full shadow-lg bg-white">
          <div className="flex items-center justify-center gap-5">
            <Image src={Logo} alt="Logo" width={120} height={120} className="bg-red-500 p-2 rounded-lg"/>
            <h1 className="text-4xl font-bold">Web Monitoring Jaringan</h1>
          </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField control={form.control} name="username"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Username</FormLabel>
                          <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormDescription>
                              Masukan username admin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField control={form.control} name="password"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Password</FormLabel>
                          <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormDescription>
                              Masukan password admin
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>

    </div>
    </>
  )
}
