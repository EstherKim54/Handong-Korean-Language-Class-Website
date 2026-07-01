import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { PenSquare, Lock, X, Image as ImageIcon, FileText } from 'lucide-react';

interface Post {
  id: string;
  type: 'notice' | 'gallery';
  title: string;
  content: string;
  date: string;
  author: string;
}

export default function CommunitySection() {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'notice' | 'gallery'>('notice');
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Write modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  // New post state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Load posts from localStorage (Temporary until Firebase is connected)
  useEffect(() => {
    const saved = localStorage.getItem('hgu_community_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse posts', e);
      }
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '412412!!') {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
      setShowWriteModal(true);
    } else {
      setPasswordError(true);
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      type: activeSubTab,
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString(),
      author: 'Admin'
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('hgu_community_posts', JSON.stringify(updatedPosts));
    
    setNewTitle('');
    setNewContent('');
    setShowWriteModal(false);
  };

  const currentPosts = posts.filter(p => p.type === activeSubTab);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {t.community.title}
        </h2>
        <p className="text-lg text-gray-600">
          {t.community.subtitle}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 p-4 gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveSubTab('notice')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeSubTab === 'notice' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.community.tabNotice}</span>
            </button>
            <button
              onClick={() => setActiveSubTab('gallery')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeSubTab === 'gallery' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.community.tabGallery}</span>
            </button>
          </div>
          
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            <PenSquare className="w-4 h-4" />
            <span>{t.community.adminWriteButton}</span>
          </button>
        </div>

        <div className="p-6 min-h-[400px]">
          {currentPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <FileText className="w-12 h-12 mb-4 opacity-20" />
              <p>{t.community.noPosts}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentPosts.map((post) => (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  key={post.id} 
                  className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-gray-50/50"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <div className="text-sm text-gray-500 mb-4 flex items-center space-x-4">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
            >
              <button 
                onClick={() => { setShowPasswordModal(false); setPasswordError(false); setPassword(''); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.community.adminWriteButton}</h3>
                <p className="text-sm text-gray-500 mt-1">{t.community.passwordPrompt}</p>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.community.passwordPlaceholder}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mb-2"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mb-4">{t.community.passwordIncorrect}</p>
                )}
                <div className="flex space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => { setShowPasswordModal(false); setPasswordError(false); setPassword(''); }}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t.community.passwordCancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t.community.passwordSubmit}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Write Post Modal */}
      <AnimatePresence>
        {showWriteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowWriteModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <PenSquare className="w-5 h-5 text-blue-600" />
                <span>{t.community.newPostTitle} ({activeSubTab === 'notice' ? t.community.tabNotice : t.community.tabGallery})</span>
              </h3>

              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={t.community.postTitlePlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder={t.community.postContentPlaceholder}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowWriteModal(false)}
                    className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    {t.community.postCancel}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {t.community.postSubmit}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
