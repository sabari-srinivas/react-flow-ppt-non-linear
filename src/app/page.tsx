"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain, Cpu, LineChart as IconLineChart, Sparkles, Bot, Lightbulb, Globe, Network, Boxes,
  FileText, Loader2, StopCircle, Upload, Image as ImageIcon, Video, Code2, MessageSquare,
  Activity, BookOpen, Briefcase, Workflow, Layers, Users, Eye, Pencil, User, Mic, FileVideo,
  Database, Clapperboard
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RePieChart,
  Pie, Cell, LineChart as ReLineChart, Line, LabelList,
} from "recharts";

// -----------------------------
// Local UI Components
// -----------------------------
interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}
const UIButton: React.FC<UIButtonProps> = ({ variant = "solid", className = "", ...props }) => {
  const base =
    variant === "outline"
      ? "border border-gray-500 text-white hover:bg-white/10"
      : "bg-purple-600 hover:bg-purple-700 text-white";
  return (
    <button
      {...props}
      className={`px-3 py-1 rounded-md font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-white/30 ${base} ${className}`}
    />
  );
};

const IconImage = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-4.5-4.5L9 18" />
  </svg>
);


// -----------------------------
// Components for Interactive Slides
// -----------------------------

// --- UPDATED SLIDE COMPONENT FOR VEO3 VIDEO ---
function Veo3VideoSlide() {
  const promptText = "Charming 3D animation, Pixar-style, of a fluffy brown rabbit with big expressive eyes in a sunlit forest clearing under a bright blue sky with soft clouds. The rabbit looks around curiously, then watches as a vibrant blue butterfly flutters into the scene and lands on a twig close to the camera. Cinematic medium shot, shallow depth of field focusing on the rabbit and the butterfly, vibrant colors, peaceful mood.";

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full space-y-6 text-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-teal-400 flex justify-center items-center gap-2">
        <Clapperboard className="text-teal-300 w-10 h-10 animate-pulse" />
        Video Generation by Veo3
      </h2>

      {/* Main container for side-by-side layout */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full max-w-6xl p-4">

        {/* Left Side: Video Player */}
        <motion.div
          className="w-full md:w-1/2 bg-gray-900 p-2 rounded-lg shadow-xl flex items-center justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <video className="w-full rounded" controls autoPlay loop muted>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Right Side: Prompt Box */}
        <motion.div
          className="w-full md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col justify-center text-left"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Prompt:</h3>
          <p className="text-sm text-gray-300 italic leading-relaxed">
            "{promptText}"
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}

function DocumentSummarizationSlide() {
  const [file, setFile] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);
  const [summary, setSummary] = useState("");
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fullSummary = "This document discusses the importance of integrating AI systems into enterprise workflows. It emphasizes scalability, predictive analytics, and automation as key drivers of business transformation. Additionally, it highlights the role of generative AI in enhancing productivity and innovation.";

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSummary("");
    }
  };

  const startSummarization = () => {
    setGenerating(true);
    setSummary("");
    setIndex(0);
    intervalRef.current = setInterval(() => {
      setIndex((prev: number) => {
        if (prev < fullSummary.length) {
          return prev + 1;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setGenerating(false);
          return prev;
        }
      });
    }, 40);
  };


  const stopGeneration = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setGenerating(false);
    setSummary((s: string) => s + " ...stopped");
  };

  useEffect(() => {
    if (generating) {
      setSummary(fullSummary.slice(0, index));
    }
  }, [index, generating]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <motion.div
      className="space-y-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-blue-400 flex justify-center items-center gap-2">
        <FileText className="text-blue-300 w-10 h-10 animate-bounce" /> Document Summarization
      </h2>
      <div className="flex flex-col items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
          <input type="file" onChange={handleUpload} className="hidden" />
        </label>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-400"
          >
            Uploaded: {file.name}
          </motion.div>
        )}
        {!generating && !summary && file && (
          <Button onClick={startSummarization} className="bg-blue-600 hover:bg-blue-700">
            Start Summarization
          </Button>
        )}
        {generating && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
            <Button
              onClick={stopGeneration}
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            >
              <StopCircle className="w-4 h-4" /> Stop Generating
            </Button>
          </motion.div>
        )}
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-6 rounded-xl text-left shadow-lg max-w-xl"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-300">Summary:</h3>
            <p className="text-sm leading-relaxed text-gray-200 whitespace-pre-wrap">{summary}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function ImageGenerationSlide() {
  const [prompt, setPrompt] = useState<string>("");
  const [generated, setGenerated] = useState<boolean>(false);
  const hardcodedImages = [
    { name: "MidJourney", src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg" },
    { name: "Stable Diffusion", src: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg" },
    { name: "DALL·E", src: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg" },
    { name: "Imagen", src: "https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg" },
    { name: "Nova", src: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg" },
    { name: "LLaMA", src: "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg" },
  ];

  return (
    <motion.div className="flex flex-col items-center text-center w-full h-full space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <h2 className="text-4xl font-bold text-purple-400 flex justify-center items-center gap-2">
        <IconImage className="text-purple-300 w-10 h-10 animate-pulse" /> Image Generation
      </h2>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          className="px-3 py-2 border border-purple-400 bg-black text-white rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <UIButton onClick={() => setGenerated(true)} className="text-sm px-4 py-2">
          Generate
        </UIButton>
      </div>
      {generated && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 w-full max-w-5xl">
          {hardcodedImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-gray-800 p-1 rounded-md shadow"
            >
              <img src={img.src} alt={img.name} className="rounded w-full h-32 object-cover" />
              <p className="mt-1 text-xs text-gray-300">{img.name}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function TalkToDataSlide() {
  const [fileName, setFileName] = useState("");
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [allGraphsVisible, setAllGraphsVisible] = useState(false);

  const barData = [{ name: "A", value: 30 }, { name: "B", value: 60 }, { name: "C", value: 45 }];
  const pieData = [{ name: "Group A", value: 35 }, { name: "Group B", value: 35 }, { name: "Group C", value: 30 }];
  const lineData = [{ name: "Jan", value: 40 }, { name: "Feb", value: 30 }, { name: "Mar", value: 60 }, { name: "Apr", value: 50 }];

  const fullText = "The bar chart shows category B leading with value 60, the pie chart is fairly balanced, and the line chart shows a peak in March at 60.";

  useEffect(() => {
    if (showText) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showText]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setTimeout(() => setAllGraphsVisible(true), 1000);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-blue-400">Talk to Your Data</h2>
      <label className="px-3 py-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 cursor-pointer text-sm">
        Choose File
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
      {fileName && <p className="text-gray-300 text-sm">📂 {fileName} has been chosen</p>}
      {fileName && (
        <>
          <div className="flex gap-4 mt-4">
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 120 }} className="bg-gray-800 p-2 rounded-lg">
              <BarChart width={160} height={150} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 80]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8"><LabelList dataKey="value" position="top" fill="#fff" /></Bar>
              </BarChart>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 120 }} className="bg-gray-800 p-2 rounded-lg">
              <RePieChart width={160} height={150}>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={50} label={({ value }) => value} labelLine={false}>
                  {pieData.map((_, index) => (<Cell key={index} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 120 }} className="bg-gray-800 p-2 rounded-lg">
              <ReLineChart width={180} height={150} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </ReLineChart>
            </motion.div>
          </div>
          {allGraphsVisible && (
            <div className="mt-4 flex gap-2">
              <input type="text" placeholder="Ask something about the data..." className="px-2 py-1 rounded-lg text-black text-sm bg-white placeholder-gray-600 shadow-[0_0_0_2px_rgba(255,255,255,0.3)]" />
              <motion.button onClick={() => setShowText(true)} className="px-3 py-1 bg-green-600 rounded-lg hover:bg-green-500 text-sm" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                Ask Me
              </motion.button>
            </div>
          )}
          {showText && <p className="mt-2 text-sm text-white max-w-md text-center bg-gray-800 p-2 rounded-lg">{displayedText}</p>}
        </>
      )}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

enum InteractionMode {
  None,
  V2V_Recording,
  V2V_Playing,
  VTI_Recording,
  VTI_Generating,
  VIDEO_Generating,
}

function MultimodalSlide() {
  const [mode, setMode] = useState(InteractionMode.None);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [vtiDisplayedText, setVtiDisplayedText] = useState("");
  const [vtiShowOutput, setVtiShowOutput] = useState(false);
  const vtiTextIntervalRef = useRef<number | null>(null);

  const [videoFileName, setVideoFileName] = useState("");
  const [videoDisplayedText, setVideoDisplayedText] = useState("");
  const [videoShowOutput, setVideoShowOutput] = useState(false);
  const videoTextIntervalRef = useRef<number | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const fullVtiText = "This image captures the serene beauty of a butterfly, a symbol of transformation and hope. Its delicate wings showcase intricate patterns, a testament to nature's artistry.";
  const vtiImageUrl = "https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg";
  const fullVideoText = "This video shows a stunning time-lapse of a sunset over the ocean. The vibrant colors paint the sky as the sun dips below the horizon, creating a peaceful and mesmerizing scene.";

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stream?.getTracks().forEach(track => track.stop());
      if (audioRef.current) audioRef.current.pause();
      if (vtiTextIntervalRef.current) clearInterval(vtiTextIntervalRef.current);
      if (videoTextIntervalRef.current) clearInterval(videoTextIntervalRef.current);
    };
  }, []);

  const resetAllInteractions = (clearOutput = true) => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (vtiTextIntervalRef.current) {
      clearInterval(vtiTextIntervalRef.current);
      vtiTextIntervalRef.current = null;
    }
    if (videoTextIntervalRef.current) {
      clearInterval(videoTextIntervalRef.current);
      videoTextIntervalRef.current = null;
    }
    if (clearOutput) {
      setVtiShowOutput(false);
      setVtiDisplayedText("");
      setVideoShowOutput(false);
      setVideoDisplayedText("");
      setVideoFileName("");
    }
    setMode(InteractionMode.None);
  };

  const startRecording = async (onStopCallback: () => void) => {
    resetAllInteractions();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = () => { };
      recorder.onstop = () => {
        onStopCallback();
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      return true;
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access was denied. Please allow microphone access in your browser settings to use this feature.");
      resetAllInteractions();
      return false;
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const playResponseAudio = (onEndCallback: () => void) => {
    const audioUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.play().catch(e => {
      console.error("Audio play failed:", e);
      resetAllInteractions();
    });
    audio.onended = () => {
      audioRef.current = null;
      onEndCallback();
    };
    audio.onerror = () => {
      console.error("Audio playback error:", audio.error);
      resetAllInteractions();
    };
  };

  const handleV2VStart = async () => {
    const success = await startRecording(() => {
      setMode(InteractionMode.V2V_Playing);
      playResponseAudio(() => setMode(InteractionMode.None));
    });
    if (success) setMode(InteractionMode.V2V_Recording);
  };

  const handleVTIStart = async () => {
    const success = await startRecording(() => {
      setMode(InteractionMode.VTI_Generating);
      setVtiShowOutput(true);

      const audioDone = () => {
        if (!vtiTextIntervalRef.current) resetAllInteractions(false);
      };
      playResponseAudio(audioDone);

      let i = 0;
      setVtiDisplayedText("");
      vtiTextIntervalRef.current = window.setInterval(() => {
        i++;
        setVtiDisplayedText(fullVtiText.slice(0, i));

        if (i >= fullVtiText.length) {
          clearInterval(vtiTextIntervalRef.current!);
          vtiTextIntervalRef.current = null;
          if (!audioRef.current) resetAllInteractions(false);
        }
      }, 50);
    });
    if (success) setMode(InteractionMode.VTI_Recording);
  };

  const handleVTIStopGenerating = () => {
    resetAllInteractions(false);
    setVtiDisplayedText(fullVtiText);
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current?.click();
  };

  const handleVideoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      resetAllInteractions();

      setVideoFileName(file.name);
      setMode(InteractionMode.VIDEO_Generating);
      setVideoShowOutput(true);

      const audioDone = () => {
        if (!videoTextIntervalRef.current) resetAllInteractions(false);
      };
      playResponseAudio(audioDone);

      let i = 0;
      setVideoDisplayedText("");
      videoTextIntervalRef.current = window.setInterval(() => {
        i++;
        setVideoDisplayedText(fullVideoText.slice(0, i));

        if (i >= fullVideoText.length) {
          clearInterval(videoTextIntervalRef.current!);
          videoTextIntervalRef.current = null;
          if (!audioRef.current) resetAllInteractions(false);
        }
      }, 50);

      event.target.value = '';
    }
  };

  const handleVideoStopGenerating = () => {
    resetAllInteractions(false);
    setVideoDisplayedText(fullVideoText);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full space-y-6 p-4 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col items-center gap-2" variants={itemVariants}>
        <Workflow className="w-12 h-12 text-purple-400" />
        <h2 className="text-4xl font-bold text-purple-400">Multimodal Interactions</h2>
        <p className="text-gray-400 max-w-lg">Engage with AI using voice, text, and images for a richer, more intuitive experience.</p>
      </motion.div>

      <motion.div className="flex flex-wrap justify-center items-center gap-4 mt-2 min-h-[50px]" variants={itemVariants}>
        <motion.button
          onClick={mode === InteractionMode.V2V_Recording ? stopRecording : handleV2VStart}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold shadow-lg ${mode === InteractionMode.V2V_Recording ? 'bg-red-600 hover:bg-red-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}
          whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
          disabled={mode !== InteractionMode.None && mode !== InteractionMode.V2V_Recording}
        >
          <Mic className="w-4 h-4" />
          {mode === InteractionMode.V2V_Recording ? 'Stop Recording' : 'Voice to Voice'}
          {mode === InteractionMode.V2V_Recording && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
        </motion.button>

        <motion.button
          onClick={() => {
            if (mode === InteractionMode.VTI_Recording) stopRecording();
            else if (mode === InteractionMode.VTI_Generating) handleVTIStopGenerating();
            else handleVTIStart();
          }}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold shadow-lg ${mode === InteractionMode.VTI_Recording || mode === InteractionMode.VTI_Generating ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
          whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
          disabled={mode !== InteractionMode.None && mode !== InteractionMode.VTI_Recording && mode !== InteractionMode.VTI_Generating}
        >
          <Mic className="w-4 h-4" />
          {mode === InteractionMode.VTI_Recording ? 'Stop Recording' : (mode === InteractionMode.VTI_Generating ? 'Stop Generating' : 'Voice to Voice + Text + Image')}
          {mode === InteractionMode.VTI_Recording && <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>}
        </motion.button>

        <>
          <input
            type="file"
            ref={videoInputRef}
            onChange={handleVideoFileChange}
            className="hidden"
            accept="video/*"
          />
          <motion.button
            onClick={mode === InteractionMode.VIDEO_Generating ? handleVideoStopGenerating : handleVideoUploadClick}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold shadow-lg ${mode === InteractionMode.VIDEO_Generating ? 'bg-red-600 hover:bg-red-500' : 'bg-pink-600 hover:bg-pink-500'}`}
            whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
            disabled={mode !== InteractionMode.None && mode !== InteractionMode.VIDEO_Generating}
          >
            <FileVideo className="w-4 h-4" />
            {mode === InteractionMode.VIDEO_Generating ? 'Stop Generating' : 'Video to Voice/Text'}
          </motion.button>
        </>

        <AnimatePresence>
          {mode === InteractionMode.V2V_Playing && (
            <motion.button
              onClick={() => resetAllInteractions()}
              className="px-4 py-2 bg-yellow-600 text-black rounded-lg hover:bg-yellow-500 flex items-center gap-2 text-sm font-semibold"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
            >
              Stop Speaking
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {vtiShowOutput && (
          <motion.div
            className="mt-4 p-4 bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl flex flex-col md:flex-row gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.img
              src={vtiImageUrl}
              alt="Butterfly"
              className="w-48 h-48 object-cover rounded-md shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
            />
            <p className="text-gray-300 text-sm text-left flex-1 min-h-[100px]">{vtiDisplayedText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {videoShowOutput && (
          <motion.div
            className="mt-4 p-4 bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl flex flex-col gap-2 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="text-gray-400 font-semibold text-sm">📂 Processing: {videoFileName}</p>
            <p className="text-gray-300 text-sm text-left flex-1 w-full min-h-[80px] p-2 bg-gray-900 rounded-md">{videoDisplayedText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/************************
 * Animated Title Slide Component *
 ************************/
// Animation variants for the title container
const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

// Animation variants for each word in the title
const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100 }
  },
};

// A reusable component for a slide with an animated title
const AnimatedTitleSlide: React.FC<{ title: string }> = ({ title }) => {
  const words = title.split(" ");
  return (
    <motion.div
        className="flex flex-col items-center justify-center h-full w-full space-y-6 rounded-2xl shadow-2xl p-4"
        // Use a key to force re-render and re-animation on slide change
        key={title} 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >
        <motion.h2
            className="text-3xl md:text-5xl font-bold text-center flex flex-wrap justify-center"
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={titleWordVariants}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                    style={{ marginRight: '1rem' }} // Adjust spacing between words
                >
                    {word}
                </motion.span>
            ))}
        </motion.h2>
    </motion.div>
  );
};

// -----------------------------
// Main Presentation Component
// -----------------------------
export default function IntegratedAIPresentation() {
  const [current, setCurrent] = useState(0);

  const slides = [
    // Slide 1: Introduction to AI
    {
      id: 1,
      title: "Introduction to AI",
      content: <AnimatedTitleSlide title="Introduction to AI" />
    },
    {
      id: 1,
      title: "Introduction to AI",
      content: (
        <motion.div className="text-center space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-purple-400 flex justify-center items-center gap-2">
            <Brain className="text-purple-300 w-10 h-10 animate-bounce" /> What is AI?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think, reason, and learn.
          </p>
          <motion.div className="flex justify-center gap-10 mt-6" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.5 } } }}>
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-col items-center">
              <Cpu className="w-12 h-12 text-blue-400" />
              <span className="text-gray-300 mt-2">Reasoning</span>
            </motion.div>
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-col items-center">
              <IconLineChart className="w-12 h-12 text-green-400" />
              <span className="text-gray-300 mt-2">Learning</span>
            </motion.div>
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex flex-col items-center">
              <Sparkles className="w-12 h-12 text-pink-400" />
              <span className="text-gray-300 mt-2">Creativity</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ),
    },
    // Slide 2: Neural Networks
    {
      id: 2,
      title: "Neural Networks",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-green-400 flex justify-center items-center gap-2">
            <Cpu className="text-green-300 w-10 h-10 animate-pulse" /> Neural Networks
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Neural networks are inspired by the human brain’s structure. They consist of interconnected neurons (nodes) organized into layers.
          </p>
          <div className="flex justify-center gap-12 mt-6">
            {"Input Hidden Output".split(" ").map((label, index) => (
              <motion.div key={label} initial={{ scale: 1 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 }} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">{label[0]}</div>
                <span className="text-gray-300 mt-2">{label} Layer</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    // Slide 3: Who Uses AI
    {
      id: 17,
      title: "Who Uses AI",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h2 className="text-4xl font-bold text-yellow-400 flex justify-center items-center gap-2" initial={{ y: -50, scale: 0.8 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
            <Users className="text-yellow-300 w-10 h-10 animate-bounce" /> Who Uses AI?
          </motion.h2>
          <motion.div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto mt-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}>
            {[
              { name: 'Tech', usage: 'Develops AI applications and integrates AI in software solutions.' },
              { name: 'Healthcare', usage: 'Uses AI for diagnostics, drug discovery, and patient care.' },
              { name: 'Finance', usage: 'Leverages AI for fraud detection, trading, and risk assessment.' },
              { name: 'Retail', usage: 'Applies AI for personalized recommendations, inventory, and logistics.' },
              { name: 'Creative', usage: 'Creates AI-generated art, music, writing, and design content.' },
              { name: 'Education', usage: 'Uses AI to personalize learning, grading, and tutoring systems.' },
            ].map((user, index) => (
              <motion.div key={user.name} initial={{ y: 20, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.2 * index }}>
                <Card className="bg-gray-800 text-white p-4 w-56 h-40 flex flex-col justify-center items-center hover:scale-105 transition-transform">
                  <CardContent className="flex flex-col items-center text-center">
                    <h3 className="text-lg font-semibold text-yellow-300">{user.name}</h3>
                    <p className="text-gray-300 mt-2 text-sm leading-snug">{user.usage}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    // Slide 4: AI Evolution Timeline
    {
      id: 3,
      title: "AI Evolution Timeline",
      content: (
        <motion.div className="space-y-8 text-center flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-pink-400 flex justify-center items-center gap-2">
            <Sparkles className="text-pink-300 w-10 h-10 animate-spin" /> AI Evolution Timeline
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            From rule-based systems in the 1950s to today’s generative AI, AI has evolved rapidly.
          </p>
          <div className="relative w-full max-w-2xl mx-auto flex flex-col items-start">
            <motion.div className="absolute top-0 left-1/4 w-1 bg-gradient-to-b from-pink-400 to-pink-700 h-full" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 2 }}></motion.div>
            {["1956 - Birth of AI at Dartmouth Conference", "1997 - IBM Deep Blue defeats Kasparov", "2012 - Deep Learning breakthrough (ImageNet)", "2022 - Rise of Generative AI (ChatGPT, DALL·E)"].map((event, i) => (
              <motion.div key={i} className="flex items-center gap-4 mb-8 ml-[28%]" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.6 }}>
                <div className="w-6 h-6 bg-pink-500 rounded-full absolute left-1/4"></div>
                <p className="text-gray-300 text-left ml-10">{event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    // Slide 5: AI in Enterprise
    {
      id: 4,
      title: "AI in Enterprise",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-yellow-400">What Can AI Do in Enterprise?</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            AI is transforming enterprises by enhancing efficiency, decision-making, and customer engagement.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
            <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <Card className="bg-gray-800 text-white p-4 hover:scale-105 transition-transform">
                <CardContent>
                  <h3 className="text-xl font-semibold text-blue-300">Automation</h3>
                  <p>Streamlining repetitive business tasks.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <Card className="bg-gray-800 text-white p-4 hover:scale-105 transition-transform">
                <CardContent>
                  <h3 className="text-xl font-semibold text-green-300">Analytics</h3>
                  <p>Extracting insights from big data.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <Card className="bg-gray-800 text-white p-4 hover:scale-105 transition-transform">
                <CardContent>
                  <h3 className="text-xl font-semibold text-purple-300">Customer Support</h3>
                  <p>AI-powered chatbots and service agents.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <Card className="bg-gray-800 text-white p-4 hover:scale-105 transition-transform">
                <CardContent>
                  <h3 className="text-xl font-semibold text-red-300">Innovation</h3>
                  <p>Driving new product and service development.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    // Slide 6: Human + AI Collaboration
    {
      id: 14,
      title: "5 Stages of Human-AI Collaboration",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h2 className="text-2xl font-bold text-purple-400 flex justify-center items-center gap-2" initial={{ scale: 0.8, y: -40 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
            <Users className="text-purple-300 w-7 h-7 animate-bounce" /> 5 Stages of Human-AI Collaboration
          </motion.h2>
          <div className="flex justify-center gap-4 mt-4">
            {[
              { name: 'AI as an assistant', desc: 'Employees use AI to improve accuracy in everyday tasks', icon: FileText },
              { name: 'AI as a co-pilot', desc: 'Employees use Gen AI to generate content', icon: Pencil },
              { name: 'AI agents executing modular tasks', desc: 'AI agents autonomously perform distinct tasks', icon: Workflow },
            ].map((stage, index) => (
              <motion.div key={stage.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * index }}>
                <Card className="bg-gray-800 text-white p-2 w-40 h-32 flex flex-col justify-center items-center hover:scale-105 transition-transform rounded-xl">
                  <CardContent className="flex flex-col items-center text-center p-1">
                    <stage.icon className="w-8 h-8 text-purple-300 mb-1" />
                    <h3 className="text-xs font-semibold text-purple-300 leading-tight">{stage.name}</h3>
                    <p className="text-gray-300 mt-1 text-[10px] leading-snug">{stage.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {[
              { name: 'AI agents operating autonomously within systems', desc: 'AI agents complete specific tasks end-to-end', icon: Network },
              { name: 'AI fully replacing roles', desc: 'AI replaces some human roles entirely', icon: User },
            ].map((stage, index) => (
              <motion.div key={stage.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * index }}>
                <Card className="bg-gray-800 text-white p-2 w-40 h-32 flex flex-col justify-center items-center hover:scale-105 transition-transform rounded-xl">
                  <CardContent className="flex flex-col items-center text-center p-1">
                    <stage.icon className="w-8 h-8 text-purple-300 mb-1" />
                    <h3 className="text-xs font-semibold text-purple-300 leading-tight">{stage.name}</h3>
                    <p className="text-gray-300 mt-1 text-[10px] leading-snug">{stage.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ),
    },
    // Slide 7: What's New and Different in AI
    {
      id: 6,
      title: "What's New and Different in AI",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-cyan-400 flex justify-center items-center gap-2">
            <Lightbulb className="text-cyan-300 w-10 h-10 animate-ping" /> What's New and Different in AI?
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            AI today is far more adaptive, creative, and accessible than ever before.
          </p>
          <motion.div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mt-6">
            {[
              { title: "Generative Models", desc: "AI that creates text, images, and video." },
              { title: "Accessibility", desc: "AI tools available to businesses & individuals." },
              { title: "Multimodality", desc: "Combining text, images, audio for better results." },
              { title: "Scale", desc: "AI applied across industries at global scale." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4 }} className="bg-gray-800 p-4 rounded-xl hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold text-cyan-300">{item.title}</h3>
                <p className="text-gray-300 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    {
      id: 4,
      title: "Generative AI",
      content: <AnimatedTitleSlide title="Generative AI" />
    },
    // Slide 8: Traditional vs Generative AI
    {
      id: 5,
      title: "Traditional vs Generative AI",
      content: (
        <motion.div className="space-y-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-red-400 flex justify-center items-center gap-2">
            <Bot className="text-red-300 w-10 h-10 animate-pulse" /> Traditional vs Generative AI
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Traditional AI focuses on prediction and automation, while Generative AI creates new content.
          </p>
          <motion.div className="relative w-full max-w-3xl mx-auto flex justify-between items-center" animate={{ rotate: ["-5deg", "5deg", "-5deg"] }} transition={{ duration: 4, repeat: Infinity }}>
            <motion.div className="bg-gray-800 p-6 rounded-2xl w-1/2 mr-2">
              <h3 className="text-xl font-semibold text-blue-300">Traditional AI</h3>
              <ul className="text-gray-300 text-left mt-2 space-y-2">
                <li>Classification</li>
                <li>Prediction</li>
                <li>Automation</li>
              </ul>
            </motion.div>
            <motion.div className="bg-gray-800 p-6 rounded-2xl w-1/2 ml-2">
              <h3 className="text-xl font-semibold text-green-300">Generative AI</h3>
              <ul className="text-gray-300 text-left mt-2 space-y-2">
                <li>Text Generation</li>
                <li>Image/Video Synthesis</li>
                <li>Code Generation</li>
              </ul>
            </motion.div>
            <motion.div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-2 bg-red-400 rounded-full"></motion.div>
          </motion.div>
        </motion.div>
      ),
    },
    // Slide 9: Generative AI Capabilities
    {
      id: 7,
      title: "Generative AI Capabilities",
      content: (
        <motion.div className="space-y-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-green-400 flex justify-center items-center gap-2">
            <Network className="text-green-300 w-10 h-10 animate-bounce" /> Generative AI Capabilities
          </h2>
          <motion.div className="flex justify-center gap-6 mt-6">
            {[
              { title: "Text", desc: "Stories, blogs, summaries.", icon: <FileText className="w-8 h-8 text-green-300" /> },
              { title: "Images", desc: "Art, design, product visuals.", icon: <ImageIcon className="w-8 h-8 text-green-300" /> },
              { title: "Video", desc: "Ads, explainers, simulations.", icon: <Video className="w-8 h-8 text-green-300" /> },
              { title: "Code", desc: "Automation, app development.", icon: <Code2 className="w-8 h-8 text-green-300" /> },
            ].map((cap, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.5, type: "spring" }} className="bg-gray-800 p-4 rounded-xl w-48 flex flex-col items-center">
                {cap.icon}
                <h3 className="text-lg font-semibold text-green-300 mt-2">{cap.title}</h3>
                <p className="text-gray-300 mt-2 text-center">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    // Slide 10: Indian Gen AI Ecosystem
    {
      id: 8,
      title: "Indian Gen AI Ecosystem",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-orange-400 flex justify-center items-center gap-2">
            <Globe className="text-orange-300 w-10 h-10 animate-spin" /> Indian Gen AI Ecosystem
          </h2>
          <motion.ul className="grid grid-cols-2 gap-4 max-w-3xl mx-auto mt-6 text-left">
            {["Sarvam AI", "Krutrim AI", "Jio GenAI", "TCS AI Lab", "Infosys AI", "Wipro Holmes"].map((org, i) => (
              <motion.li key={i} initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileHover={{ scale: 1.1, rotate: 2 }} transition={{ delay: i * 0.3, type: "spring" }} className="bg-gray-800 p-3 rounded-lg text-gray-300 hover:shadow-lg hover:shadow-orange-500/50">
                {org}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      ),
    },
    // Slide 11: The Power Behind Generative AI
    {
      id: 15,
      title: "The Power Behind Generative AI",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h2 className="text-4xl font-bold text-green-400 flex justify-center items-center gap-2" initial={{ y: -50, scale: 0.8 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
            <Brain className="text-green-300 w-10 h-10 animate-pulse" /> Power of Generative AI
          </motion.h2>
          <motion.p className="text-lg text-gray-200 max-w-2xl mx-auto" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Generative AI leverages deep learning models to create text, images, music, and code, amplifying human creativity.
          </motion.p>
          <motion.div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}>
            {['Text', 'Images', 'Code'].map((type, index) => (
              <motion.div key={type} initial={{ y: 40, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.2 * index, type: 'spring', stiffness: 100 }} className="bg-gray-800 p-6 rounded-2xl flex flex-col items-center hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold text-blue-300">{type}</h3>
                <p className="text-gray-300 mt-2">{type} Generation using AI models</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    // Slide 12: Gen AI Use Case Patterns
    {
      id: 9,
      title: "Gen AI Use Case Patterns",
      content: (
        <motion.div className="space-y-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-purple-400 flex justify-center items-center gap-2">
            <Boxes className="text-purple-300 w-10 h-10 animate-pulse" /> Gen AI Use Case Patterns
          </h2>
          <motion.div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto mt-6">
            {[
              { title: "Content Creation", desc: "Blogs, marketing, design.", icon: <FileText className="w-6 h-6 text-purple-300" /> },
              { title: "Customer Support", desc: "Chatbots, virtual assistants.", icon: <MessageSquare className="w-6 h-6 text-purple-300" /> },
              { title: "Productivity", desc: "Docs, email, automation.", icon: <Briefcase className="w-6 h-6 text-purple-300" /> },
              { title: "Healthcare", desc: "Diagnostics, drug discovery.", icon: <Activity className="w-6 h-6 text-purple-300" /> },
              { title: "Finance", desc: "Fraud detection, portfolio mgmt.", icon: <Cpu className="w-6 h-6 text-purple-300" /> },
              { title: "Education", desc: "Tutoring, assessments.", icon: <BookOpen className="w-6 h-6 text-purple-300" /> },
            ].map((use, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 }} className="bg-gray-800 p-4 rounded-xl overflow-hidden">
                <motion.div className="flex items-center gap-2" animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                  {use.icon}
                  <h3 className="text-lg font-semibold text-purple-300 whitespace-nowrap">{use.title}</h3>
                </motion.div>
                <p className="text-gray-300 mt-4 text-sm">{use.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    {
      id: 9,
      title: "Agentic AI",
      content: <AnimatedTitleSlide title="Agentic AI" />
    },
    // Slide 13: How Agentic AI Works
    {
      id: 10,
      title: "How Agentic AI Works",
      content: (
        <motion.div className="space-y-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-teal-400 flex justify-center items-center gap-2">
            <Workflow className="text-teal-300 w-10 h-10 animate-spin" /> How Agentic AI Works
          </h2>
          <motion.div className="flex justify-center gap-6 mt-8">
            {[
              { title: "Perception", desc: "Agent senses inputs.", icon: <Eye className="w-8 h-8 text-teal-300" /> },
              { title: "Reasoning", desc: "Understands and plans.", icon: <Brain className="w-8 h-8 text-teal-300" /> },
              { title: "Action", desc: "Executes tasks.", icon: <Bot className="w-8 h-8 text-teal-300" /> },
              { title: "Learning", desc: "Improves over time.", icon: <Sparkles className="w-8 h-8 text-teal-300" /> },
            ].map((step, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.5, type: "spring" }} className="bg-gray-800 p-4 rounded-xl w-48 flex flex-col items-center">
                {step.icon}
                <h3 className="text-lg font-semibold text-teal-300 mt-2">{step.title}</h3>
                <p className="text-gray-300 mt-2 text-center">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    // Slide 14: Agentic AI Use Case Patterns
    {
      id: 11,
      title: "Agentic AI Use Case Patterns",
      content: (
        <motion.div className="space-y-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="text-4xl font-bold text-blue-400 flex justify-center items-center gap-2">
            <Layers className="text-blue-300 w-10 h-10 animate-bounce" /> Agentic AI Use Case Patterns
          </h2>
          <motion.div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mt-6">
            {[
              { title: "Personal Assistants", desc: "AI that manages schedules and tasks." },
              { title: "Autonomous Systems", desc: "Robotics, drones, vehicles." },
              { title: "Process Automation", desc: "Automating workflows and business logic." },
              { title: "Decision Support", desc: "Recommender systems, analytics." },
            ].map((use, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.5 }} className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform">
                <h3 className="text-xl font-semibold text-blue-300">{use.title}</h3>
                <p className="text-gray-300 mt-2">{use.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    // Slide 15: Impact of Agentic AI in Organizations
    {
      id: 16,
      title: "Impact of Agentic AI in Organizations",
      content: (
        <motion.div className="space-y-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h2 className="text-4xl font-bold text-pink-400 flex justify-center items-center gap-2" initial={{ y: -50, scale: 0.8 }} animate={{ y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
            <Bot className="text-pink-300 w-10 h-10 animate-spin" /> Agentic AI in Organizations
          </motion.h2>
          <motion.p className="text-lg text-gray-200 max-w-2xl mx-auto" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Agentic AI autonomously performs tasks, enhances efficiency, and reduces operational risks.
          </motion.p>
          <motion.div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mt-6" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}>
            {['Task Automation', 'Decision Making', 'Resource Allocation', 'Customer Engagement'].map((impact, index) => (
              <motion.div key={impact} initial={{ y: 50, opacity: 0, rotateY: -15 }} animate={{ y: 0, opacity: 1, rotateY: 0 }} transition={{ delay: 0.2 * index, type: 'spring', stiffness: 100 }}>
                <Card className="bg-gray-800 text-white p-4 hover:scale-105 transition-transform">
                  <CardContent>
                    <h3 className="text-xl font-semibold text-green-300">{impact}</h3>
                    <p className="text-gray-300 mt-1">AI improves {impact.toLowerCase()} in enterprises.</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    {
      id: 22,
      title: "Video Generation by Veo3",
      content: <Veo3VideoSlide />,
    },
    // Slide 16: Intro slide of 4 prototypes
    {
      id: 18,
      title: "VibeCoding Ground",
      content: (
        <motion.div className="flex flex-col items-center justify-center h-full space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h2 className="text-4xl font-bold text-indigo-400 flex justify-center items-center gap-2" initial={{ y: -50, scale: 0.8 }} animate={{ y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 120 }}>
            VibeCoding Ground
          </motion.h2>
          <motion.div className="grid grid-cols-2 gap-6 place-items-center" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}>
            {[
              { name: "Document Summarizer", icon: FileText },
              { name: "Image Generation", icon: ImageIcon },
              { name: "Talk to Data", icon: Database },
              { name: "Multimodal Interactions", icon: Layers },
            ].map((tool, index) => (
              <motion.div key={tool.name} variants={{ hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } }} transition={{ delay: 0.2 * index, type: "spring", stiffness: 100 }}>
                <Card className="bg-gray-800 text-white w-60 h-40 flex items-center justify-center hover:scale-105 transition-transform rounded-xl">
                  <CardContent className="flex flex-col items-center justify-center h-full p-4">
                    <tool.icon
                      className={`${tool.name === "Document Summarization" ? "w-16 h-16" : "w-12 h-12"
                        } text-indigo-300 mb-3`}
                    />
                    <h3 className="text-lg font-semibold text-indigo-300 text-center h-14 flex items-center justify-center">
                      {tool.name}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ),
    },
    // --- NEW VEO3 VIDEO SLIDE ADDED HERE ---
    
    // Slide 17: Document Summarization
    {
      id: 12,
      title: "Document Summarization",
      content: <DocumentSummarizationSlide />,
    },
    // Slide 18: Image Generation
    {
      id: 13,
      title: "Image Generation",
      content: <ImageGenerationSlide />,
    },
    // Slide 19: Talk to your data
    {
      id: 20,
      title: "Talk to Your Data",
      content: <TalkToDataSlide />,
    },
    // Slide 20: Multimodal Interactions
    {
      id: 21,
      title: "Multimodal Interactions",
      content: <MultimodalSlide />,
    },
    // Slide 21: Thank You
    {
      id: 19,
      title: "Thank You",
      content: (
        <motion.div className="flex items-center justify-center h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.h2 className="text-5xl font-bold text-green-400" initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 120 }}>
            Thank You!
          </motion.h2>
        </motion.div>
      ),
    },
  ];

  const nextSlide = useCallback(() => setCurrent((prev) => (prev + 1) % slides.length), [slides.length]);
  const prevSlide = useCallback(() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);


  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white p-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full max-w-6xl flex items-center justify-center"
        >
          {slides[current].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}