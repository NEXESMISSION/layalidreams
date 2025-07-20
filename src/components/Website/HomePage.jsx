import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <div>
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen flex flex-col md:flex-row h-auto">
          <div className="w-full hidden md:flex">
            <img 
              src="https://resources.wonderwraps.com/dac19172-387d-4b4d-bb11-e5c7d9b9779d/img/reading_book.png" 
              alt="Reading Book" 
              className="w-full h-full object-cover"
            />
          </div>
    
          <div className="w-full flex md:hidden">
            <img 
              src="https://resources.wonderwraps.com/dac19172-387d-4b4d-bb11-e5c7d9b9779d/img/responsive_reading_book.png" 
              alt="Reading Book" 
              className="w-full min-h-[290px] md:h-full object-cover"
            />
          </div>
    
          <div className="w-full h-full bg-gradient-to-br from-[#6A5ACD] to-[#FAC2FF] flex flex-col justify-center items-start px-10 py-20 md:pl-12 lg:pl-24 md:pr-8 text-white relative z-10">
            <h2 className="text-[28px] leading-8 md:text-[34px] font-marcellus mb-4">
              Bring your child's <br />imagination to life!
            </h2>
            <p className="text-lg md:text-xl mb-10">
              Make them the hero of their own <br />magical adventure with a personalised storybook!
            </p>
            <div className="relative">
              <Link 
                to="/books"
                className="relative z-30 bg-white text-[#6A5ACD] py-3 px-6 rounded font-semibold hover:bg-gray-100 transition cursor-pointer inline-block"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* New Books Section */}
      <section className="flex flex-col items-center gap-8 max-w-custom mx-auto px-6 py-4 mt-16">
        <div className="flex flex-col items-center text-center">
          <h3 className="uppercase text-xs leading-10 tracking-[3px] font-extrabold font-sans">New Books</h3>
          <h1 className="text-[28px] md:text-[34px] leading-10 font-marcellus">More Stories, More Magic</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[14.7px] gap-y-[30px] md:!gap-[21px]">
          {/* Story Card 1 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/bbda3658-3e23-414d-838e-47348a8858ea/Zp1Egf20Hs9VQD7B9TIbtLyqAZtjyC-metaY292ZXIucG5n-.png" 
                  loading="lazy" 
                  alt="Princess! We've been waiting for you" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Princess! We've been waiting for you
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  The adventure continues in Volume 2...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>

          {/* Story Card 2 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/07d103e3-41f7-42d0-b20d-740564852a37/1PNd48yqLk9c2iAHfYXHw8rhf0bcPW-metaMC5wbmc=-.png" 
                  loading="lazy" 
                  alt="Boy's Smile" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Boy's Smile
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  Some smiles are just sunshine...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>

          {/* Story Card 3 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/fefdaebd-82f4-4772-9126-9645cef73670/KIOE2yxwTbor3fuEquofUewmGlPAPw-metaY292ZXIucG5n-.png" 
                  loading="lazy" 
                  alt="Girl's New Sibling" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Girl's New Sibling
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  Big news! A new little person is joining...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>

          {/* Story Card 4 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/ff0e60b5-1227-4081-b690-f37151d1cbc0/wftNJAHQBHdYyB3iOXnrG0oz6OTeDq-metaY292ZXIucG5n-.png" 
                  loading="lazy" 
                  alt="Peekaboo, Baby Found You" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Peekaboo, Baby Found You
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  Where are my toes? My nose? My tummy?...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second New Books Section */}
      <section className="flex flex-col items-center gap-8 max-w-custom mx-auto px-6 py-4">
        <div className="flex flex-col items-center text-center">
          <h3 className="uppercase text-xs leading-10 tracking-[3px] font-extrabold font-sans">More Stories</h3>
          <h1 className="text-[28px] md:text-[34px] leading-10 font-marcellus">More Stories, More Magic</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[14.7px] gap-y-[30px] md:!gap-[21px]">
          {/* Story Card 5 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/bbda3658-3e23-414d-838e-47348a8858ea/Zp1Egf20Hs9VQD7B9TIbtLyqAZtjyC-metaY292ZXIucG5n-.png" 
                  loading="lazy" 
                  alt="Princess! We've been waiting for you" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Princess! We've been waiting for you
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  The adventure continues in Volume 2...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>

          {/* Story Card 6 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/07d103e3-41f7-42d0-b20d-740564852a37/1PNd48yqLk9c2iAHfYXHw8rhf0bcPW-metaMC5wbmc=-.png" 
                  loading="lazy" 
                  alt="Boy's Smile" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Boy's Smile
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  Some smiles are just sunshine...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>

          {/* Story Card 7 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/fefdaebd-82f4-4772-9126-9645cef73670/KIOE2yxwTbor3fuEquofUewmGlPAPw-metaY292ZXIucG5n-.png" 
                  loading="lazy" 
                  alt="Girl's New Sibling" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Girl's New Sibling
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  Big news! A new little person is joining...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>

          {/* Story Card 8 */}
          <div className="relative flex flex-col w-full items-center md:items-start space-y-4">
            <div className="w-full bg-zinc-100 rounded-tr-md rounded-br-md aspect-square overflow-hidden shadow-xl">
              <Link to="/books" className="block">
                <img 
                  src="https://storage.wonderwraps.com/ff0e60b5-1227-4081-b690-f37151d1cbc0/wftNJAHQBHdYyB3iOXnrG0oz6OTeDq-metaY292ZXIucG5n-.png" 
                  loading="lazy" 
                  alt="Peekaboo, Baby Found You" 
                  className="w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-1 w-full justify-between">
              <div>
                <Link to="/books">
                  <span className="text-base md:text-lg font-marcellus line-clamp-2 md:line-clamp-1 text-center md:text-left">
                    Peekaboo, Baby Found You
                  </span>
                </Link>
                <div className="text-xs line-clamp-2 md:line-clamp-2 text-center md:text-left text-black mt-1">
                  Where are my toes? My nose? My tummy?...
                </div>
              </div>
              <div className="mt-2 w-fit mx-auto md:mx-0">
                <Link 
                  to="/books"
                  className="px-8 h-12 inline-flex items-center justify-center bg-gradient-to-r from-[#6A5ACD] via-[#7A6ADD] to-[#FAC2FF] hover:from-[#5A4ABD] hover:via-[#6A5ACD] hover:to-[#EAB2EF] hover:shadow-lg border border-transparent font-figtree rounded-full text-sm text-white transition-all duration-300 w-full font-bold transform hover:scale-105"
                  style={{
                    backgroundSize: '200% 100%',
                    backgroundPosition: '0% 50%'
                  }}
                >
                  Personalise
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="bg-gradient-to-br from-[#6A5ACD] to-[#FAC2FF] py-16 sm:py-24 mt-16">
        <div className="max-w-custom mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="uppercase text-xs leading-10 tracking-[3px] font-extrabold font-sans text-white/80">Categories</h3>
            <h2 className="text-[28px] md:text-[34px] font-marcellus mb-4 text-white">Explore Our Story Categories</h2>
            <p className="text-white/90 max-w-2xl mx-auto">Discover stories tailored for every child's interests and life experiences</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Boys Card */}
            <Link to="/books" className="group relative rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block">
              <img src="https://i.ibb.co/2YK9dWst/cute-boy-bicycle-images-generative-ai-268099307.webp" alt="Boys Stories" className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-marcellus mb-2">Boys</h3>
                <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">Adventure stories featuring brave heroes and exciting journeys.</p>
                  <div className="inline-flex items-center text-sm font-semibold text-white">
                    Explore
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Girls Card */}
            <Link to="/books" className="group relative rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block">
              <img src="https://i.ibb.co/tTsDVwvh/ai-generated-8585379-1280.jpg" alt="Girls Stories" className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-marcellus mb-2">Girls</h3>
                <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">Magical tales with princesses and empowering stories.</p>
                  <div className="inline-flex items-center text-sm font-semibold text-white">
                    Explore
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Lovers Card */}
            <Link to="/books" className="group relative rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block">
              <img src="https://i.ibb.co/V0MQqc7y/ai-generated-8467728-1280.jpg" alt="Lovers Stories" className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-marcellus mb-2">Lovers</h3>
                <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">Romantic and heartwarming stories about love.</p>
                  <div className="inline-flex items-center text-sm font-semibold text-white">
                    Explore
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Family Card */}
            <Link to="/books" className="group relative rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 block">
              <img src="https://images.pexels.com/photos/1683989/pexels-photo-1683989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Family Stories" className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-marcellus mb-2">Family</h3>
                <div className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white/90 mb-4 text-sm leading-relaxed">Stories that celebrate the bond of family and togetherness.</p>
                  <div className="inline-flex items-center text-sm font-semibold text-white">
                    Explore
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link to="/books" className="inline-flex items-center bg-white text-[#6A5ACD] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Browse All Books
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-custom mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="uppercase text-xs leading-10 tracking-[3px] font-extrabold font-sans text-[#6A5ACD]">About Us</h3>
              <h2 className="text-[28px] md:text-[34px] font-marcellus mb-6">Creating Magical Stories for Every Child</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At layali dreams, we believe every child deserves to be the hero of their own story. Our mission is to create personalized storybooks that spark imagination, build confidence, and create lasting memories for families around the world.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Founded with a passion for storytelling and child development, we combine beautiful illustrations, engaging narratives, and cutting-edge personalization technology to create unique experiences that children will treasure forever.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#6A5ACD] mb-1">50,000+</div>
                  <div className="text-sm text-gray-600">Happy Children</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#6A5ACD] mb-1">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#6A5ACD] mb-1">100+</div>
                  <div className="text-sm text-gray-600">Story Collections</div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative">
              <div className="relative z-10">
                <img src="https://i.ibb.co/B0BzLsp/ai-generated-little-boy-reading-a-book-in-his-bedroom-fairy-tale-concept-a-child-s-imagination-being.jpg" alt="About Us" className="w-full h-auto rounded-lg shadow-xl" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#6A5ACD] to-[#FAC2FF] rounded-lg shadow-lg flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-[#6A5ACD] to-[#FAC2FF] py-16">
        <div className="max-w-custom mx-auto px-6 text-center">
          <h2 className="text-[28px] md:text-[34px] font-marcellus text-white mb-4">Ready to Create Your Child's Story?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Join thousands of parents who have created magical moments with personalized storybooks.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books" className="bg-white text-[#6A5ACD] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition cursor-pointer">
              Browse All Books
            </Link>
            <Link to="/about" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#6A5ACD] transition cursor-pointer">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
} 