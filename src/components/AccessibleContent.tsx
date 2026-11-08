import { useEffect, useRef, useState } from "react";
import { Hand, Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import libras from "@/assets/libras-oi.mp4.asset.json";

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
      <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] overflow-y-auto rounded-lg p-4 sm:w-[calc(100%-2rem)] sm:p-6">
        <DialogTitle>Libras · {title}</DialogTitle>
        <DialogDescription>Demonstração de saudação “Oi” em Libras. Não é uma tradução deste conteúdo.</DialogDescription>
        <SignVideo />
        <p className="text-xs text-muted-foreground">Animação fornecida para demonstração de saudação.</p>
      </DialogContent>
    </Dialog>
  </>;
}

function SignVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  return <div>
    <video ref={ref} className="mx-auto block aspect-square max-h-[min(58dvh,32rem)] w-full max-w-[min(100%,32rem)] rounded-lg bg-muted object-contain" aria-label="Intérprete animado demonstrando a saudação Oi em Libras" onPlay={() => { setPlaying(true); setError(false); }} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setError(true); }}>
      <source src={libras.url} type="video/mp4" />
      Seu navegador não oferece suporte à reprodução deste vídeo.
    </video>
    {error ? <div role="alert" className="mt-3 space-y-2"><p className="text-sm">Não foi possível carregar o vídeo. Verifique a conexão e tente novamente.</p><Button className="w-full" variant="outline" onClick={() => { const video = ref.current; if (!video) return; setError(false); video.load(); }}>Tentar novamente</Button></div> : <Button className="mt-3 w-full" variant="outline" onClick={() => { const video = ref.current; if (!video) return; if (video.paused) void video.play().catch(() => setError(true)); else video.pause(); }}>{playing ? <Pause /> : <Play />}{playing ? "Pausar Libras" : "Reproduzir Libras"}</Button>}
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