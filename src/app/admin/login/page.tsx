'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ShieldCheck, Lock, User, Eye, EyeOff, KeyRound, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();

  usePageTitle(
    'تسجيل دخول الإدارة | أ.د. باسم زكي',
    'Admin Login | Prof. Dr. Basim Zaki'
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if already authenticated on mount
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.authenticated) {
          router.replace('/admin/dashboard');
        }
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError(lang === 'en' ? 'Please enter username and password' : 'يرجى كتابة اسم المستخدم وكلمة المرور');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        router.push('/admin/dashboard');
      } else {
        setError(resData.error || (lang === 'en' ? 'Invalid username or password' : 'اسم المستخدم أو كلمة المرور غير صحيحة'));
      }
    } catch (err) {
      setError(lang === 'en' ? 'Failed to connect to server, please try again later' : 'تعذر الاتصال بالسيرفر، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Language Switcher Top Corner */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Top Doctor Avatar & Header */}
        <div className="text-center space-y-3">
          <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-brand-400 p-0.5 gold-border-glow shadow-2xl">
            <div className="w-full h-full relative rounded-full overflow-hidden bg-slate-900">
              <Image
                src="/Photos/1.jpeg"
                alt={lang === 'en' ? 'Prof. Dr. Basim Zaki' : 'أ.د. باسم زكي'}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Admin Dashboard Login' : 'تسجيل الدخول للوحة التحكم'}
            </h1>
            <p className="text-xs text-brand-300 font-semibold">
              {lang === 'en' ? 'Prof. Dr. Basim Mohamed Zaki Clinic' : 'عيادة الأستاذ الدكتور باسم محمد زكي'}
            </p>
          </div>
        </div>

        {/* Login Glass Form Panel */}
        <div className="glass-panel p-8 rounded-3xl border border-brand-500/30 gold-border-glow shadow-2xl space-y-6 bg-navy-900/90">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
              <span>{lang === 'en' ? 'Secure Admin Login Zone' : 'منطقة الدخول الآمن للأدمن'}</span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-300 font-bold border border-brand-500/30">
              {lang === 'en' ? 'Encrypted SSL' : 'تشفير آمن SSL'}
            </span>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-bold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {lang === 'en' ? 'Username' : 'اسم المستخدم (Username)'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={lang === 'en' ? 'Enter username...' : 'أدخل اسم المستخدم...'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500 transition-colors"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                {lang === 'en' ? 'Password' : 'كلمة المرور (Password)'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={lang === 'en' ? 'Enter password...' : 'أدخل كلمة المرور...'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3.5 text-slate-400 hover:text-white"
                  title={showPassword ? (lang === 'en' ? 'Hide Password' : 'إخفاء كلمة المرور') : (lang === 'en' ? 'Show Password' : 'إظهار كلمة المرور')}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-amber-300 hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-xl shadow-brand-500/20 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'en' ? 'Verifying credentials...' : 'جاري التحقق والدخول...'}</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Sign In to Dashboard' : 'تسجيل الدخول للوحة التحكم'}</span>
                </>
              )}
            </button>

          </form>

          {/* Secure access notice footer */}
          <div className="pt-3 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500">
              {lang === 'en' ? 'Fully encrypted area isolated from public access' : 'منطقة مشفرة بالكامل ومعزولة عن الوصول العام'}
            </p>
          </div>

        </div>

        {/* Back to main website link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-brand-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to main website' : 'العودة للواجهة الرئيسية للموقع'}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
