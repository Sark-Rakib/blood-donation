import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-red-600 via-red-700 to-red-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="text-6xl">🩸</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Donate Blood, <span className="text-red-200">Save Lives</span>
          </h1>
          <p className="text-lg sm:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join our community of life-savers. Register as a blood donor today
            and help us connect with those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-red-700 font-semibold text-lg hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register as Donor
            </Link>
            <Link
              href="/donors"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/40 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-200"
            >
              Find Donors
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#fef2f2] dark:from-gray-900 to-transparent" />
    </section>
  );
}
