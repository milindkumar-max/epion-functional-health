import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { Menu, X, LogIn, LogOut, User as UserIcon, Calendar, Utensils } from 'lucide-react';
import { auth, signInWithGoogle, logOut, onAuthStateChanged, User } from '../lib/firebase';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
  onOpenPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsAuthLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        onOpenPortal();
      }
    } catch (err: any) {
      console.error('Firebase Auth sign-in failed:', err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err: any) {
      console.error('Firebase sign-out error:', err);
    }
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Milind', page: 'practitioner' },
    { label: 'Areas of Focus', page: 'health-areas' },
    { label: 'Science & Resources', page: 'science' },
    { label: 'Consultations & Pricing', page: 'pricing' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#0C1811]/95 backdrop-blur-md border-b border-[#E8E2D8] dark:border-[#1E3326] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        
        {/* Brand Wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left font-serif text-2xl lg:text-[26px] font-normal tracking-tight text-[#163324] dark:text-[#FAF8F5] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-none cursor-pointer"
        >
          Epion Functional Health
        </button>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#4E5B54] dark:text-[#C5D7CC]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#163324] dark:text-[#FAF8F5] font-semibold'
                    : 'hover:text-[#163324] dark:hover:text-[#FAF8F5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2A4E38] dark:bg-[#86C19D] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions: Patient Portal & Primary CTA (Clean, Rebalanced, No Theme Switcher) */}
        <div className="hidden lg:flex items-center gap-4">
          {/* User Authentication & Patient Portal State */}
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#163324] dark:text-[#FAF8F5] bg-[#EAEFE9] dark:bg-[#163324] hover:bg-[#DCE4DD] dark:hover:bg-[#1E432E] border border-[#163324]/20 rounded-xs transition-colors cursor-pointer shadow-2xs"
                title="View your appointments, meal plan, and recommendations"
              >
                <Calendar className="w-3.5 h-3.5 text-[#163324] dark:text-[#78A88E]" />
                <span>My Appointments & Care</span>
              </button>

              <div className="flex items-center gap-2 border-l border-[#E8E2D8] dark:border-[#1E3326] pl-3">
                <span className="text-xs text-[#5F7065] dark:text-[#9FB7A8] truncate max-w-[120px] font-mono">
                  {currentUser.displayName || currentUser.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-[#5F7065] hover:text-red-700 transition-colors cursor-pointer"
                  title="Sign out of patient portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isAuthLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4E5B54] dark:text-[#C5D7CC] hover:text-[#163324] dark:hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Patient Login</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center h-11 px-6 text-xs uppercase tracking-[0.12em] font-semibold text-[#FAF8F5] bg-[#163324] hover:bg-[#204532] active:scale-[0.99] transition-all shadow-xs cursor-pointer whitespace-nowrap rounded-xs"
          >
            Book Consultation
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {currentUser ? (
            <button
              onClick={onOpenPortal}
              className="p-2 text-xs font-medium text-[#163324] dark:text-[#FAF8F5] bg-[#EAEFE9] dark:bg-[#163324] rounded-xs flex items-center gap-1"
              title="My Appointments"
            >
              <Calendar className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="text-xs font-medium text-[#163324] dark:text-[#FAF8F5] p-2"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#163324] dark:text-[#FAF8F5] hover:bg-[#F2EFE9] dark:hover:bg-[#162B1E] rounded-xs cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D8] dark:border-[#1E3326] bg-[#FAF8F5] dark:bg-[#0C1811] px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm py-2 font-medium ${
                  currentPage === link.page
                    ? 'text-[#163324] dark:text-[#FAF8F5] font-semibold'
                    : 'text-[#4E5B54] dark:text-[#C5D7CC]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8E2D8] dark:border-[#1E3326] space-y-2.5">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full py-3 px-3 text-xs font-semibold text-[#163324] dark:text-[#FAF8F5] bg-[#EAEFE9] dark:bg-[#163324] flex items-center justify-center gap-2 rounded-xs border border-[#163324]/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Appointments & Care Plan</span>
                </button>

                <div className="flex items-center justify-between text-xs py-1 text-[#5F7065] dark:text-[#9FB7A8]">
                  <span className="truncate max-w-[200px]">{currentUser.email}</span>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-700 underline text-[11px]"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignIn();
                }}
                className="w-full py-2.5 px-3 text-xs font-medium text-[#163324] dark:text-[#FAF8F5] border border-[#E8E2D8] dark:border-[#1E3326] flex items-center justify-center gap-2 rounded-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Patient Login (Google)</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] bg-[#163324] text-center cursor-pointer rounded-xs shadow-xs"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
