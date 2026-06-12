import Link from "next/link";
import { BiDonateBlood } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl text-red-600">
                <BiDonateBlood />
              </span>
              <span className="text-lg font-bold text-red-600">
                DHUNATMOR YOUTH ASSOCIATION
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Connecting blood donors with those in need. Every donation saves
              lives.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/donors"
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Find Donors
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Register as Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Blood Groups
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>Emergency: A+, A-, B+, B-, AB+, AB-, O+, O-</li>
              <li>Universal Donor: O-</li>
              <li>Universal Recipient: AB+</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} BloodConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
