import {
  CategoriesSection,
  FooterSection,
} from "@/app/(dynamicPage)/home3/type";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface FooterProps {
  data: FooterSection;
  primaryColor: string;
  logo: string;
  categories: CategoriesSection | null;
}

const Footer = ({ data, primaryColor, logo, categories }: FooterProps) => {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 p-6 flex flex-wrap justify-between items-start border-t border-neutral-300 dark:border-neutral-700 transition-all">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 mb-6 md:mb-0 space-y-6"
      >
        <div>
          <Image
            src={logo}
            alt={data.title}
            height={100}
            width={200}
            // className="dark:invert"
          />
          <p className="mt-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {data.title}
          </p>
        </div>

        <div className="mt-2 space-y-4 text-neutral-600 dark:text-neutral-400">
          <h4 className="font-semibold text-lg text-neutral-700 dark:text-neutral-300">
            Contacts
          </h4>
          <p className="flex items-center text-sm">
            <span style={{ color: primaryColor }} className="mr-2">
              <Mail size={15} />
            </span>
            Registration:
            <a
              href={`mailto:${data.contacts.registration_email}`}
              className="ml-1 hover:underline"
            >
              {data.contacts.registration_email}
            </a>
          </p>
          <p className="flex items-center text-sm">
            <span style={{ color: primaryColor }} className="mr-2">
              <MapPin size={15} />
            </span>
            Address: {data.contacts.address}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/4 mb-6 md:mb-0"
      >
        <h3 className="font-semibold text-lg">Leagues</h3>
        <ul className="mt-2 text-sm">
          {categories?.items.map((category, index) => (
            <Link
              key={index}
              href={`/home3/categories/${category.id}`}
              passHref
            >
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="mb-2 flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-all"
              >
                <span
                  className="w-2 h-2 mr-2 rounded-sm"
                  style={{ backgroundColor: primaryColor }}
                ></span>
                {category.name}
              </motion.li>
            </Link>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-1/4"
      >
        <h3 className="font-semibold text-lg">Links</h3>
        <ul className="my-2 text-sm space-y-2">
          {data.links.map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center transition-all cursor-pointer"
            >
              <span
                className="w-2 h-2 mr-2 rounded-sm"
                style={{ backgroundColor: primaryColor }}
              ></span>
              <a
                href={link.url}
                className="mb-2 flex items-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-all"
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </footer>
  );
};

export default Footer;
