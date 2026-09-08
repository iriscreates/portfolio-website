import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter=Inter({variable:'--font-inter',subsets:['latin']});
export const metadata:Metadata={title:'OneDeck — Portfolio',description:'Making board games approachable. A product design case study exploring curated, interactive board game tutorials.',icons:{icon:'/merlin-favicon.png',apple:'/merlin-favicon.png'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body className={inter.variable}>{children}</body></html>}
