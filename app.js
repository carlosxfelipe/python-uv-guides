import { html } from "htm/preact";
import { render } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

const guidesList = [
  { id: "README.md", title: "Introdução" },
  { id: "guia_airflow_uv.md", title: "Apache Airflow" },
  { id: "guia_data_science_uv.md", title: "Ciência de Dados" },
  { id: "guia_django_uv.md", title: "Django" },
  { id: "guia_fastapi_uv.md", title: "FastAPI" },
  { id: "guia_flask_uv.md", title: "Flask" },
  { id: "guia_flet_uv.md", title: "Flet (GUI)" },
  { id: "guia_jupyter_uv.md", title: "Jupyter" },
  { id: "guia_marimo_uv.md", title: "Marimo" },
  { id: "guia_streamlit_uv.md", title: "Streamlit" },
];

const APP_TITLE = "Guias Python com UV";
const APP_SUBTITLE = "Guia Prático de Gerenciamento de Projetos";

function App() {
  const [guides, setGuides] = useState(guidesList);
  const [activeGuide, setActiveGuide] = useState(guidesList[0]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const contentRef = useRef(null);

  // Calcula tempo de leitura dinamicamente para todos os capítulos
  useEffect(() => {
    const updateReadingTimes = async () => {
      const updatedGuides = await Promise.all(
        guidesList.map(async (guide) => {
          try {
            const response = await fetch(`./${guide.id}`);
            const text = await response.text();
            // Estimativa: ~200 palavras por minuto
            const words = text.split(/\s+/).length;
            const minutes = Math.ceil(words / 200);
            return { ...guide, readingTime: `${minutes} min` };
          } catch (_e) {
            return { ...guide, readingTime: "---" };
          }
        }),
      );
      setGuides(updatedGuides);
    };

    updateReadingTimes();
  }, []);

  useEffect(() => {
    loadGuide(activeGuide.id);
  }, [activeGuide]);

  // Aplica o Syntax Highlighting e adiciona botões de copiar
  useEffect(() => {
    if (content && contentRef.current) {
      // Syntax Highlighting
      if (globalThis.hljs) {
        const blocks = contentRef.current.querySelectorAll("pre code");
        blocks.forEach((block) => {
          globalThis.hljs.highlightElement(block);
        });
      }

      // Botões de Copiar
      const preBlocks = contentRef.current.querySelectorAll("pre");
      preBlocks.forEach((pre) => {
        if (pre.parentElement.classList.contains("code-wrapper")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "code-wrapper";
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = '<i data-lucide="copy"></i>';

        button.onclick = () => {
          const code = pre.querySelector("code")?.innerText || pre.innerText;
          navigator.clipboard.writeText(code).then(() => {
            button.innerHTML = '<i data-lucide="check"></i>';
            button.classList.add("copied");

            if (globalThis.lucide) {
              globalThis.lucide.createIcons();
            }

            setTimeout(() => {
              button.innerHTML = '<i data-lucide="copy"></i>';
              button.classList.remove("copied");
              if (globalThis.lucide) {
                globalThis.lucide.createIcons();
              }
            }, 2000);
          });
        };

        wrapper.appendChild(button);

        if (globalThis.lucide) {
          globalThis.lucide.createIcons();
        }
      });
    }
  }, [content]);

  const loadGuide = async (filename) => {
    setLoading(true);
    setError(false);

    // O scroll volta pro topo automaticamente na troca
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }

    try {
      const response = await fetch(`./${filename}`);
      if (!response.ok) {
        throw new Error("Falha ao carregar");
      }
      const markdown = await response.text();
      // O marcada interpreta o texto pra HTML puro
      const htmlContent = marked.parse(markdown);
      setContent(htmlContent);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = guidesList.findIndex((c) => c.id === activeGuide.id);
  const prevGuide = currentIndex > 0 ? guidesList[currentIndex - 1] : null;
  const nextGuide =
    currentIndex < guidesList.length - 1 ? guidesList[currentIndex + 1] : null;

  return html`
    <button class="menu-toggle" onClick=${() => setIsMenuOpen(!isMenuOpen)}>
      ☰
    </button>
    <div class="sidebar ${isMenuOpen ? "open" : ""}">
      <div class="sidebar-header">
        <div class="sidebar-title">${APP_TITLE}</div>
        <div class="sidebar-subtitle">${APP_SUBTITLE}</div>
      </div>

      <ul class="guide-list">
        ${guides.map(
          (guide) => html`
            <li
              key=${guide.id}
              class="guide-item ${activeGuide.id === guide.id ? "active" : ""}"
              onClick=${() => {
                setActiveGuide(guide);
                setIsMenuOpen(false);
              }}
            >
              <div class="guide-info">
                <span class="guide-name">${guide.title}</span>
                ${guide.readingTime &&
                html`<span class="reading-time">${guide.readingTime}</span>`}
              </div>
            </li>
          `,
        )}
      </ul>
    </div>

    <div class="content-area" ref=${contentRef}>
      ${loading
        ? html`<div class="loading">Carregando Conhecimento...</div>`
        : error
          ? html`
              <div class="error-state">
                <h2>Ops! Problema de CORS ou Arquivo Inexistente.</h2>
                <p>
                  Como estamos carregando ".md" via Fetch API local, você
                  precisa servir a pasta raiz usando um mini-servidor para
                  driblar o bloqueio de segurança dos navegadores.
                </p>
                <div style="margin-top:20px; text-align:left;">
                  <p>Abra o terminal e rode:</p>
                  <code>npx serve .</code><br />ou<br /><code
                    >python3 -m http.server</code
                  >
                </div>
              </div>
            `
          : html`
              <div
                class="markdown-body"
                dangerouslySetInnerHTML=${{ __html: content }}
              />
              <div class="navigation-buttons">
                ${prevGuide
                  ? html`<button
                      class="nav-btn prev"
                      onClick=${() => setActiveGuide(prevGuide)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        style="margin-right: 8px;"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      <span class="nav-mobile">Anterior</span>
                      <span class="nav-desktop">${prevGuide.title}</span>
                    </button>`
                  : html`<div></div>`}
                ${nextGuide
                  ? html`<button
                      class="nav-btn next"
                      onClick=${() => setActiveGuide(nextGuide)}
                    >
                      <span class="nav-desktop">${nextGuide.title}</span>
                      <span class="nav-mobile">Próxima</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        style="margin-left: 8px;"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>`
                  : html`<div></div>`}
              </div>
            `}
    </div>
  `;
}

render(html`<${App} />`, document.getElementById("app"));
