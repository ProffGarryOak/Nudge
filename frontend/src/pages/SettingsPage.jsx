import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const THEME_PALETTES = {
  nuzzle: {
    primary: "#9178cc",
    secondary: "#825cdb",
    accent: "#D4BEE4",
    neutral: "#fff",
  },
};

const SettingsPage = () => {
  const { theme, setTheme, font } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 pt-20 max-w-5xl flex-1 flex flex-col">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 w-fit px-5 py-2 rounded-full bg-primary text-neutral font-semibold shadow-lg hover:scale-105 transition-all"
        >
          ← Back
        </button>
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">Choose a theme for your chat interface. Each theme has its own font style!</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-8">
            {THEMES.map((t) => (
              <button
                key={t.name}
                className={`
                  group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                  ${theme === t.name ? "bg-base-200" : "hover:bg-base-200/50"}
                `}
                onClick={() => setTheme(t.name)}
                style={{ fontFamily: t.font }}
              >
                {/* Custom palette for nuzzle, fallback to data-theme for others */}
                {t.name === "nuzzle" ? (
                  <div className="relative h-8 w-full rounded-md overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded" style={{ background: THEME_PALETTES.nuzzle.primary }}></div>
                      <div className="rounded" style={{ background: THEME_PALETTES.nuzzle.secondary }}></div>
                      <div className="rounded" style={{ background: THEME_PALETTES.nuzzle.accent }}></div>
                      <div className="rounded" style={{ background: THEME_PALETTES.nuzzle.neutral, border: '1px solid #ccc' }}></div>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t.name}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                )}
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                </span>
                <span className="text-[10px] text-base-content/60 w-full text-center truncate" style={{ fontFamily: t.font }}>
                  {t.font.split(",")[0].replace(/'/g, "")}
                </span>
              </button>
            ))}
          </div>

          {/* Preview Section - moved below color area */}
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg" style={{ fontFamily: font }}>
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-xl p-3 shadow-sm
                            ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-1.5
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0 rounded-full">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};
export default SettingsPage;
