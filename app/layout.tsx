import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import "./globals.css";
import InitAuth from "./initalAuth";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <InitAuth/>
          {children}
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}