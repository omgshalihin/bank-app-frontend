import Nav from "./authentication/Nav";
import "./globals.css";
import { Roboto } from "next/font/google";
import Providers from "./providers";

export const metadata = {
  title: "Welcome",
  icons: {
    icon: "/thirteen.svg",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 lg:mx-96 ${roboto.variable}`}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
