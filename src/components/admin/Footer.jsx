import { cn } from "@/lib/utils";

const Footer = ({ themes }) => {
  const Year = () => new Date().getFullYear();

  return (
    // <!-- Footer -->
    <footer
      className="w-full bg-gradient-to-r from-blue-100 via-white to-cyan-100
            dark:from-blue-950 dark:via-gray-900 dark:to-black
            text-gray-800 dark:text-gray-300 py-8 transition-colors duration-700"
    >
      <div className="container mx-auto px-4 text-center">
        {/* <!-- Social Links --> */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            title="Facebook"
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300"
            rel="noreferrer"
          >
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            title="Twitter"
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300"
            rel="noreferrer"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            title="Instagram"
            className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-300"
            rel="noreferrer"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ebinesh-rabin-c19"
            target="_blank"
            title="LinkedIn"
            className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors duration-300"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a
            href="https://github.com/ebinesh12"
            target="_blank"
            title="GitHub"
            className="hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
            rel="noreferrer"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
        </div>

        {/* <!-- Footer Navigation --> */}
        {/* <div className="mb-4">
          <ul className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400">
            {[
              "home",
              "about",
              "skills",
              "projects",
              "achievements",
              "contact",
            ].map((link) => (
              <li key={link}>
                <a
                  href={link}
                  className={cn(
                    "dark:text-white text-gray-800 hover:bg-clip-text hover:text-transparent",
                    themes?.isGradient
                      ? `hover:${themes?.primaryGradient}`
                      : "hover:bg-gradient-to-r from-blue-600 to-cyan-600",
                  )}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* <!-- Copyright --> */}
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; {Year()} <a href="/admin">Ebinesh Rabin.</a>
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
