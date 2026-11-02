import { useEffect, useRef, useState } from "react";
import { Hand, Pause, Play, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import libras from "@/assets/libras-demo.mp4.asset.json";

export function AccessibleContent({ text, title, route = false }: { text: string; title: string; route?: boolean }) {
  const [audio, setAudio] = useState(false);
  const [signs, setSigns] = useState(false);
  return <>
    <div className="flex flex-wrap items-center gap-2 pr-8" aria-label="Recursos de acessibilidade">
      <Button variant="outline" size="icon" onClick={() => setAudio(!audio)} aria-label="AD — Audiodescrição" aria-expanded={audio} title="Audiodescrição"><span className="font-bold">AD</span></Button>
      <Button variant="outline" size="icon" onClick={() => setSigns(true)} aria-label="Libras — abrir demonstração" title="Libras"><Hand /></Button>
      {route && <Button variant="ghost" onClick={() => setAudio(!audio)} className="h-auto whitespace-normal text-left"><Volume2 />Áudio-descrição do Roteiro</Button>}
    </div>
    {audio && <AudioDescription text={text} />}
    <Dialog open={signs} onOpenChange={setSigns}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
        <DialogTitle>Libras · {title}</DialogTitle>
        <DialogDescription>Vídeo demonstrativo do sinal “cachorro”. Não é uma tradução deste conteúdo.</DialogDescription>
        <SignVideo />
        <p className="text-xs text-muted-foreground">Fred Maranhão · <a className="underline" href="https://commons.wikimedia.org/wiki/File:Libras-cachorro.ogv" target="_blank" rel="noreferrer">Wikimedia Commons</a> · <a className="underline" href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a></p>
      </DialogContent>
    </Dialog>
  </>;
}

function SignVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  return <div>
    <video ref={ref} src={libras.url} loop playsInline controls preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setError(true)} className="aspect-video w-full rounded-lg bg-muted object-contain" aria-label="Pessoa demonstrando o sinal cachorro em Libras" />
    {error ? <p role="alert">O vídeo não está disponível neste navegador.</p> : <Button className="mt-3 w-full" variant="outline" onClick={() => { const video = ref.current; if (!video) return; if (video.paused) void video.play().catch(() => setError(true)); else video.pause(); }}>{playing ? <Pause /> : <Play />}{playing ? "Pausar Libras" : "Reproduzir Libras"}</Button>}
  </div>;
}

function AudioDescription({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const cursor = useRef(0);
  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);
  function toggle() {
    if (!("speechSynthesis" in window)) { setError("Voz indisponível neste navegador. Leia a transcrição abaixo."); return; }
    if (playing) {
      window.speechSynthesis.cancel();
      utterance.current = null;
      setPlaying(false);
      return;
    }
    const start = cursor.current >= text.length ? 0 : cursor.current;
    const speech = new SpeechSynthesisUtterance(text.slice(start));
    speech.lang = "pt-BR";
    speech.rate = 0.9;
    speech.onboundary = (event) => { cursor.current = start + event.charIndex; setProgress(Math.round(cursor.current / text.length * 100)); };
    speech.onend = () => { cursor.current = text.length; setProgress(100); setPlaying(false); utterance.current = null; };
    speech.onerror = (event) => { if (event.error !== "canceled" && event.error !== "interrupted") { setError("Não foi possível reproduzir a voz. A transcrição continua disponível."); setPlaying(false); } };
    utterance.current = speech;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
    setPlaying(true);
    setError("");
  }
  return <section className="space-y-3 rounded-lg border border-border bg-accent p-4" aria-label="Player de audiodescrição">
    <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold">Audiodescrição · voz sintetizada</p><Button variant="outline" size="icon" onClick={toggle} aria-label={playing ? "Pausar audiodescrição" : "Reproduzir audiodescrição"}>{playing ? <Pause /> : <Play />}</Button></div>
    <progress max={100} value={progress} className="h-2 w-full accent-primary" aria-label="Progresso da audiodescrição" />
    {error && <p role="alert" className="text-sm">{error}</p>}
    <details><summary className="cursor-pointer text-xs font-medium">Transcrição da audiodescrição</summary><p className="mt-2 text-sm leading-relaxed">{text}</p></details>
  </section>;
}