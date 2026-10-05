import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter=Inter({variable:'--font-inter',subsets:['latin']});
const compatibilityScript = `
  if (typeof Object.hasOwn !== 'function') {
    Object.hasOwn = function (object, property) {
      return Object.prototype.hasOwnProperty.call(Object(object), property);
    };
  }
`;
export const metadata:Metadata={title:'Iris Yu — Portfolio',description:'Iris Yu’s portfolio of product design, multimedia experiences, and content strategy.',icons:{icon:'/merlin-favicon.png',apple:'/merlin-favicon.png'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><head><script dangerouslySetInnerHTML={{__html:compatibilityScript}} /></head><body className={`${inter.variable} ${inter.className}`}>{children}</body></html>}
