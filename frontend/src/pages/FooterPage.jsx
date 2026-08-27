import React from 'react'

const FooterPage = () => {
  return (
    <div>
        
      {/* ── Footer ── */}
      <footer className="bg-bg-surface-container-low border-t border-[#e2e2e4] py-12 flex flex-col items-center gap-6 px-16">
        <div className="text-[20px] font-bold text-primary">ShopSphere</div>
        <nav className="flex flex-wrap justify-center gap-6">
          {['About Us', 'Support', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[13px] text-on-surface-variant hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
        <p className="text-[13px] text-on-surface-variant">© 2024 ShopSphere Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default FooterPage