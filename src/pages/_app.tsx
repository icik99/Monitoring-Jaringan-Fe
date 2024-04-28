import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  )
}
