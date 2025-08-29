import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Image as IconImage,
  Workflow,
  Database,
  Upload,
  Loader2,
  StopCircle,
  Bot,
  Sparkles,
  Mic,
  FileVideo,
  X,
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart as ReLineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

// Local styles
const slideContainer: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f0f4ff 0%, #f8fafc 100%)',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
};

const fullBleedContainer: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'auto',
  padding: '40px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

// ----------------------------------
// Small helpers
// ----------------------------------
const useTypewriter = (fullText: string, speed = 18) => {
  const [text, setText] = useState('');
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  const start = () => {
    if (!fullText) return;
    setText('');
    setRunning(true);
    let i = 0;
    // @ts-ignore
    ref.current = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(ref.current!);
        setRunning(false);
      }
    }, speed);
  };

  const stop = () => {
    if (ref.current) clearInterval(ref.current);
    setRunning(false);
  };

  useEffect(() => () => ref.current && clearInterval(ref.current), []);
  return { text, running, start, stop };
};

// ----------------------------------
// Shared UI
// ----------------------------------
const BeautifulButton = ({ onClick, children, className, icon, disabled = false }: any) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`px-5 py-2.5 rounded-full text-white font-semibold shadow-lg flex items-center gap-2 bg-gradient-to-br ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    whileHover={{ scale: disabled ? 1 : 1.04 }}
    whileTap={{ scale: disabled ? 1 : 0.97 }}
  >
    {icon}
    {children}
  </motion.button>
);

// — Fix: Close button “dancing” -> subtle hover only
const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-6 right-6 z-50 rounded-full p-2 bg-black/35 text-white shadow transition transform hover:scale-[1.06] hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/70"
    aria-label="Close"
  >
    <X size={22} />
  </button>
);

const PanelShell: React.FC<{ title: React.ReactNode; subtitle?: React.ReactNode; onClose: () => void }>
  = ({ title, subtitle, onClose, children }) => (
  <div style={fullBleedContainer} className="backdrop-blur-[1px]">
    <CloseButton onClick={onClose} />
    <div className="w-full h-full flex flex-col p-8 gap-6">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">{title}</h2>
        {subtitle && <p className="text-gray-600 text-center max-w-3xl">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-0 w-full">{children}</div>
    </div>
  </div>
);

// ----------------------------------
// Document Summarization (auto-start after upload)
// ----------------------------------
function DocumentSummarization({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const fullSummary =
    'This document discusses the importance of integrating AI systems into enterprise workflows. It emphasizes scalability, predictive analytics, and automation as key drivers of business transformation. Additionally, it highlights the role of generative AI in enhancing productivity and innovation.';
  const { text, running, start, stop } = useTypewriter(fullSummary, 18);

  const onFile = (f: File | null) => {
    setFile(f);
    if (f) {
      // Auto-start typewriter after upload
      setTimeout(() => start(), 250);
    }
  };

  return (
    <PanelShell onClose={onClose} title={<><FileText className="inline mr-3" />Document Summarization</>}>
      <div className="w-full h-full flex flex-col items-center gap-5">
        <label className="cursor-pointer">
          <div className="px-6 py-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold shadow flex items-center gap-2">
            <Upload size={18} /> {file ? 'Upload Another' : 'Upload Document'}
          </div>
          <input
            type="file"
            accept=".pdf,.txt,.md,.doc,.docx"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] || null)}
          />
        </label>

        {file && (
          <p className="text-xs text-gray-600">Selected: <span className="font-medium">{file.name}</span></p>
        )}

        <div className="h-12 flex items-center gap-3">
          {!running && file && !text && (
            <BeautifulButton onClick={start} icon={<Bot />} className="from-green-500 to-green-600">Summarize</BeautifulButton>
          )}
          {running && (
            <BeautifulButton onClick={stop} icon={<StopCircle />} className="from-red-500 to-red-600">Stop</BeautifulButton>
          )}
          {running && <Loader2 className="animate-spin w-6 h-6 text-blue-500" />}
        </div>

        <AnimatePresence>
          {text && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full max-w-3xl bg-white rounded-xl shadow p-6 overflow-auto border border-black/5"
              style={{ maxHeight: '55vh' }}
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">AI Summary</h3>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PanelShell>
  );
}

// ----------------------------------
// Image Generation (prompt -> 2x3 grid)
// ----------------------------------
function ImageGeneration({ onClose }: { onClose: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [generated, setGenerated] = useState(false);
  const images = [
    { name: 'Midjourney', src: 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg' },
    { name: 'Stable Diffusion', src: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg' },
    { name: 'DALL·E 3', src: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg' },
    { name: 'Imagen', src: 'https://images.pexels.com/photos/1528640/pexels-photo-1528640.jpeg' },
    { name: 'Amazon Nova', src: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg' },
    { name: 'Llama (mock)', src: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg' },
  ];

  const onGenerate = () => {
    if (!prompt.trim()) return;
    setGenerated(true);
  };

  return (
    <PanelShell
      onClose={onClose}
      title={<><IconImage className="inline mr-3" />Image Generation</>}
      subtitle={<span>Enter a prompt, then view a 2×3 grid (250px tiles) with model tags.</span>}
    >
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex items-center justify-center gap-3">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the scene..."
            className="w-full max-w-xl px-4 py-2 rounded-full border border-black/10 shadow focus:outline-none"
          />
          <BeautifulButton onClick={onGenerate} disabled={!prompt.trim()} icon={<Sparkles />} className="from-purple-500 to-pink-500">Generate</BeautifulButton>
        </div>

        {generated && (
          <div className="w-full flex-1 overflow-auto">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full">
              {images.map((img, i) => (
                <figure key={i} className="relative w-full h-[250px] overflow-hidden rounded-lg shadow bg-white">
                  <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white px-3 py-2 text-sm font-semibold">{img.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </PanelShell>
  );
}

// ----------------------------------
// Talk To Your Data (upload -> random charts -> prompt -> typewritten answer)
// ----------------------------------
function TalkToData({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [chartsReady, setChartsReady] = useState(false);
  const [prompt, setPrompt] = useState('');
  const summaryText =
    'Across categories, the bar chart shows an upward bias with one outlier; the line indicates seasonal lift around March; and the pie suggests no single segment dominates. A combined strategy should focus on sustaining peaks while addressing weak cohorts.';
  const { text, running, start, stop } = useTypewriter(summaryText, 16);

  const makeRandom = (n: number, base = 50) => Array.from({ length: n }, (_, i) => ({
    name: String.fromCharCode(65 + i),
    value: Math.max(5, Math.round(base + (Math.random() - 0.5) * base)),
  }));

  const [barData, setBarData] = useState(makeRandom(6, 40));
  const [pieData, setPieData] = useState(makeRandom(5, 20).map((d, i) => ({ name: `Group ${i + 1}`, value: d.value })));
  const [lineData, setLineData] = useState(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => ({ name: m, value: Math.round(20 + Math.random() * 60) }))
  );

  const onUpload = (f: File | null) => {
    setFile(f);
    if (f) {
      // Regenerate random data for fun after each upload
      setBarData(makeRandom(6, 50));
      setPieData(makeRandom(5, 25).map((d, i) => ({ name: `Group ${i + 1}`, value: d.value })));
      setLineData(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => ({ name: m, value: Math.round(20 + Math.random() * 70) })));
      setChartsReady(true);
      // reset any previous explanation
      stop();
    }
  };

  const onExplain = () => {
    if (!prompt.trim()) return;
    start();
  };

  return (
    <PanelShell onClose={onClose} title={<><Database className="inline mr-3" />Talk To Your Data</>}>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex items-center justify-center gap-3">
          <label className="cursor-pointer">
            <div className="px-5 py-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold shadow flex items-center gap-2">
              <Upload size={18} /> {file ? 'Upload Another' : 'Upload CSV / Excel'}
            </div>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={(e) => onUpload(e.target.files?.[0] || null)}
            />
          </label>
          <BeautifulButton onClick={() => setChartsReady(true)} disabled={!file} icon={<Sparkles />} className="from-indigo-500 to-purple-600">Generate Charts</BeautifulButton>
        </div>

        {/* Charts */}
        {chartsReady && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-3 border border-black/5">
              <ResponsiveContainer width="100%" height={240}>
                <RechartsBarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" stroke="#4b5563" />
                  <YAxis stroke="#4b5563" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981">
                    <LabelList dataKey="value" position="top" fill="#111827" />
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-3 border border-black/5">
              <ResponsiveContainer width="100%" height={240}>
                <RePieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label>
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={["#10b981", "#34d399", "#a7f3d0", "#60a5fa", "#fde68a"][idx % 5]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-lg shadow p-3 border border-black/5">
              <ResponsiveContainer width="100%" height={240}>
                <ReLineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" stroke="#4b5563" />
                  <YAxis stroke="#4b5563" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Prompt -> explanation */}
        {chartsReady && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 w-full max-w-3xl">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask about the charts..."
                className="flex-1 px-4 py-2 rounded-full border border-black/10 shadow focus:outline-none"
              />
              <BeautifulButton onClick={onExplain} disabled={!prompt.trim()} icon={<Bot />} className="from-amber-500 to-orange-500">Explain</BeautifulButton>
              {running && <Loader2 className="animate-spin w-5 h-5 text-amber-600" />}
            </div>
            <AnimatePresence>
              {text && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="w-full max-w-3xl bg-white rounded-xl shadow p-5 border border-black/5"
                >
                  <h4 className="text-base font-semibold text-amber-700 mb-1">Analysis</h4>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{text}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PanelShell>
  );
}

// ----------------------------------
// Multimodal (unchanged placeholder)
// ----------------------------------
function Multimodal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'idle' | 'recording' | 'generating'>('idle');
  const [text, setText] = useState('');

  return (
    <PanelShell onClose={onClose} title={<><Workflow className="inline mr-3" />Multimodal Interactions</>} subtitle="Voice → Text/Image and video → text placeholder">
      <div className="w-full h-full flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center items-center gap-3">
          <BeautifulButton onClick={() => setMode(mode === 'recording' ? 'idle' : 'recording')} icon={<Mic size={18} />} className={mode === 'recording' ? 'from-red-500 to-red-600' : 'from-indigo-500 to-purple-600'}>
            {mode === 'recording' ? 'Stop Recording' : 'Voice to Voice'}
          </BeautifulButton>
          <BeautifulButton onClick={() => setMode(mode === 'generating' ? 'idle' : 'generating')} icon={<Sparkles size={18} />} className={mode === 'generating' ? 'from-red-500 to-red-600' : 'from-green-500 to-teal-600'}>
            {mode === 'generating' ? 'Stop' : 'Voice to Text/Image'}
          </BeautifulButton>
          <label>
            <input type="file" className="hidden" accept="video/*" onChange={() => setText('Video processed (placeholder).')} />
            <BeautifulButton icon={<FileVideo size={18} />} onClick={() => {}} className="from-pink-500 to-rose-600">Video to Text</BeautifulButton>
          </label>
        </div>

        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-4 min-h-[120px] overflow-auto" style={{ maxHeight: '55vh' }}>
          <p className="text-sm text-gray-700">{text || 'Output will appear here...'}</p>
        </div>
      </div>
    </PanelShell>
  );
}

// ----------------------------------
// Main Slide
// ----------------------------------
const Slide20 = () => {
  const [active, setActive] = useState<null | 'doc' | 'img' | 'data' | 'multi'>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const features = [
    { 
      key: 'doc', 
      Icon: FileText, 
      title: 'Document Summarization', 
      desc: 'Upload and get instant summaries',
      color: '#4f46e5',
      bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
    },
    { 
      key: 'img', 
      Icon: IconImage, 
      title: 'Image Generation', 
      desc: 'Create visuals from text prompts',
      color: '#7c3aed',
      bgGradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)'
    },
    { 
      key: 'data', 
      Icon: Database, 
      title: 'Data Insights', 
      desc: 'Get answers from your data',
      color: '#059669',
      bgGradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
    },
    { 
      key: 'multi', 
      Icon: Workflow, 
      title: 'Multimodal AI', 
      desc: 'Combine text, voice, and images',
      color: '#d97706',
      bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
    }
  ];

  return (
    <div style={slideContainer}>
      <div style={fullBleedContainer}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            maxWidth: '800px'
          }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#1e293b',
            marginBottom: '16px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            AI-Powered Features
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {features.map(({ key, Icon, title, desc, color, bgGradient }) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: hovered === key ? 1.03 : 1,
                boxShadow: hovered === key 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              onHoverStart={() => setHovered(key)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setActive(key as any)}
              style={{
                background: 'white',
                padding: '28px 24px',
                borderRadius: '16px',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid rgba(226, 232, 240, 0.7)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: bgGradient,
                opacity: hovered === key ? 1 : 0.8,
                transition: 'opacity 0.3s ease'
              }} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  background: bgGradient,
                  color: color,
                  transition: 'all 0.3s ease',
                  transform: hovered === key ? 'rotate(5deg) scale(1.1)' : 'none'
                }}>
                  <Icon size={28} />
                </div>
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: '#1e293b',
                  lineHeight: 1.3
                }}>
                  {title}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#64748b',
                  lineHeight: 1.6,
                  fontSize: '1rem',
                  marginBottom: '20px',
                }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '20px'
              }}
              onClick={(e) => e.target === e.currentTarget && setActive(null)}
            >
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  width: '100%',
                  maxWidth: '800px',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  position: 'relative',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActive(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b',
                    transition: 'all 0.2s ease',
                    zIndex: 10
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                >
                  <X size={20} />
                </button>
                {active === 'doc' && <DocumentSummarization onClose={() => setActive(null)} />}
                {active === 'img' && <ImageGeneration onClose={() => setActive(null)} />}
                {active === 'data' && <TalkToData onClose={() => setActive(null)} />}
                {active === 'multi' && <Multimodal onClose={() => setActive(null)} />}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide20;
