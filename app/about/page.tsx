import Image from 'next/image'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Skirr</span>
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 md:h-auto">
              <Image
                src="/images/skirr.webp"
                alt="Skirr Blog"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 mix-blend-overlay"></div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Story</h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                Welcome to Skirr, my personal corner of the web where I share insights, stories, and reflections on technology, coding, and the digital world. I created Skirr to be a space for exploring my journey as a developer, discussing industry trends, and offering tips and resources for fellow tech enthusiasts. Whether you&apos;re looking to dive into programming or just enjoy the latest in tech culture, I hope Skirr becomes your go-to destination for fresh and thoughtful content.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                 Skirr&apos;s mission is simple: to inspire and inform, helping you navigate the complexities of the modern world with confidence and curiosity.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Connect with Me</h3>
                <div className="flex space-x-6">
                  <a href="mailto:baboumanzi69@gmail.com" 
                     className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
                    <Mail className="h-8 w-8" />
                  </a>
                  <a href="https://github.com/princebabou" 
                     className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
                    <Github className="h-8 w-8" />
                  </a>
                  <a href="https://www.linkedin.com/in/manzi-babou-1b661b294/" 
                     className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
                    <Linkedin className="h-8 w-8" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
              <li>Curiosity-driven content</li>
              <li>Ethical technology practices</li>
              <li>Accessible knowledge for all</li>
              <li>Community-centric approach</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}