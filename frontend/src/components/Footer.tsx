import { Github, Linkedin, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              Rikelmy Vivas
            </h3>
          </div>

          <div className="text-xs text-slate-500 text-center">
            <p>Construido usando:</p>
            <p className="mt-1">
              React • Tailwind • Cloudflare Workers • Neon DB
            </p>
          </div>

          {/* Sección de Enlaces Sociales */}
          <div className="flex gap-4">
            <a
              href="https://github.com/RikelmyVivas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
              title="Ver código en GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/rikelmy-vivas-967a6315b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
              title="Mi perfil de LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-6 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Rikelmy Vivas. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
