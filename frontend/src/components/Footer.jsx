import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

const Footer = () => (
  <footer className="w-full mt-8 flex justify-center">
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/30 dark:bg-base-200/40 backdrop-blur-md border border-white/30 dark:border-base-300/40 shadow-lg px-8 py-4 mb-4 max-w-lg w-full">
      <div className="flex gap-4 mb-1">
        <a href="https://adarsh.cyou" target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform" title="Website">
          <FaGlobe size={24} />
        </a>
        <a href="https://github.com/proffgarryoak" target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform" title="GitHub">
          <FaGithub size={24} />
        </a>
        <a href="https://linkedin.com/in/adarshpandey1133" target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform" title="LinkedIn">
          <FaLinkedin size={24} />
        </a>
        <a href="https://twitter.com/proffgarryoak" target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-transform" title="Twitter">
          <FaTwitter size={24} />
        </a>
      </div>
      <div className="text-xs text-base-content/70 text-center">
        © {new Date().getFullYear()} <a href="https://adarsh.cyou" className="underline hover:text-primary">adarsh.cyou</a> &mdash; All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 