import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import "@/app/_styles/globals.css";

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-primary-100 bg-primary-950 min-h-screen">
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>Copyright &copy; The Wild Oasis</footer>
      </body>
    </html>
  );
}
