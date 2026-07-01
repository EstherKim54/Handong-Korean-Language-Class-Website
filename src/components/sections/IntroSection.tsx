import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { MapPin, Phone, Mail, Compass, Target, Users, Globe2, Instagram, Play } from 'lucide-react';

export default function IntroSection() {
  const { t } = useLanguage();

  const icons = [Compass, Target, Users, Globe2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.intro.title}</h2>
        <p className="text-xl text-blue-600 font-medium">{t.intro.subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>{t.intro.p1}</p>
          <p>{t.intro.p2}</p>
          <p>{t.intro.p3}</p>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t.intro.directionsTitle}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {t.intro.directions.map((direction, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -10, scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-start space-x-4 cursor-pointer"
              >
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-gray-800 font-medium pt-1">{direction}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Instagram Section */}
      <div className="mb-20 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl shadow-xl p-1 pb-8 md:p-1 md:pb-12 overflow-hidden relative">
        <div className="bg-white rounded-xl m-1 p-8 md:p-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 transform -rotate-6">
            <Instagram className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">{t.intro.instagramTitle}</h3>
          <p className="text-gray-600 font-medium mb-10 text-center">{t.intro.instagramSubtitle}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {/* Mock Reel 1 */}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="group relative aspect-[9/16] bg-slate-900 rounded-xl overflow-hidden shadow-md cursor-pointer block">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" alt="Campus Life" className="object-cover w-full h-full opacity-80 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium text-sm line-clamp-2">캠프 첫날! 즐거운 오리엔테이션 현장 🎉</p>
              </div>
            </a>
            
            {/* Mock Reel 2 */}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="group relative aspect-[9/16] bg-slate-900 rounded-xl overflow-hidden shadow-md cursor-pointer block">
              <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop" alt="Campus Life" className="object-cover w-full h-full opacity-80 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium text-sm line-clamp-2">한동대학교의 아름다운 캠퍼스를 소개합니다 🏫</p>
              </div>
            </a>

            {/* Mock Reel 3 */}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="group relative aspect-[9/16] bg-slate-900 rounded-xl overflow-hidden shadow-md cursor-pointer hidden md:block">
              <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop" alt="Campus Life" className="object-cover w-full h-full opacity-80 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium text-sm line-clamp-2">한국어교실 학생들의 리얼 후기! 🗣️</p>
              </div>
            </a>
          </div>
          
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mt-10 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center space-x-2">
            <Instagram className="w-5 h-5" />
            <span>Go to Instagram</span>
          </a>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden text-white">
        <div className="grid md:grid-cols-2">
          <div className="p-10 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 text-blue-300">{t.intro.locationTitle}</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <p className="text-slate-300">{t.intro.address.replace('주소: ', '').replace('Address: ', '')}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-blue-400 shrink-0" />
                <p className="text-slate-300">{t.intro.phone.replace('전화번호 (내선번호): ', '').replace('Phone (Extension): ', '')}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-400 shrink-0" />
                <p className="text-slate-300">{t.intro.email.replace('메일: ', '').replace('Email: ', '')}</p>
              </div>
            </div>
            <div className="mt-10 p-4 bg-white/10 rounded-lg border border-white/10">
              <p className="text-sm text-slate-300 leading-relaxed">{t.intro.contactNote}</p>
            </div>
          </div>
          <div className="h-64 md:h-auto bg-slate-800 relative">
            {/* Placeholder for map, using a cool abstract pattern for now */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                <MapPin className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
