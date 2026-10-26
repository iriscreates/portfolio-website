import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const poppins=localFont({src:[{path:'../public/fonts/Poppins-Regular.ttf',weight:'400',style:'normal'},{path:'../public/fonts/Poppins-Medium.ttf',weight:'500',style:'normal'},{path:'../public/fonts/Poppins-SemiBold.ttf',weight:'600',style:'normal'},{path:'../public/fonts/Poppins-Bold.ttf',weight:'700',style:'normal'}],variable:'--font-poppins',display:'swap'});
const compatibilityScript = `
  if (typeof Object.hasOwn !== 'function') {
    Object.hasOwn = function (object, property) {
      return Object.prototype.hasOwnProperty.call(Object(object), property);
    };
  }
`;
export const metadata:Metadata={title:'Iris Yu — Portfolio',description:'Iris Yu’s portfolio of product design, multimedia experiences, and content strategy.',icons:{icon:'/merlin-favicon.png',apple:'/merlin-favicon.png'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><head><script dangerouslySetInnerHTML={{__html:compatibilityScript}} /></head><body className={`${poppins.variable} ${poppins.className}`}>{children}</body></html>}
