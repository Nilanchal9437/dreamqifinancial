import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import { Send, MapPin, Smartphone, Clock, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-800 pt-16 pb-8">
      <Container>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="logo" height={50} width={100} />
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Looking for expert advice on the best finance to suit your needs?
              Our wide range of loans means we can find the best solution to
              help you reach your goals. Talk to us about what you need, and
              we’ll take care of the rest.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {[
                {
                  name: "706 Sydney Road, Brunswick, VIC 3056",
                  icon: <MapPin />,
                },
                { name: "0416744773", icon: <Smartphone /> },
                {
                  name: "Monday to Friday:10:00 AM - 6:00 PM (Walk-ins Welcome!)",
                  icon: <Clock />,
                },
                {
                  name: "farooq.akram@dreamqifinancial.com.au Membership",
                  icon: <Mail />,
                },
              ].map((item) => (
                <li key={item.name} className="flex items-center gap-x-2 ">
                  <div className="bg-green-600 p-1 rounded">{item.icon}</div>
                  <a className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              We've got you covered
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sign up to our newsletter and keep up-to-date on the latest
              Australian property finance news.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} DreamQiFinancial. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
