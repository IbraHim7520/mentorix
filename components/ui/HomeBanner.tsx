import Image from "next/image";
import homeBannerImage from "../../assets/home-banner-side-image.png"

const HomeBanner = () => {
  return (
    <div className="relative w-full min-h-[calc(100vh-120px)] flex items-center overflow-hiddenbg-linear-to-br from-sky-50 via-blue-50 to-pink-50dark:from-zinc-950 dark:via-slate-900 dark:to-zinc-900">
      {/* Soft Light Blue & Pink Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Soft Pink Blob */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[60%] rounded-full bg-pink-100/40 dark:bg-pink-900/10 blur-[120px]" />
        {/* Light Blue Blob */}
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[70%] rounded-full bg-sky-100/50 dark:bg-sky-900/20 blur-[120px]" />
        {/* Subtle Bottom Purple/Pink accent */}
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-purple-50/50 dark:bg-purple-900/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 py-12">

        {/* Left Side: Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left z-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15]">
              A good education is always the start of <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-pink-500">lifelong achievement.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Start your journey toward knowledge, growth, and endless opportunities.
              We are here to help you learn, achieve, and shape the future you deserve.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-600/20 transition-all active:scale-[0.98]">
              Register as student
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md dark:bg-zinc-800 border-2 border-slate-100 dark:border-zinc-700 text-slate-700 dark:text-white font-bold rounded-2xl hover:bg-white transition-all active:scale-[0.98]">
              Join as a teacher
            </button>
          </div>

          {/* Trust Badge / Stats */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-400">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-linear-to-tr from-sky-100 to-pink-100 dark:from-zinc-800 dark:to-zinc-700" />
              ))}
            </div>
            <p className="dark:text-zinc-500">Joined by <span className="text-slate-700 dark:text-zinc-300 font-bold">10k+</span> learners</p>
          </div>
        </div>

        {/* Right Side: Image Container */}
        <div className="flex-1 w-full h-88 md:h-125 lg:h-150 relative z-10">
          {/* Main Image Glow Wrapper */}
          <div className="w-full h-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm rounded-[2.5rem] border border-white/50 dark:border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl shadow-sky-200/20 dark:shadow-none relative group">

            <div className="w-full h-full p-4">
              <Image
                src={homeBannerImage}
                priority
                quality={100}
                fill
                className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                alt="home_banner_image"
              />
            </div>

            {/* Accent Floating Shapes to tie in the Pink/Blue */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-pink-200/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-sky-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeBanner;