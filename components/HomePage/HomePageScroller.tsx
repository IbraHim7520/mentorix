import catImage1 from '@/assets/icons8-book-100.png'
import catImage2 from '@/assets/icons8-pdf-100.png'
import catImage3 from '@/assets/icons8-access-100.png'
import catImage4 from '@/assets/icons8-download-100.png'
import Image from 'next/image'

const categories = [
  {
    title: "Lecture Notes",
    icon: catImage1
  },
  {
    title: "PDF Resources",
    icon: catImage2
  },
  {
    title: "Lifetime Access",
    icon: catImage3
  },
  {
    title: "Offline Support",
    icon: catImage4
  }
]

const HomePageScroller = () => {
  return (
    <section className="w-full py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Everything You Need to <span className="text-purple-600">Learn</span> Smarter
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          High-quality resources designed to help you master your subjects faster.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, idx) => (
          <div 
            key={idx}
            className="group relative flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Soft Background Accent on Hover */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            
            <div className="relative z-10">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <Image 
                  src={category.icon} 
                  alt={category.title} 
                  width={60} 
                  height={60} 
                  className="grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                {category.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomePageScroller;